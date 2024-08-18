"use client"; // This is for using client-side components and hooks
import { MdUploadFile } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';


export default function Home() {
  const [courseType, setCourseType] = useState('');
  const [subject, setSubject] = useState('');
  const [essayTitle, setEssayTitle] = useState('');

  const handleSubmit = () => {
    console.log({ courseType, subject, essayTitle });
  };
  return (
    <div className="p-10 md:p-20 mb-8 flex flex-col justify-center items-center font-mont">
    <div className="h-auto p-8 rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-[740px] h-[626px] gap-[24px]">
          <h1 className="w-[740px] text-3xl font-extrabold text-left whitespace-nowrap">
            Hey IB Folks Unsure about the quality of your
          </h1>
          <h1 className="w-[740px] text-3xl font-extrabold leading-[42.5px] text-left whitespace-nowrap">
            answers? <span className="text-purple-500">We get you.</span>
          </h1>

          {/* Upload PDF Box */}
          <div className="w-[740px] h-auto pt-5 rounded-xl bg-CustomSkin">
            <div className="w-[700px] h-[240px] mx-5 p-4 rounded-xl text-center border-dashed border-light-gray border-2 bg-white flex flex-col justify-center items-center shadow-lg">
              <MdUploadFile className="text-5xl text-purple-500" />
              <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop a PDF</p>
              <p className="text-sm text-gray-500 mb-4">*Limit 25 MB per file</p>
              <button className="text-purple-600 text-[15px] font-extrabold leading-[19.92px] text-left border border-gray-400 py-2 px-6 rounded-full hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out shadow-md">
                Upload your file
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4">
              {/* Course Type and Subject Dropdowns */}
              <div>
                <h1 className="text-lg mt-2 text-gray-500">Select your course & subjects*</h1>
                <div className="flex space-x-2">
                  <div className="relative w-1/3">
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="p-1.5 text-lg font-semibold text-gray-500 border border-gray-300 bg-white rounded-full w-full appearance-none pr-5 shadow-md"
                    >
                      <option value="">Course Type</option>
                      {/* Add more options here */}
                    </select>
                    <FaChevronDown className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none text-gray-500 text-lg" />
                  </div>

                  <div className="relative w-1/4">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="p-1.5 text-lg font-semibold text-gray-500 border border-gray-300 bg-white rounded-full w-full appearance-none pr-10 shadow-md"
                    >
                      <option value="">Subject</option>
                      {/* Add more options here */}
                    </select>
                    <FaChevronDown className="absolute top-1/2 right-5 transform -translate-y-1/2 pointer-events-none text-gray-500 text-lg" />
                  </div>
                </div>
              </div>

              {/* Essay Title Input */}
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-gray-500">Enter your essay title* (Required)</h1>
              </div>

              {/* Search Bar and Button */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={essayTitle}
                  onChange={(e) => setEssayTitle(e.target.value)}
                  className="p-3 border-2 border-orange-300 rounded-full w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent shadow-lg transition duration-300 ease-in-out"
                  placeholder="How nation works..."
                />
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center text-lg bg-purple-300 text-white py-2.5 rounded-full hover:bg-purple-600 transition duration-300 ease-in-out w-1/3 shadow-lg"
                >
                  <WiStars className="text-2xl bg-white text-gray-500 font-semibold rounded-full p-1 mr-2 shadow-md" />
                  Evaluate your Score
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Large Image Box */}
        <div className="flex-1 p-6 w-[343.83px] h-[200px] rounded-lg">
          <img
            src="/img/rectangle2.png"
            alt="Big Image"
            className="w-full h-full rounded-lg object-cover mb-4 shadow-lg"
          />
        </div>
      </div>
      <div className="p-6 rounded-xl bg-gray-200 mt-2">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Coursework</h2>

        <div className="flex w-1/2 h-auto bg-gray-50 items-start space-x-4 mb-6 p-4 rounded-lg shadow-md">
          {/* Document Image */}
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src="/img/doc.png" // Replace with your image path
              alt="Document"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2 flex-1">
            {/* Heading */}
            <h3 className="text-xl font-semibold text-gray-800">How does the</h3>
            <h3 className="text-xl font-semibold text-gray-800">temperature of a Copp...</h3>

            {/* Paragraph */}
            <p className="text-sm text-gray-600">How does the temperature of a copper</p>
            <p className="text-sm text-gray-600">pipe affect the time it...</p>

            {/* Subject and Icons */}
            <div className="flex flex-wrap gap-2">
              {/* Subject Button */}
              <button className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-full text-gray-700 text-xs">
                <svg className="w-4 h-4 text-blue-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-2v-2h2v2zm0-4h-2V7h2v7zm7 4H9V5h10v14z" />
                </svg>
                Physics HL
              </button>

              {/* Reading Time Button */}
              <button className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-full text-gray-700 text-xs">
                <svg className="w-4 h-4 text-yellow-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6l4.25 2.52-.75 1.23L11 14V7z" />
                </svg>
                3 Min Read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

