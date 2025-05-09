const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Vocabulary, Sentence, FillInTheBlank } = require("../Model/Excercise");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2);

async function generateVocabs(level) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Create a vocabulary matching exercise in Akan (Twi) for ${level} learners. Follow this exact JSON format:

{
  "level": "${level}",
  "vocabs": [
    {
      "question": "Twi word/phrase",
      "options": ["English meaning 1", "English meaning 2", "English meaning 3", "English meaning 4"],
      "correctAnswer": index_of_correct_option
    }
  ]
}

Requirements:
1. Generate 8 vocabulary items appropriate for ${level} level learners
2. Each vocab item should have:
   - A Twi word/phrase as the question
   - 4 English meaning options (1 correct, 3 plausible distractors)
   - Index (0-3) of the correct answer
3. For Beginner level:
   - Use basic, everyday vocabulary (greetings, numbers, family terms)
   - Keep sentences simple
4. For Intermediate level:
   - Include common verbs and expressions
   - Can use short phrases
5. For Advanced level:
   - Include idioms, proverbs or complex phrases
   - Distractors should be nuanced
6. All Twi words must be accurate and culturally appropriate
7. Format the JSON so it can be directly parsed by JavaScript

Example for Beginner level:
{
  "level": "Beginner",
  "vocabs": [
    {
      "question": "Maakye",
      "options": ["Good night", "Good morning", "Thank you", "Please"],
      "correctAnswer": 1
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI failed to generate valid lesson");
  }
}

async function generateSentence(level) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Create a sentence construction exercise in Akan (Twi) for ${level} learners. Follow this exact JSON format:

{
  "level": "${level}",
  "sentenceTemplates": [
    {
      "question": "English prompt/scrambled words", 
      "correctSentence": "Complete correct Twi sentence"
    }
  ]
}

Requirements:
1. Generate 8-10 sentence exercises appropriate for ${level} level:
   - Beginner: Simple SVO sentences (max 4-5 words)
   - Intermediate: Common expressions with modifiers (6-8 words)
   - Advanced: Complex sentences with conjunctions/idioms (8-12 words)

2. For each exercise:
   - "question" should be either:
     a) An English instruction ("Translate to Twi: Good morning")
     b) Scrambled Twi words (for reconstruction)
     c) Sentence with missing words (cloze test)
   - "correctSentence" must be grammatically perfect Twi

3. Content guidelines:
   - Beginner: Focus on greetings, daily routines, basic questions
   - Intermediate: Include time expressions, simple conjunctions
   - Advanced: Use proverbs, idiomatic expressions, complex tenses

4. Cultural considerations:
   - Use authentic Ghanaian contexts
   - Include 1-2 cultural references for Advanced level
   - Ensure all sentences are natural Twi (not literal English translations)

Example for Intermediate level:
{
  "level": "Intermediate",
  "sentenceTemplates": [
    {
      "question": "Arrange: me, kɔ, sukuu, daa",
      "correctSentence": "Mekɔ sukuu daa"
    }
    
  ]
}

