
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  applyLink: string;
  shortDescription: string;
  experience: string;
}

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${jobId}`).then((response) => {
      setJob(response.data);
    }).catch((error) => {
      console.error("Error fetching job:", error);
    });
  }, [jobId]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details">
      <h1 className="job-title">{job.title}</h1>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-description">{job.shortDescription}</p>
      <p className="job-experience">Experience: {job.experience}</p>
      <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
    </div>
  );
};

export default JobDetails;
