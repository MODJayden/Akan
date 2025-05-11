const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.API_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Multer configuration for any file type
const storage = multer.memoryStorage();
const uploadFile = multer({
  storage,
  limits: {
    fileSize: 60 * 1024 * 1024, // 50MB limit (increased for videos)
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types but you can add restrictions if needed
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
      "audio/mpeg",
      "audio/wav",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only specific file types are allowed"), false);
    }
    cb(null, true);
  },
});

// Enhanced upload function with timeout handling
const uploadToCloudinary = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Determine resource type based on mimetype
    let resourceType = "auto";
    if (file.mimetype.startsWith("image/")) {
      resourceType = "image";
    } else if (file.mimetype.startsWith("video/")) {
      resourceType = "video";
    } else if (file.mimetype.startsWith("audio/")) {
      resourceType = "video"; // Cloudinary treats audio as video type
    }

    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    // Upload options
    const uploadOptions = {
      resource_type: resourceType,
      folder:
        resourceType === "video"
          ? "akan_videos"
          : resourceType === "image"
          ? "akan_images"
          : "akan_files",
      public_id: `${resourceType}_${Date.now()}`,
      overwrite: false,
     timeout: 300000
    };

    // Create a promise with timeout
    const uploadPromise = cloudinary.uploader.upload(dataURI, uploadOptions);

    // Set timeout for the upload
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Upload timed out. The file might be too large."));
      }, 300000); // 60 seconds
    });

    // Race the upload against the timeout
    const result = await Promise.race([uploadPromise, timeoutPromise]);

    return {
      success: true,
      result,
      resourceType,
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

// Express middleware handler for any file type
const handleUploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    const { success, result, message, error, resourceType } =
      await uploadToCloudinary(req.file);

    if (!success) {
      return res.status(500).json({
        success: false,
        message: message || "File upload failed",
        error,
      });
    }

    // Prepare response data based on resource type
    const responseData = {
      url: result?.secure_url,
      publicId: result.public_id,
    };

    if (resourceType === "video" || resourceType === "image") {
      responseData.width = result.width;
      responseData.height = result.height;
    }

    if (resourceType === "video") {
      responseData.duration = result.duration;
    }

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  uploadToCloudinary,
  handleUploadFile, // Renamed from handleUploadAudio
};
