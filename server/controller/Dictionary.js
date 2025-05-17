const { GoogleGenerativeAI } = require("@google/generative-ai");
const Dictionary = require("../Model/Dictionary");
const NormalDictionary = require("../Model/NormalDictionary");

// Configuration
const GENERATION_CONFIG = {
  maxRetries: 4,
  initialDelay: 1000, // 1 second
  backoffFactor: 2,
  maxDelay: 30000, // 30 seconds
  freeTierLimit: 15, // Requests per minute
  entriesPerRequest: 7, // Conservative default
  maxEntriesPerRequest: 10, // For free tier safety
};

// Track duplicates and API usage
const sessionGeneratedWords = new Set();
let apiCallCount = 0;
let lastResetTime = Date.now();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2);

// Helper function for delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getExistingWords() {
  try {
    const words = await Dictionary.find({}).select("twi -_id").lean();
    return new Set(words.map((item) => item.twi));
  } catch (error) {
    console.error("Error fetching existing words:", error);
    return new Set();
  }
}

async function generateWithRetry(prompt, attempt = 1) {
  // Reset counter if minute has passed
  if (Date.now() - lastResetTime > 60000) {
    apiCallCount = 0;
    lastResetTime = Date.now();
  }

  // Check rate limit
  if (apiCallCount >= GENERATION_CONFIG.freeTierLimit) {
    const timeLeft = 60000 - (Date.now() - lastResetTime);
    await sleep(timeLeft);
    apiCallCount = 0;
    lastResetTime = Date.now();
  }

  try {
    apiCallCount++;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (
      error.message.includes("RESOURCE_EXHAUSTED") &&
      attempt <= GENERATION_CONFIG.maxRetries
    ) {
      const delay = Math.min(
        GENERATION_CONFIG.initialDelay *
          Math.pow(GENERATION_CONFIG.backoffFactor, attempt - 1),
        GENERATION_CONFIG.maxDelay
      );
      console.log(`Rate limited. Retrying in ${delay}ms (attempt ${attempt})`);
      await sleep(delay);
      return generateWithRetry(prompt, attempt + 1);
    }
    throw error;
  }
}

async function generateUniqueTwiEntry(existingWords) {
  const prompt = `Generate a UNIQUE Twi word not in this list: 
  ${Array.from(existingWords).slice(0, 8).join(", ")}...
  
  Required JSON format:
  {
    "twi": "Unique word",
    "fante": "Fante equivalent",
    "english": "English meaning",
    "pronunciation": "/ipa/",
    "partOfSpeech": "noun|verb|etc.",
    "examples": [{
      "twi": "Example sentence",
      "english": "Translation"
    }],
    "related": ["RelatedWord1", "RelatedWord2"],
    "status": "approved"
  }`;

  try {
    const text = await generateWithRetry(prompt);
    const cleanText = text.replace(/```json|```/g, "").trim();
    const entry = JSON.parse(cleanText);

    if (existingWords.has(entry.twi) || sessionGeneratedWords.has(entry.twi)) {
      throw new Error("Duplicate word generated");
    }

    return entry;
  } catch (error) {
    console.error("Generation failed:", error.message);
    throw error;
  }
}

async function generateBulkDictionary(
  count = GENERATION_CONFIG.entriesPerRequest
) {
  const existingWords = await getExistingWords();
  const entries = [];

  for (let i = 0; i < count && entries.length < count; i++) {
    try {
      const entry = await generateUniqueTwiEntry(existingWords);
      entries.push(entry);
      sessionGeneratedWords.add(entry.twi);
      console.log(`Generated ${entries.length}/${count}: ${entry.twi}`);

      // Rate limiting between generations
      if (i < count - 1) await sleep(5000);
    } catch (error) {
      console.error(`Skipping entry due to error: ${error.message}`);
    }
  }

  return entries;
}

const populateDictionary = async (req, res) => {
  try {
    const count = 7;

    sessionGeneratedWords.clear();
    const entries = await generateBulkDictionary(count);

    // Insert in batches
    const insertedEntries = await Dictionary.insertMany(entries);

    res.status(201).json({
      success: true,
      inserted: insertedEntries.length,
      data: insertedEntries[0],
    });
  } catch (error) {
    console.error("Population error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to populate dictionary",
      error: error.message,
      quotaInfo: {
        remaining: GENERATION_CONFIG.freeTierLimit - apiCallCount,
        resetIn:
          Math.ceil((60000 - (Date.now() - lastResetTime)) / 1000) + " seconds",
      },
    });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { twi: { $regex: search, $options: "i" } },
            { english: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const entries = await Dictionary.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Dictionary.countDocuments(query);

    res.json({
      success: true,
      data: entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch entries",
      error: error.message,
    });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent twi field duplication
    if (updateData.twi) {
      const existing = await Dictionary.findOne({
        twi: updateData.twi,
        _id: { $ne: id },
      });
      

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This Twi word already exists in dictionary",
        });
      }
    }
    const entry = await Dictionary.findById(id);

    entry.status = "approved";
    await entry.save();


    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update entry",
      error: error.message,
    });
  }
};
const createWordByAdmin = async (req, res) => {
  try {
    const { twi, english, definition, partOfSpeech, examples, status, user } =
      req.body;
    const existing = await NormalDictionary.findOne({
      $or: [{ twi }, { english }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This Twi word already exists in dictionary",
      });
    }
    const entry = await Dictionary.create({
      twi,
      english,
      definition,
      partOfSpeech,
      examples: {
        twi: examples.twi,
        english: examples.english,
      },
      user,
      status: "approved",
    });
    res.json({
      message: "Successfully created word",
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create word",
      error: error.message,
    });
  }
};
const createWordByUser = async (req, res) => {
  try {
    const { twi, english, definition, partOfSpeech, examples, status, user } =
      req.body;
    const existing = await NormalDictionary.findOne({
      $or: [{ twi }, { english }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This Twi word already exists in dictionary",
      });
    }
    const entry = await Dictionary.create({
      twi,
      english,
      definition,
      partOfSpeech,
      examples: {
        twi: examples.twi,
        english: examples.english,
      },
      user,
      status: "pending",
    });
    res.json({
      message: "Successfully created word",
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create word",
      error: error.message,
    });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Dictionary.findByIdAndDelete(id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }
    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete entry",
      error: error.message,
    });
  }
};

module.exports = {
  populateDictionary,
  getAllEntries,
  updateEntry,
  createWordByAdmin,
  createWordByUser,
  deleteEntry,
};
