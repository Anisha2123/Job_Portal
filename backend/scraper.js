

const axios = require("axios");
const mongoose = require("mongoose");
const Job = require("./models/Job"); // Import the Job model


// async function fetchJobsFromAPI(keyword = "Software Engineer") {
//   const options = {
//     method: "GET",
//     url: "https://jsearch.p.rapidapi.com/search",
//     params: { query: keyword, country: "IN", num_pages: "1" }, // ✅ Filter by India
//     headers: {
//       "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     const jobsData = response.data.data || [];

//     console.log("✅ Jobs Fetched:", jobsData.length);

//     jobsData.forEach(job => console.log("🌍 Job Country:", job.job_country));


//     if (jobsData.length === 0) {
//       console.log("⚠️ No jobs found!");
//       return;
//     }

//     // ✅ Filter Jobs for India (Double-check API response)
//     const indianJobs = jobsData.filter(job => job.job_country === "IN");

//     console.log("🇮🇳 Indian Jobs Found:", indianJobs.length);

//     if (indianJobs.length === 0) {
//       console.log("⚠️ No Indian jobs found!");
//       return;
//     }

//           // Function to extract experience from job description
//      // Function to extract experience from job description
//      function extractExperience(description) {
//       if (!description) return "Not specified";

//       const fresherRegex = /\b(fresher|entry\s*level|0-1\s*years?)\b/i;  // Detect fresher jobs
//       // const expRegex = /(\d+)\+?\s*(?:years?|yrs)/i; // Match "3+ years", "5 years", etc.
//       const expRegex = /(\d+)(?:-\d+)?\+?\s*(?:years?|yrs)/i;

//       if (fresherRegex.test(description)) {
//         console.log("🆕 Detected Fresher Job!");
//         return "Fresher";
//       }

//       const match = description.match(expRegex);
//       const extractedExp = match ? `${match[1]} years` : "Not specified";

//       console.log("🔍 Extracted Experience:", extractedExp); // Log extracted experience
//       return extractedExp;
//     }

//     // Transform jobs to match MongoDB schema
//     const formattedJobs = indianJobs.map(job => {
//       const description = job.job_description || "No description available";
//       const extractedExperience = extractExperience(description);

//       console.log("Formatted Job Before Insert:", {
//         // title: job.job_title,
//         // company: job.employer_name,
//         // location: job.job_city || "Remote",
//         // applyLink: job.job_apply_link,
//         // shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...",
//         experience: extractedExperience, // Extracted experience || "Not specified",
//       });

//       return {
//         title: job.job_title,
//         company: job.employer_name,
//         location: job.job_city || "Remote",
//         applyLink: job.job_apply_link,
//         shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...",
//         experience: extractedExperience, 
//       };
//     });

//     // ✅ Save only Indian jobs to MongoDB
//     await Job.insertMany(formattedJobs);
//     console.log("💾 Indian Jobs saved to MongoDB!");
//   } catch (error) {
//     console.error("❌ API Error:", error.response?.data || error.message);
//   }
// }

// // Call function to fetch and save jobs
// fetchJobsFromAPI();

async function fetchJobsFromAPI() {
  const categoryKeywords = {
    "Software Engineer": ["software engineer", "developer", "sde"],
    "UI/UX": ["ui/ux", "designer"],
    "AI/ML": ["ai", "ml", "machine learning", "artificial intelligence"],
    "Web Dev": ["web developer", "frontend", "backend", "full stack"],
    "Android Dev": ["android developer", "mobile developer"],
    "Cloud Engineer": ["cloud", "aws", "azure", "gcp"],
    "Product Manager": ["product manager", "pm"],
  };

  try {
    for (const category in categoryKeywords) {
      for (const keyword of categoryKeywords[category]) {
        console.log(`🔍 Fetching jobs for category: ${category}, keyword: ${keyword}`);

        const options = {
          method: "GET",
          url: "https://jsearch.p.rapidapi.com/search",
          params: { query: keyword, country: "IN", num_pages: "1" },
          headers: {
            "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const jobsData = response.data.data || [];

        console.log(`✅ Jobs fetched for '${keyword}':`, jobsData.length);

        if (jobsData.length === 0) {
          console.log(`⚠️ No jobs found for '${keyword}'`);
          continue;
        }

        const indianJobs = jobsData.filter((job) => job.job_country === "IN");

        console.log(`🇮🇳 Indian jobs for '${keyword}':`, indianJobs.length);

        if (indianJobs.length === 0) {
          console.log(`⚠️ No Indian jobs found for '${keyword}'`);
          continue;
        }

        function extractExperience(description) {
          if (!description) return "Not specified";
          const fresherRegex = /\b(fresher|entry\s*level|0-1\s*years?)\b/i;
          const expRegex = /(\d+)(?:-\d+)?\+?\s*(?:years?|yrs)/i;

          if (fresherRegex.test(description)) return "Fresher";
          const match = description.match(expRegex);
          return match ? `${match[1]} years` : "Not specified";
        }

        const formattedJobs = indianJobs.map((job) => ({
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || "Remote",
          applyLink: job.job_apply_link,
          shortDescription: (job.job_description || "No description").replace(/\n/g, " ").slice(0, 150) + "...",
          experience: extractExperience(job.job_description),
          category, // ✅ Store category for better filtering
        }));

        await Job.insertMany(formattedJobs);
        console.log(`💾 ${formattedJobs.length} '${category}' jobs saved to MongoDB!`);
      }
    }
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
  }
}

// Call function to fetch and save jobs
fetchJobsFromAPI();










