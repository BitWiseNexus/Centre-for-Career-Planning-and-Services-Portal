"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import useGetAlumni from "../api/useGetAlumni";
import useGetAllAlumni from "../api/useGetAllAlumni";

// see the dummy data below in case of rendering anything for help.

const Alumni = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("company");
  const [alumniList, setAlumniList] = useState([]);

  const { loading: loadingAll, alumni } = useGetAllAlumni();
  const { loading: loadingSearch, getAlumni } = useGetAlumni();

  useEffect(() => {
    setAlumniList(alumni);
  }, [alumni]);

  const handleSearch = async () => {
    const data = await getAlumni(searchType, search);
    setAlumniList(data.length > 0 ? data : []);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="flex-1 overflow-y-auto pt-16 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
            Welcome to the Alumni Portal 🎓
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Search for alumni by company, job role, or job ID
          </p>

          <div className="flex justify-center mb-8">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-2 border border-gray-300 bg-white rounded-l-md"
            >
              <option value="company">Company</option>
              <option value="jobRole">Job Role</option>
              <option value="jobId">Job ID</option>
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Enter ${searchType}`}
              className="px-4 py-2 border border-gray-300 w-72"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
            >
              Search
            </button>
          </div>

          {(loadingAll || loadingSearch) ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : alumniList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alumniList.map((alum) => (
                <div
                  key={alum._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-600">{alum.name}</h3>
                  <p>Email: {alum.Email}</p>
                  <p>Mobile: {alum.MobileNumber}</p>
                  <p>Company: {alum.company || "N/A"}</p>
                  <p>Institute ID: {alum.InstituteId}</p>
                  <a
                    href={alum.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No alumni found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Alumni;


// Dummy Data
// [
//   {
//     "name": "Alice Johnson",
//     "company": "Google",
//     "linkedin": "https://linkedin.com/in/alicejohnson",
//     "InstituteId": "INST001",
//     "MobileNumber": 9876543210,
//     "Email": "alice.johnson@example.com",
//     "jobs": [
//       {
//         "id": "J101",
//         "role": "Frontend Developer"
//       }
//     ]
//   },
//   {
//     "name": "Bob Smith",
//     "company": "Microsoft",
//     "linkedin": "https://linkedin.com/in/bobsmith",
//     "InstituteId": "INST002",
//     "MobileNumber": 9876543211,
//     "Email": "bob.smith@example.com",
//     "jobs": [
//       {
//         "id": "J102",
//         "role": "Backend Developer"
//       }
//     ]
//   },
//   {
//     "name": "Carol Williams",
//     "company": "Amazon",
//     "linkedin": "https://linkedin.com/in/carolwilliams",
//     "InstituteId": "INST003",
//     "MobileNumber": 9876543212,
//     "Email": "carol.williams@example.com",
//     "jobs": [
//       {
//         "id": "J103",
//         "role": "Full Stack Developer"
//       }
//     ]
//   },
//   {
//     "name": "David Lee",
//     "company": "Google",
//     "linkedin": "https://linkedin.com/in/davidlee",
//     "InstituteId": "INST004",
//     "MobileNumber": 9876543213,
//     "Email": "david.lee@example.com",
//     "jobs": [
//       {
//         "id": "J104",
//         "role": "Data Analyst"
//       }
//     ]
//   },
//   {
//     "name": "Emma Brown",
//     "company": "Netflix",
//     "linkedin": "https://linkedin.com/in/emmabrown",
//     "InstituteId": "INST005",
//     "MobileNumber": 9876543214,
//     "Email": "emma.brown@example.com",
//     "jobs": [
//       {
//         "id": "J105",
//         "role": "Machine Learning Engineer"
//       }
//     ]
//   }
// ]
