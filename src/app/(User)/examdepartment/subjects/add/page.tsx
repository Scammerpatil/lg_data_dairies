"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddSubjectPage = () => {
  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    subjectName: "",
    subjectType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = axios.post("/api/subjects/addSubject", formData);
    toast.promise(response, {
      loading: "Adding subject...",
      success: (data) => {
        return data.data.message;
      },
      error: (err) => {
        return err.response.data.message;
      },
    });
  };
  return (
    <>
      <div className="container">
        <h1 className="text-3xl text-center">Add Subject</h1>
        <div className="p-6 max-w-md mx-auto bg-base-200 shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="department" className="form-control w-full">
                Select Department
                <select
                  id="department"
                  name="department"
                  className="select select-bordered w-full"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="computer">Computer Engineering</option>
                  <option value="aiml">
                    Artificial Intelligence and Machine Learning
                  </option>
                  <option value="ds">
                    Computer Science & Engineering ( Data Science )
                  </option>
                  <option value="entc">
                    Electronics & Telecommunication Engineering
                  </option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="cs">Computer Science & Engineering</option>
                  <option value="aid">
                    Artificial Intelligence & Data Science
                  </option>
                  <option value="it">Information Technology</option>
                  <option value="ash">Applied Sciences & Humanities</option>
                  <option value="research">Research Center</option>
                  <option value="mca">
                    Master of Computer Application (MCA)
                  </option>
                </select>
              </label>
            </div>

            {/* Semester Selection */}
            <div className="my-4">
              <label htmlFor="semester" className="block font-semibold mb-1">
                Select Semester
              </label>
              <select
                id="semester"
                name="semester"
                className="select select-bordered w-full"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Semester
                </option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Name Input */}
            <div className="my-4">
              <label htmlFor="subjectName" className="block font-semibold mb-1">
                Subject Name
              </label>
              <input
                type="text"
                id="subjectName"
                name="subjectName"
                className="input input-bordered w-full"
                placeholder="Enter subject name"
                value={formData.subjectName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject Type Selection */}
            <div className="my-4">
              <label htmlFor="subjectType" className="block font-semibold mb-1">
                Subject Type
              </label>
              <select
                id="subjectType"
                name="subjectType"
                className="select select-bordered w-full"
                value={formData.subjectType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Subject Type
                </option>
                <option value="regular">Regular</option>
                <option value="elective">Elective</option>
                <option value="audit">Audit</option>
                <option value="practical">Practical</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Add Subject
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSubjectPage;
