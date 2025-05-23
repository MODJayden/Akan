const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Db/Db");
const passport = require("passport");
const session = require("express-session");
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
const MongoStore = require("connect-mongo");

connectDB();

const app = express();
const port = process.env.PORT || 5500;
app.set("trust proxy", 1);
// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-site
      httpOnly: true,
      domain:
        process.env.NODE_ENV === "production"
          ? ".akanaaaa.onrender.com"
          : undefined,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-access-token",
      "x-key",
      "x-secret",
    ],
  })
);

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

app.listen(port, () => {
  console.log(`Server is running on ports ${port}`);
});
