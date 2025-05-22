const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Db/Db");
const passport = require("passport");
const expressSession = require("express-session");
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
app.use(
  cors({
    origin: "http://localhost:5173" || process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
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

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
// Serve static files from the client's build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// Ensure sitemap.xml and robots.txt are accessible
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/sitemap.xml"));
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/robots.txt"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
