

const express = require("express");
const Job = require("../models/Job");
const scrapeLinkedInJobs = require("../scraper");

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Manually trigger scraping
router.get("/scrape", async (req, res) => {
  try {
    await scrapeLinkedInJobs();
    res.json({ message: "Scraping completed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape jobs" });
  }
});

// router.get("/jobs", async (req, res) => {
//     try {
//       const { query = "Software Engineer" } = req.query; // Get query param
//       const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
//         params: { query, num_pages: "1" },
//         headers: {
//           "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4", // Replace with your API key
//           "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
//         }
//       });
  
//       res.json(response.data.data); // Send job data to frontend
//     } catch (error) {
//       console.error("Error fetching jobs:", error.message);
//       res.status(500).json({ error: "Failed to fetch jobs" });
//     }
//   });
  

router.get("/jobs", async (req, res) => {
    try {
      const { category, experience, location, jobType } = req.query;
      
      // Construct query dynamically
      let query = "Software Engineer"; // Default job role if nothing is selected
      
      // Append filters if they exist
    if (category) query = category;
    if (experience) query += ` ${experience} years`;
    if (location) query += ` in ${location}`;
    if (jobType) query += ` (${jobType})`;
        
    console.log("🟢 Final Query Sent:", query); // Debugging
  
      const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: { query, num_pages: "1" },
        headers: {
          "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4", // Replace with your API key
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
      });
  
      res.json(response.data.data); // Send job data to frontend
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

// router.get("/jobs", async (req, res) => {
//     console.log("🚀 API Request Reached jobRoutes.js"); // ✅ Confirms request is receive
//     try {
//         const { category, experience, jobType } = req.query;
//         const country = "India"; // Correct parameter for filtering India jobs

//         // Construct query dynamically
//         let query = category || "Software Engineer"; // Default role
//         if (experience) query += ` ${experience} years`;
//         if (jobType) query += ` (${jobType})`;

//         console.log("🟢 Final Query Sent:", query); 
//         console.log("🌍 Country Set:", country);  // Debugging

//         const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
//             params: {
//                 query, 
//                 country, // Using correct country parameter
//                 num_pages: "1",
//             },
//             headers: {
//                 "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",
//                 "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//             },
//         });

//         res.json(response.data.data);
//     } catch (error) {
//         console.error("❌ Error fetching jobs:", error.message);
//         res.status(500).json({ error: "Failed to fetch jobs" });
//     }
// });



module.exports = router;