Important:
- Maintain consistent JSON formatting
- All Twi text must use proper diacritics
- For scrambled words, include all necessary particles
- For cloze tests, omit only semantically important words`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI failed to generate valid lesson");
  }
}

async function generateFillInTheBlank(level) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Create a fill-in-the-blank exercise in Akan (Twi) for ${level} learners. Follow this exact JSON format:

{
  "level": "${level}",
  "sentenceTemplates": [
    {
      "question": "Sentence with _____ blank(s)",
      "options": ["Option1", "Option2", "Option3", "Option4"],
      "correctAnswer": index_of_correct_option
    }
  ]
}

Requirements:

1. Exercise Characteristics:
- Generate 5-8 sentences per exercise
- Each sentence should have 1-2 blanks (_____)
- Provide 4 options per blank (1 correct, 3 plausible distractors)
- Indicate correct answer index (0-3)

2. Level-Specific Guidelines:

BEGINNER:
- Use simple, everyday vocabulary
- Focus on nouns and basic verbs
- Example: "Me _____ agua (options: [nom, di, kɔ, tɔn])"
- Max 5-6 words per sentence

INTERMEDIATE:
- Include common phrases and expressions
- Can omit verbs, adjectives, or simple adverbs
- Example: "Yɛfrɛ me _____ (options: [Kwame, agya, ɔdɔ, sukuu])"
- 6-8 words per sentence

ADVANCED:
- Feature idiomatic expressions/proverbs
- Can omit conjunctions or complex verb forms
- Example: "Sɛ _____ a, _____ (options: [woyɛ dɛn/ɛyɛ dɛm, wuhu/ɛyɛ, wudi/ɛma, wokɔ/ɛba])"
- 8-12 words per sentence

3. Content Rules:
- All Twi text must use proper diacritics
- Distractors should be:
  - Similar-sounding words
  - Same word class (all verbs/nouns/etc.)
  - Common learner mistakes
- Blanks should test meaningful vocabulary/grammar

4. Cultural Considerations:
- Use authentic Ghanaian contexts
- Include 1-2 proverbs for Advanced level
- Ensure sentences reflect natural Twi usage

Example Output for Intermediate:
{
  "level": "Intermediate",
  "sentenceTemplates": [
    {
      "question": "Me _____ Kumasi nnɛ _____ (options: ["kɔ", "ba", "tɔn", "di"], correctAnswer: 0),
      "options": ["ananaso", "anɔpa", "awia", "anwummere"],
      "correctAnswer": 1
    }
  ]
}

Important Notes:
1. Maintain consistent JSON structure
2. All options for a blank must be the same part of speech
3. For multiple blanks, provide separate question/options sets
4. Never use literal English translations as distractors`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI failed to generate valid lesson");
  }
}

const createVocabs = async (req, res) => {
  try {
    const { level } = req.body;
    console.log(level);

    if (!level) return res.status(400).json({ error: "Level is required" });
    const vocabs = await generateVocabs(level);
    const newVocab = new Vocabulary(vocabs);
    await newVocab.save();
    res.status(201).json({
      successs: true,
      message: "Vocabulary matching exercise created successfully",
      data: newVocab,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

const createSentence = async (req, res) => {
  try {
    const { level } = req.body;
    if (!level) return res.status(400).json({ error: "Level is required" });
    const sentence = await generateSentence(level);
    const newSentence = new Sentence(sentence);
    await newSentence.save();
    res.status(201).json({
      successs: true,
      message: "Sentence construction exercise created successfully",
      data: newSentence,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

const createFillInTheBlank = async (req, res) => {
  try {
    const { level } = req.body;
    if (!level) return res.status(400).json({ error: "Level is required" });
    const sentence = await generateFillInTheBlank(level);
    const newSentence = new FillInTheBlank(sentence);
    await newSentence.save();
    res.status(201).json({
      successs: true,
      message: "Fill-in-the-blank exercise created successfully",
      data: newSentence,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

const getVocabs = async (req, res) => {
  try {
    const vocabs = await Vocabulary.find();
    res.status(200).json({
      successs: true,
      message: "Vocabulary matching exercise fetched successfully",
      data: vocabs,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

const getSentences = async (req, res) => {
  try {
    const sentences = await Sentence.find();
    res.status(200).json({
      success: true,
      message: "Sentences retrieved successfully",
      data: sentences,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

const getFillInTheBlank = async (req, res) => {
  try {
    const fillInTheBlank = await FillInTheBlank.find();
    res.status(200).json({
      success: true,
      message: "Fill-in-the-blank exercises retrieved successfully",
      data: fillInTheBlank,
    });
  } catch (error) {
    console.error("AI generation error:", error);
  }
};

module.exports = {
  createVocabs,
  createSentence,
  createFillInTheBlank,
  getVocabs,
  getSentences,
  getFillInTheBlank,
};
