
import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";

import '../App.css';

type Job = {
  title: string;
  company: string;
  location: string;
  applyLink: string;
  shortDescription: string;
  experience: string;
  postedAt: string;
  type: string; // ✅ Add this line if job type exists in your API response
  _id: string;  // ✅ Add this field
};

function Home() {

  
  
  // const [jobs, setJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [experience, setExperience] = useState("");
  // const [location, setLocation] = useState("");
  // const [jobType, setJobType] = useState("");
  // const [category, setCategory] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [experience, setExperience] = useState("");

  const [location, setLocation] = useState("");

  const [jobType, setJobType] = useState("");
  
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // ✅ Initialize totalPages
const jobsPerPage = 10; // Number of jobs per page





//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/jobs?page=${page}`);
//         console.log("Fetched jobs:", res.data);  // Debugging
//         // setJobs((prevJobs) => [...prevJobs, ...res.data]);
//         setJobs(res.data); // Instead of appending, replace jobs
//         setHasMore(res.data.length > 0);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, [page]);
  
// useEffect(() => {
//     const fetchJobs = async () => {
//       let query = new URLSearchParams();
  
//       if (category) query.append("category", category);
//       if (experience) query.append("experience", experience);
//       if (location) query.append("location", location);
//       if (jobType) query.append("jobType", jobType);

      
//     console.log("Fetching with params:", query.toString()); // Debugging
  
//       try {
//         const res = await fetch(`http://localhost:5000/api/jobs?${query.toString()}`);
//         const data = await res.json();
//         setJobs(data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
  
//     fetchJobs();
//   }, [category, experience, location, jobType]);
  
 // Fetch jobs from MongoDB
//  useEffect(() => {
//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs/saved");
//       setJobs(res.data);
//       setFilteredJobs(res.data); // Initially set filtered jobs to all jobs
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };
//   fetchJobs();
// }, []);

 // Filter Jobs Dynamically
 // Fetch jobs from backend with filters
 useEffect(() => {
 const fetchJobs = async () => {
  try {
    const params: { [key: string]: string} = {
      page: String(currentPage),
        limit: String(jobsPerPage),
    };
    

    if (searchTerm) params.title = searchTerm;
    if (experience) params.experience = experience;
    if (location) params.location = location;
    if (jobType) params.type = jobType;
    if (category) params.category = category;

    console.log("🔍 Fetching jobs with filters:", params);

    // const res = await axios.get("http://localhost:5000/api/jobs/saved", { params });
    const res = await axios.get("https://job-portal-54lt.onrender.com/api/jobs/saved", { params });


    console.log("🎯 Jobs received:", res.data); // Debugging
    
    setJobs(res.data);
    setFilteredJobs(res.data); // ✅ Update filteredJobs immediately
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
  }
};
fetchJobs();
}, [searchTerm, experience, location, jobType, category]); // ✅ Dependencies added

useEffect(() => {
  console.log("Selected Filters:", { jobType, experience, location, category });
}, [jobType, experience, location, category]);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setJobs([]); // Clear jobs to trigger fetch
  //     setPage(1); // Reset to first page
  //   }, 86400000); // 24 hours in milliseconds

  //   return () => clearInterval(interval);
  // }, []);

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
  //   if (scrollTop + clientHeight >= scrollHeight && hasMore) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

//   useEffect(() => {
//     const filtered = jobs.filter((job) => {
//       const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = jobType ? job.type === jobType : true;
//       const matchesExperience = experience ? Number(job.experience) >= Number(experience) : true;
//       const matchesLocation = location ? job.location.toLowerCase() === location.toLowerCase() : true;
       
//       // 🔍 Match Category based on keywords in the job title
//       const categoryKeywords: Record<string, string[]> = {
//         "Software Engineer": ["software engineer", "developer", "sde"],
//         "UI/UX": ["ui/ux", "designer"],
//         "AI/ML": ["ai", "ml", "machine learning", "artificial intelligence"],
//         "Web Dev": ["web developer", "frontend", "backend", "full stack"],
//         "Android Dev": ["android developer", "mobile developer"],
//         "Cloud Engineer": ["cloud", "aws", "azure", "gcp"],
//         "Product Manager": ["product manager", "pm"],
//       };
      
  
//       // 🔍 Ensure category exists in the mapping before accessing it
//     const matchesCategory =
//     category === "" ||
//     (categoryKeywords[category] &&
//       categoryKeywords[category].some((keyword) => job.title.toLowerCase().includes(keyword)));



//   return matchesTitle && matchesType && matchesExperience && matchesLocation && matchesCategory;
// });
  
