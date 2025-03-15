

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const scrapeLinkedInJobs = require("./scraper");
const jobRoutes = require("./routes/jobRoutes"); // Import routes
const Job = require ( "./models/Job");

require("dotenv").config();


const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

const PORT = 5000;

// Debugging: Log when the server starts
console.log("Starting server...");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "db",
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Debugging: Log when the database is connected
mongoose.connection.once("open", () => {
  console.log("🔗 Connected to MongoDB database:", mongoose.connection.db.databaseName);
});



// ✅ **TEST API: Check if server is running**
app.get("/", (req, res) => {
  console.log("✅ Test API hit: /");
  res.send("✅ Server is running!");
});

// ✅ **DEBUGGING: Log every API request**
app.use((req, res, next) => {
  console.log(`🛠️ API Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/jobs", jobRoutes); // Register routes

// ✅ **FETCH JOBS API**
app.get("/api/jobs", async (req, res) => {
  console.log("📡 Received request at /api/jobs");
  try {
    const jobs = await Job.find();
    console.log("📝 Jobs found:", jobs); // Debugging log
    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ **404 Handler**
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send("❌ API route not found");
});


// Run every 24 hours
cron.schedule("0 0 * * *", () => {
  console.log("Running job scraping...");
  scrapeLinkedInJobs();
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

