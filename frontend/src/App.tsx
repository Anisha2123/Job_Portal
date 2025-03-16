// import { useState, useEffect } from "react";
// import axios from "axios";
// import JobCard from "./component/JobCard";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import JobDetails from "./component/JobDetails";  // Import JobDetails
// import './App.css';

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [jobType, setJobType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [location, setLocation] = useState("");
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const res = await axios.get(`http://localhost:5000/api/jobs?page=${page}`);
//       setJobs((prevJobs) => [...prevJobs, ...res.data]);
//       setHasMore(res.data.length > 0);
//     };

//     fetchJobs();
//   }, [page]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setJobs([]); // Clear jobs to trigger fetch
//       setPage(1); // Reset to first page
//     }, 86400000); // 24 hours in milliseconds

//     return () => clearInterval(interval);
//   }, []);

//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
//     if (scrollTop + clientHeight >= scrollHeight && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const filteredJobs = jobs.filter(job => {
//     const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = jobType ? job.type === jobType : true;
//     const matchesExperience = experience ? job.experience >= experience : true;
//     const matchesLocation = location ? job.location === location : true;
//     const matchesCategory = category ? job.category === category : true;
//     return matchesTitle && matchesType && matchesExperience && matchesLocation && matchesCategory;
//   });
// <Router>
// <Routes>
// <Route path="/" element={<App />} />  // Use App itself as the homepag
//   <Route path="/job/:jobId" element={<JobDetails />} />
// </Routes>
// </Router>

//   return (
//     <div className=" main-con p-6">
//       <h1 className="text-2xl font-bold">HireSphere 🌍</h1>
//       <p>
//        Whether you're looking for remote work, tech roles, or executive positions, HireSphere streamlines job hunting with real-time updates, intuitive filters, and seamless navigation—making career growth faster and smarter! 🚀
//       </p>
      
//       <div className="filters">
//       <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter">
//         <option value="">Select Category</option>
//         <option value="sde">SDE</option>
//         <option value="ui/ux">UI/UX</option>
//         <option value="ai/ml">AI/ML</option>
//         <option value="web dev">Web Dev</option>
//         <option value="android dev">Android Dev</option>
//         <option value="cloud engineer">Cloud Engineer</option>
//       </select>
//       <select value={experience} onChange={(e) => setExperience(e.target.value)} className="filter">
//         <option value="">Select Experience</option>
//         <option value="0">0</option>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">2+</option>
//       </select>
//       <select value={location} onChange={(e) => setLocation(e.target.value)} className="filter">
//         <option value="">Select Location</option>
//         <option value="india">India</option>
//         <option value="outside india">Outside India</option>
//       </select>
//       <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="filter">
//         <option value="">Select Job Type</option>
//         <option value="hybrid">Hybrid</option>
//         <option value="work from home">Work from Home</option>
//         <option value="remote">Remote</option>
//         <option value="office">Office</option>
//       </select>
//       </div>
//       <div className="grid grid-cols-3 gap-4 card-section" onScroll={handleScroll}>
//         {filteredJobs.map((job, idx) => <JobCard key={idx} job={job} />)}
//       </div>
//       {!hasMore && <p>No more jobs to load.</p>}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetails from "./component/JobDetails";  // Import JobDetails
import Home from "./component/Home";  // Import Home

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}
export default App;


