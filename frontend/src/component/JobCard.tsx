import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface JobProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    applyLink: string;
    shortDescription: string;
    experience: string;
  };
}

const JobCard: React.FC<JobProps> = ({ job }) => {
  // console.log("Rendering Job:", job); // Debugging
  console.log("Rendering Job ID:", job._id, "Short Description:", job.shortDescription); // Debugging
  console.log(job.company);

  // if (!job || !job.shortDescription) return null;
  // const shortText = job.shortDescription.length > 100 
  //   ? job.shortDescription.slice(0, 100) + "..." 
  //   : job.shortDescription;

  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-description">
        {job.shortDescription}</p>
      <p className="job-experience">Experience: {job.experience}</p>
      <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
    </div>
  );
};


export default JobCard;



  