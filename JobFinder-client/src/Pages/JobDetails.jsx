import React, { useEffect, useState, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);


const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";
  const [job, setJob] = useState([]);
  useEffect(() => {
  

    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  console.log(job.summary);

 const handleApply = async (id) => {
  // Show Swal alert with input field and file input
  const { value: file } = await Swal.fire({
    title: 'Upload your CV',
    input: 'file',
    inputAttributes: {
      accept: 'application/pdf',
      'aria-label': 'Upload your CV'
    }
  });

  if (file) {
    // Create FormData object to send file to server
    const formData = new FormData();
    formData.append('resume', file);
    let currentDate = new Date();
    let date = currentDate.toISOString().slice(0, 10);

    // Append other data to FormData object
    formData.append('applicantEmail', user?.email);
    formData.append('recruiterEmail', job.postingBy);
    formData.append('jobId', job._id);
    formData.append('status', 'pending');
    formData.append('dateOfApplication', date);
    formData.append('CompanyName', job.companyName);
    formData.append('JobPosition', job.jobTitle);

    try {
      const response = await fetch("http://localhost:5000/application", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      
      Swal.fire({
        icon: "success",
        title: "Hurray...",
        text: result?.data?.message
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong."
      });
    }
  }
};


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <section className="w-8/12 m-8">
        <div>
          <h1 className="text-4xl font-bold italic text-gray-900 mb-3">
            {job.jobTitle}
          </h1>
          <div className="flex gap-6 py-3 items-center">
            <img src={job.companyLogo} alt="logo" className="w-50" />

            <h2 className="text-3xl text-gray-700 font-semibold italic">
              {job.companyName}
            </h2>
          </div>
          <div>
            <h3 className="text-md font-semibold italic text-gray-700 py-3">
              Time Posted: {job.postingDate}
            </h3>
          </div>
          <hr className="m mb-4" />
          <div className="flex text-sm gap-9 my-6">
            <h3 className=" w-28 h-5 text-center  p-auto bg-gray-300 rounded">
              {job?.experienceLevel ?? "none"}
            </h3>
            <h3 className=" w-28 h-5 text-center  p-auto bg-gray-300 rounded">
              {job?.jobLocation ?? "none"}
            </h3>
            <h3 className=" w-28 h-5 text-center  p-auto bg-gray-300 rounded">
              {job?.employmentType ?? "none"}
            </h3>
          </div>
          <div>
           
            <button className="font-semibold bg-teal-500 hover:bg-teal-600 w-28 h-10 rounded-lg mb-10" onClick={() => handleApply(job._id)}> 
              Apply
            </button>
            
          </div>
        </div>

        <hr />

        <div className="">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl mt-8">Job Summary</h1>
              <p className="text-primary/90">{job.summary ?? "none"}</p>
            </div>

            <div>
              <h1 className="text-3xl mt-8">Roles and Responsibilities</h1>
              <p className="text-primary/90">{job.summary ?? "none"}</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl mt-8 ">
              Qualifications <hr />
            </h2>
            {job.skills && job.skills.length > 0 ? (
              <ol>
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill.value}</li>
                ))}
              </ol>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 my-12">
          <h2 className="text-xl font-light font-semibold italic ">
            Contact Information <hr />
          </h2>
          <div className="flex gap-10">
            <p>Email: {job.postingBy ?? "none"}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
