

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
// app.get("/api/jobs/saved", async (req, res) => {
//   console.log("📡 Received request at /api/jobs/saved");
//   try {
//     const jobs = await Job.find();
//     console.log("📝 Saved Jobs:", jobs);
//     res.json(jobs);
//   } catch (error) {
//     console.error("❌ Error fetching jobs:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.get("/api/jobs/saved", async (req, res) => {
//   console.log("📡 Received request at /api/jobs/saved with filters:", req.query);
//   try {
//     const query = {};

//     if (req.query.title) query.title = { $regex: req.query.title, $options: "i" }; // Case-insensitive search
//     if (req.query.experience) query.experience = { $gte: parseInt(req.query.experience) }; // Experience filtering
//     if (req.query.location) query.location = req.query.location;
//     if (req.query.type) query.type = req.query.type;
//     if (req.query.category) query.category = req.query.category;

//     const jobs = await Job.find(query);
//     console.log("📝 Filtered Jobs:", jobs.length);

//     res.json(jobs);
//   } catch (error) {
//     console.error("❌ Error fetching jobs:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// app.get("/api/jobs/saved", async (req, res) => {
//   console.log("📡 Received request at /api/jobs/saved with filters:", req.query);
  
//   try {
//     let filters = {};

//     if (req.query.category) {
//       filters.title = { $regex: req.query.category, $options: "i" }; // Case-insensitive search
//     }

//     console.log("🛠️ Applied Filters:", filters);

//     const jobs = await Job.find(filters);
//     console.log("📝 Filtered Jobs:", jobs.length);

//     res.json(jobs);
//   } catch (error) {
//     console.error("❌ Error fetching jobs:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.get("/api/jobs/saved", async (req, res) => {
  try {
     // ✅ Correctly destructure all query parameters
     const { title, category, experience, location, page = "1", limit = "10" } = req.query;

    let filters = {};

    // ✅ Apply Title Search
    if (title) {
      filters.title = { $regex: new RegExp(title, "i") }; // Case-insensitive search
    }

    // ✅ Apply category filter using regex
    if (category) {
      const categoryKeywords = {
        "Software Engineer": ["software engineer", "developer", "sde"],
        "UI/UX": ["ui/ux", "designer"],
        "AI/ML": ["ai", "ml", "machine learning", "artificial intelligence"],
        "Web Dev": ["web developer", "frontend", "backend", "full stack"],
        "Android Dev": ["android developer", "mobile developer"],
        "Cloud Engineer": ["cloud", "aws", "azure", "gcp"],
        "Product Manager": ["product manager", "pm"],
      };

      // Match any keyword in the title
      const categoryRegex = categoryKeywords[category]
        ? categoryKeywords[category].map((keyword) => new RegExp(keyword, "i"))
        : [new RegExp(category, "i")];

      filters.title = { $in: categoryRegex };
    }

  // ✅ Apply experience filter (Less than or equal to selected experience)
if (experience) {
  const expNumber = Number(experience); // Convert string to number

  filters.$or = [
    { experience: /fresher/i }, // Include "Fresher" jobs
    { experience: { $regex: new RegExp(`^${expNumber}(\\+|\\s|$)`, "i") } }, // Match exact or "2+"
    { experience: { $regex: /^\d+/, $options: "i" }, experience: { $lte: expNumber } }, // Ensure numeric experience
  ];
}

   // ✅ Location Filtering
   if (location) {
    if (location === "Others") {
      filters.location = { $nin: ["Banglore", "Hyderabad"] }; // Exclude these locations
    } else {
      filters.location = location;
    }
  }
    console.log("🛠️ Applied Filters:", filters);

    
    
    
   // ✅ Convert page & limit to numbers with defaults
   const pageNumber = Math.max(parseInt(page, 10), 1);
   const pageSize = Math.max(parseInt(limit, 10), 10);
   
  // ✅ Count total jobs
   const totalJobs = await Job.countDocuments(filters); // ✅ Count total jobs

    const jobs = await Job.find(filters)
    .skip((pageNumber - 1) * pageSize) // Skip previous pages
    .limit(pageSize); // Limit jobs per page

    console.log(`📝 Page ${pageNumber}: ${jobs.length} jobs fetched`);

    console.log("📝 Filtered Jobs:", jobs.length);

    res.json({
      jobs,
      totalJobs, // ✅ Send total jobs for frontend pagination
      totalPages: Math.ceil(totalJobs / pageSize), // ✅ Calculate total pages
      currentPage: pageNumber,
    });
} catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

