const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("audio/")) {
      return cb(new Error("Only audio files are allowed"), false);
    }
    cb(null, true);
  },
});

// Enhanced upload function
const uploadToCloudinary = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    // Upload options
    const uploadOptions = {
      resource_type: "auto",
      folder: "akan_audio",
      public_id: `audio_${Date.now()}`,
      overwrite: false,
    };

    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      message: error.message || "Upload failed",
      error,
    };
  }
};

// Express middleware handler
const handleUploadAudio = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file provided",
      });
    }

    const { success, result, message, error } = await uploadToCloudinary(
      req.file
    );

    if (!success) {
      return res.status(500).json({
        success: false,
        message: message || "Audio upload failed",
        error,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        url: result?.secure_url,
        publicId: result.public_id,
        duration: result.duration,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
  handleUploadAudio,
};
