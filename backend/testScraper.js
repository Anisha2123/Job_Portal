
const scrapeJobs = require("./scraper");

(async () => {
  const jobs = await scrapeJobs("developer");
  console.log(jobs); // Check if it returns data
})();
