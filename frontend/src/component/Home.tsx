
import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";

import '../App.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");




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
  
useEffect(() => {
    const fetchJobs = async () => {
      let query = new URLSearchParams();
  
      if (category) query.append("category", category);
      if (experience) query.append("experience", experience);
      if (location) query.append("location", location);
      if (jobType) query.append("jobType", jobType);
  
      try {
        const res = await fetch(`http://localhost:5000/api/jobs?${query.toString()}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  }, [category, experience, location, jobType]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs([]); // Clear jobs to trigger fetch
      setPage(1); // Reset to first page
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType ? job.type === jobType : true;
    const matchesExperience = experience ? job.experience >= experience : true;
    const matchesLocation = location ? job.location === location : true;
    const matchesCategory = category ? job.category === category : true;
    return matchesTitle && matchesType && matchesExperience && matchesLocation && matchesCategory;
  });

  return (
    <div className=" main-con p-6">
      <h1 className="text-2xl font-bold">HireSphere 🌍</h1>
      <p>
       Whether you're looking for remote work, tech roles, or executive positions, HireSphere streamlines job hunting with real-time updates, intuitive filters, and seamless navigation—making career growth faster and smarter! 🚀
      </p>
      
      <div className="filters">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter">
  <option value="">Select Category</option>
  <option value="Product Manager">Product Manager</option>
  <option value="SDE">SDE</option>
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
        <option value="india">India</option>
        <option value="outside india">Outside India</option>
      </select>
      <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="filter">
        <option value="">Select Job Type</option>
        <option value="hybrid">Hybrid</option>
        <option value="work from home">Work from Home</option>
        <option value="remote">Remote</option>
        <option value="office">Office</option>
      </select>
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

    </div>
  );
}

export default Home;