//     console.log("🛠️ Filtered Jobs:", filtered);
//     setFilteredJobs(filtered);
//   }, [jobs, searchTerm, experience, location, jobType, category]);
  
useEffect(() => {
  const filtered = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesTitle = job.title?.toLowerCase() || ""; // Prevent undefined error
    const matchesType = jobType ? job.type === jobType : true;
    // const matchesLocation = location ? job.location.toLowerCase() === location.toLowerCase() : true;

    // ✅ Experience Filtering
    let jobExp = job.experience.toLowerCase(); // e.g., "Fresher" or "3 years"
    let selectedExp = Number(experience); // Convert selected experience to number

    const isFresher = jobExp.includes("fresher");
    const jobExpNumber = parseInt(jobExp); // Extract numeric value (e.g., 3 from "3 years")

    const matchesExperience = experience
      ? isFresher
        ? selectedExp === 0 // Show fresher jobs when "0" is selected
        : !isNaN(jobExpNumber) && jobExpNumber <= selectedExp // Match min experience
      : true;


      // Location filtering
      const matchesLocation = location
      ? location === "Others"
        ? !["Banglore", "Hyderabad"].includes(job.location) // Show jobs NOT in Banglore or Hyderabad
        : job.location === location // Match selected location
      : true;

    // 🔍 Category Mapping
    const categoryKeywords: Record<string, string[]> = {
      "Software Engineer": ["software engineer", "developer", "sde"],
      "UI/UX": ["ui/ux", "designer"],
      "AI/ML": ["ai", "ml", "machine learning", "artificial intelligence"],
      "Web Dev": ["web developer", "frontend", "backend", "full stack"],
      "Android Dev": ["android developer", "mobile developer"],
      "Cloud Engineer": ["cloud", "aws", "azure", "gcp"],
      "Product Manager": ["product manager", "pm"],
    };

    // ✅ Category Filtering (Matches job title with relevant keywords)
    const matchesCategory =
      category === "" ||
      (categoryKeywords[category] &&
        categoryKeywords[category].some((keyword) => job.title.toLowerCase().includes(keyword)));

    return matchesTitle && matchesType && matchesExperience && matchesLocation && matchesCategory;
  });

  console.log("🛠️ Filtered Jobs:", filtered);
  setFilteredJobs(filtered);
}, [jobs, searchTerm, experience, location, jobType, category]); // ✅ Dependencies ensure re-filtering

  return (
    <div className=" main-con p-6">
      <h1 className="text-2xl font-bold">HireSphere 🌍</h1>
      <p>
       Whether you're looking for remote work, tech roles, or executive positions, HireSphere streamlines job hunting with real-time updates, intuitive filters, and seamless navigation—making career growth faster and smarter! 🚀
      </p>
      <input
  type="text"
  placeholder="Search by Job Title..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-bar"
/>
      
      <div className="filters">
      

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter">
  <option value="">Select Category</option>
  {/* <option value="Product Manager">Product Manager</option> */}
  <option value="Software Engineer">SDE</option>
  <option value="UI/UX">UI/UX</option>
  <option value="AI/ML">AI/ML</option>
  <option value="Web Dev">Web Dev</option>
  <option value="Android Dev">Android Dev</option>
  <option value="Cloud Engineer">Cloud Engineer</option>
</select>

      <select value={experience} onChange={(e) => setExperience(e.target.value)} className="filter">
        <option value="">Select Experience</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">2+</option>
      </select>
      <select value={location} onChange={(e) => setLocation(e.target.value)} className="filter">
        <option value="">Select Location</option>
        <option value="Banglore">Banglore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Remote">Remote</option>
        <option value="Others">Others</option>
      </select>
      {/* <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="filter">
        <option value="">Select Job Type</option>
        <option value="Banglore">Banglore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Remote">Remote</option>
        <option value="Others">Others</option>
  
      </select> */}
      </div>
      <div className="grid grid-cols-3 gap-4 card-section">
  {filteredJobs.length > 0 ? (
    filteredJobs.map((job, idx) => (
      <div key={idx}>
        {/* <p>Rendering job: {job.title}</p> Debugging */}
        <JobCard job={job} />
      </div>
    ))
  ) : (
    <p className="text-red-500 font-bold">No jobs available</p>
  )}
</div>
<div className="pagination">
<button
  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
>
  Previous
</button>

<span> Page {currentPage} of {totalPages} </span>

<button
  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  disabled={currentPage === totalPages}
>
  Next
</button>

</div>




    </div>
  );
}

export default Home;