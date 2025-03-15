

// const axios = require("axios");
// const cheerio = require("cheerio");
// const Job = require("./models/Job");

// async function scrapeLinkedInJobs(keyword = "Software Engineer") {
//   try {
//     console.log("Starting LinkedIn scraping...");
//     const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(keyword)}`;
    
//     const { data } = await axios.get(url); // Fetch LinkedIn Jobs Page
//     console.log("Fetched LinkedIn job page...");

//     const $ = cheerio.load(data);
//     let jobs = [];

//     $(".job-card-container").each((i, el) => {
//       const title = $(el).find(".job-card-list__title").text().trim();
//       const company = $(el).find(".job-card-container__company-name").text().trim();
//       const location = $(el).find(".job-card-container__metadata-item").text().trim();
//       const applyLink = $(el).find("a").attr("href");
//       const experience = "Not Specified"; 

//       if (title && company) {
//         jobs.push({ title, company, location, applyLink, experience });
//       }
//     });

//     console.log(`Scraped ${jobs.length} jobs from LinkedIn.`);

//     if (jobs.length === 0) {
//       console.log("No jobs found! Check LinkedIn page structure.");
//     }

//     // Clear old jobs and insert new ones
//     await Job.deleteMany({});
//     await Job.insertMany(jobs);

//     console.log("Jobs saved to MongoDB.");
//   } catch (error) {
//     console.error("Error scraping LinkedIn:", error.message);
//   }
// }

// module.exports = scrapeLinkedInJobs;

// require("dotenv").config();
// const puppeteer = require("puppeteer");
// const Job = require("../models/Job");

// async function scrapeLinkedInJobs(keyword = "Software Engineer") {
//   console.log("🚀 Starting LinkedIn job scraping...");

//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto("https://www.linkedin.com/login", { waitUntil: "networkidle2" });

//   // Enter email and password
//   await page.type("#username", process.env.LINKEDIN_EMAIL, { delay: 100 });
//   await page.type("#password", process.env.LINKEDIN_PASSWORD, { delay: 100 });
//   await page.click('[type="submit"]');

//   await page.waitForNavigation();

//   console.log("✅ Logged in to LinkedIn");

//   const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(keyword)}`;
//   await page.goto(url, { waitUntil: "networkidle2" });

//   await page.waitForSelector(".job-card-container", { timeout: 10000 });

//   const jobs = await page.evaluate(() => {
//     const jobNodes = document.querySelectorAll(".job-card-container");
//     let jobData = [];

//     jobNodes.forEach((job) => {
//       const title = job.querySelector(".job-card-list__title")?.innerText.trim();
//       const company = job.querySelector(".job-card-container__company-name")?.innerText.trim();
//       const location = job.querySelector(".job-card-container__metadata-item")?.innerText.trim();
//       const applyLink = job.querySelector("a")?.href;

//       if (title && company && applyLink) {
//         jobData.push({ title, company, location, applyLink, experience: "Not Specified" });
//       }
//     });

//     return jobData;
//   });

//   await browser.close();

//   if (jobs.length === 0) {
//     console.log("❌ No jobs found! Check LinkedIn page structure.");
//     return { error: "Failed to scrape jobs" };
//   }

//   await Job.deleteMany({});
//   await Job.insertMany(jobs);

//   console.log(`✅ Successfully scraped and saved ${jobs.length} LinkedIn jobs.`);
//   return { message: "Scraping completed", jobsCount: jobs.length };
// }

// module.exports = scrapeLinkedInJobs;

const axios = require("axios");
const mongoose = require("mongoose");
const Job = require("./models/Job"); // Import the Job model


async function fetchJobsFromAPI(keyword = "Software Engineer") {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: { query: keyword, num_pages: "1" },
    headers: {
      "X-RapidAPI-Key": "4bbc3688b4msh62c4d2e849503bap168a3ajsn2aa3f0f738b4",  // Replace with valid key
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    const jobsData = response.data.data;
    
    console.log("✅ Jobs Fetched:", jobsData.length);

    if (jobsData.length === 0) {
      console.log("⚠️ No jobs found!");
      return;
    }

    // Transform the API data to match MongoDB schema
    const formattedJobs = jobsData.map(job => {
      const description = job.job_description || "No description available";

      console.log("Formatted Job Before Insert:", {
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city || "Remote",
        applyLink: job.job_apply_link,
        shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...", // Remove newlines and trim
          experience: job.job_required_experience || "Not specified",
        // fullDescription: job.job_description || "No description available",
      });
    
      return {
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city || "Remote",
        applyLink: job.job_apply_link,
        shortDescription: description.replace(/\n/g, " ").slice(0, 150) + "...", // Remove newlines and trim
        experience: job.job_required_experience || "Not specified",
      };
    });
    

//     const formattedJobs = jobsData.map(job => {
//       // console.log("Original Job Data:", job); // Debugging API response
//       // console.log("Original Job Description:", job.job_description); // Debugging
//   const shortDesc = job.job_description?.slice(0, 10) + "..." || "No description available";
//   // console.log("📝 Short Description:", shortDesc); // Debug log
//   console.log("Formatted Job Before Insert:", {
//     title: job.job_title,
//     company: job.employer_name,
//     shortDescription: job.job_description
//       ? job.job_description.slice(0, 150) + "..."
//       : "No description available",
//     fullDescription: job.job_description || "No description available",
//   });
//   return {
//     title: job.job_title,
//     company: job.employer_name,
//     location: job.job_city || "Remote",
//     applyLink: job.job_apply_link,
//     shortDescription: shortDesc, // Short preview
//     fullDescription: job.job_description || "No description available",
//     experience: job.job_required_experience || "Not specified",
//   };
// });

  
// console.log("Formatted Jobs Before Insert:", formattedJobs);
// console.log("API Job Data:", jobsData.slice(0, 5)); // Check first 5 jobs

    // Insert into MongoDB
    await Job.insertMany(formattedJobs);
    console.log("💾 Jobs saved to MongoDB!");
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
  }
}

// Call function to fetch and save jobs
fetchJobsFromAPI();









