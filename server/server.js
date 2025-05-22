const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Db/Db");
const passport = require("passport");
/* const expressSession = require("express-session"); */
const passportSetup = require("./passport");
const authRouter = require("./Router/auth");
const lessonsRouter = require("./Router/lessons");
const resourcesRouter = require("./Router/Resources");
const excerciseRouter = require("./Router/Excersice");
const cloudinaryRouter = require("./Router/cloudinary");
const alphabetRouter = require("./Router/alphabet");
const phrasesRouter = require("./Router/Phrases");
const cultureRouter = require("./Router/culture"); // Added culture
const dictionaryRouter = require("./Router/Dictionary");
const historyRouter = require("./Router/History");
const commentRouter = require("./Router/comment");
const discussionRouter = require("./Router/discussion");
const eventRouter = require("./Router/event"); // ADDED
const path = require("path");

connectDB();

const app = express();
const port = process.env.PORT || 5500;

// Session configuration
/* app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
); */

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
// Configure allowed origins
const allowedOrigins = [
  "https://akan-gken.onrender.com",
  "http://localhost:5173", // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use("/auth", authRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/exercise", excerciseRouter);
app.use("/api/cloudinary", cloudinaryRouter);
app.use("/api/alphabet", alphabetRouter);
app.use("/api/phrases", phrasesRouter);
app.use("/api/culture", cultureRouter);
app.use("/api/dictionary", dictionaryRouter);
app.use("/api/history", historyRouter);
app.use("/api/comments", commentRouter);
app.use("/api/discussions", discussionRouter);
app.use("/api/events", eventRouter); // ADDED

/* if (process.env.NODE_ENV === "production") {
  // First configuration (React app)
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}


// Second configuration (Vite/dist?)
app.use(express.static(path.join(__dirname, "client/dist")));

// Ensure sitemap.xml and robots.txt are accessible
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/sitemap.xml"));
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/robots.txt"));
}); */

app.listen(port, () => {
  console.log(`Server is running on ports ${port}`);
});
