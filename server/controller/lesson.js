const { GoogleGenerativeAI } = require("@google/generative-ai");
const Lesson = require("../Model/Lesson");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateLesson(topic, level) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate a ${level} Akan (Twi) language lesson about ${topic} in this exact JSON format:
  {
    "title": "string",
    "description": "string",
    "content": "string (markdown formatted)",
    "exercises": [{
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number
    }]
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

const generateLessons = async (req, res) => {
  try {
    const { topic, level } = req.body;
     
    
    if (!topic || !level) {
      return res.status(400).json({ error: "Topic and level are required" });
    }

    const aiLesson = await generateLesson(topic, level);

    // Validate AI response
    if (!aiLesson?.title || !aiLesson?.content) {
      throw new Error("AI returned incomplete lesson data");
    }

    const lessonCount = await Lesson.countDocuments({ level });
    const lesson = new Lesson({
      ...aiLesson,
      level,
      order: lessonCount + 1,
    });

    await lesson.save();

    res.status(201).json({
      success: true,
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        level: lesson.level,
      },
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ level: 1, order: 1 });
    res.status(200).json({
      success: true,
      data: lessons,
      
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

module.exports = {
  generateLessons,
  getLessons,
};
