

const axios = require("axios");
const mongoose = require("mongoose");
const Job = require("./models/Job"); // Import the Job model


// async function fetchJobsFromAPI(keyword = "Software Engineer") {
  
//   const options = {
//     method: "GET",
//     url: "https://jsearch.p.rapidapi.com/search",
//     params: { query: keyword, num_pages: "1" },
//     headers: {
//       "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",  // Replace with valid key
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     const jobsData = response.data.data;
    
//     console.log("✅ Jobs Fetched:", jobsData.length);

//     if (jobsData.length === 0) {
//       console.log("⚠️ No jobs found!");
//       return;
//     }

//     // Transform the API data to match MongoDB schema
//     const formattedJobs = jobsData.map(job => {
//       const description = job.job_description || "No description available";

//       console.log("Formatted Job Before Insert:", {
//         title: job.job_title,
//         company: job.employer_name,
//         location: job.job_city || "Remote",
//         applyLink: job.job_apply_link,
//         shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...", // Remove newlines and trim
//           experience: job.job_required_experience || "Not specified",
//         // fullDescription: job.job_description || "No description available",
//       });
    
//       return {
//         title: job.job_title,
//         company: job.employer_name,
//         location: job.job_city || "Remote",
//         applyLink: job.job_apply_link,
//         shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...", // Remove newlines and trim
//         experience: job.job_required_experience || "Not specified",
//       };
//     });
  

//     // Insert into MongoDB
//     await Job.insertMany(formattedJobs);
//     console.log("💾 Jobs saved to MongoDB!");
//   } catch (error) {
//     console.error("❌ API Error:", error.response?.data || error.message);
//   }
// }

// // Call function to fetch and save jobs
// fetchJobsFromAPI();

async function fetchJobsFromAPI(keyword = "Software Engineer") {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: { query: keyword, country: "IN", num_pages: "1" }, // ✅ Filter by India
    headers: {
      "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    const jobsData = response.data.data || [];

    console.log("✅ Jobs Fetched:", jobsData.length);

    jobsData.forEach(job => console.log("🌍 Job Country:", job.job_country));


    if (jobsData.length === 0) {
      console.log("⚠️ No jobs found!");
      return;
    }

    // ✅ Filter Jobs for India (Double-check API response)
    const indianJobs = jobsData.filter(job => job.job_country === "IN");

    console.log("🇮🇳 Indian Jobs Found:", indianJobs.length);

    if (indianJobs.length === 0) {
      console.log("⚠️ No Indian jobs found!");
      return;
    }

    // Transform jobs to match MongoDB schema
    const formattedJobs = indianJobs.map(job => {
      const description = job.job_description || "No description available";

      console.log("Formatted Job Before Insert:", {
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city || "Remote",
        applyLink: job.job_apply_link,
        shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...",
        experience: job.job_required_experience || "Not specified",
      });

      return {
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city || "Remote",
        applyLink: job.job_apply_link,
        shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...",
        experience: job.job_required_experience || "Not specified",
      };
    });

    // ✅ Save only Indian jobs to MongoDB
    await Job.insertMany(formattedJobs);
    console.log("💾 Indian Jobs saved to MongoDB!");
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
  }
}

// Call function to fetch and save jobs
fetchJobsFromAPI();










