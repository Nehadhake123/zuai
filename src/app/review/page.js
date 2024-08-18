"use client";
import { useState, useEffect, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useUploadStore from '../../store/useUploadStore';

export default function Review() {
  const uploadedFile = useUploadStore((state) => state.uploadedFile);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [criteriaScores, setCriteriaScores] = useState({});
  const [openCriteria, setOpenCriteria] = useState(null);

  const analyzeDocument = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fakeDocumentAnalysis(file);
      setScore(response.score);
      setSuggestions(response.suggestions);
    } catch (error) {
      setError('Failed to analyze document. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      setPdfUrl(URL.createObjectURL(uploadedFile));
      analyzeDocument(uploadedFile);
    }
  }, [uploadedFile, analyzeDocument]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fakeDocumentAnalysis = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.floor(Math.random() * 100),
          suggestions: [
            'Enhance the document clarity.',
            'Verify all pages are included.',
            'Ensure text is fully legible.'
          ]
        });
      }, 2000);
    });
  };

  const handleCriteriaClick = (criteria) => {
    setAdditionalInfo((prev) => [
      ...prev,
      `Details related to ${criteria} added.`
    ]);

    setCriteriaScores((prev) => ({
      ...prev,
      [criteria]: `${Math.floor(Math.random() * 20) + 1}/20`
    }));

    setOpenCriteria((prev) => (prev === criteria ? null : criteria));
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 bg-gray-50 min-h-screen">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Document Review</h1>
          {pdfUrl ? (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{uploadedFile.name}</h2>
                <p className="text-gray-600 mt-1">Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-md bg-white">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdfUrl} />
                </Worker>
              </div>
              {loading && <p className="text-gray-600 mt-4 text-center">Analyzing your document...</p>}
              {score !== null && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Score: <span className="text-blue-600">{score}</span></h2>
                  <ul className="mt-2 text-gray-700 list-disc list-inside">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="mt-1">- {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {additionalInfo.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Additional Insights</h3>
                  <ul className="mt-2 text-gray-700 list-disc list-inside">
                    {additionalInfo.map((info, index) => (
                      <li key={index} className="mt-1">- {info}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No document uploaded. Please upload a file to review.</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Evaluation Summary</h2>
          <p className="text-gray-700 mb-2">Overall Score: <span className="font-semibold text-blue-600">{score ? `${score} / 100` : 'N/A'}</span></p>
          <p className="text-gray-700 mb-2">Remark: <span className="font-semibold text-green-600">Satisfactory</span></p>
          <p className="text-gray-700">Evaluation Date: <span className="font-semibold">12 Jul 2024</span></p>
        </div>
        <div className="flex flex-col gap-4">
          {['Criteria 1', 'Criteria 2', 'Criteria 3'].map((criteria, index) => (
            <div key={index} className="relative">
              <button
                className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg w-full flex justify-between items-center shadow-lg transition-transform transform hover:scale-105 ${openCriteria === criteria ? 'bg-opacity-90' : 'bg-opacity-80'}`}
                onClick={() => handleCriteriaClick(criteria)}
              >
                <span className="text-lg font-semibold">{criteria}</span>
                <span className="text-sm">{criteria === 'Criteria 1' ? 'Understanding Questions' : criteria === 'Criteria 2' ? 'Concept Application' : 'Practical Usage'}</span>
                <span className="text-lg font-semibold">{openCriteria === criteria ? '▲' : '▼'}</span>
              </button>
              {openCriteria === criteria && (
                <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
                  {criteria === 'Criteria 1' && (
                    <>
                      <div className=" bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-lg border border-gray-200">
                        <div className="mb-4">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">Evaluation Criteria</h2>
                          <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex flex-col gap-4 mb-4">
                          <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-300">
                            <div className="flex items-center">
                              <svg className="w-6 h-6 text-green-500 mr-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z"></path>
                              </svg>
                              <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                                  <span>Understanding Knowledge Box</span>
                                  <div className="ml-2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg w-10 h-10 rounded-full">
                                    <span>15</span>
                                  </div>
                                  <span className="ml-1 text-gray-600">/20</span>
                                </h3>
                                <p className="text-gray-700 mt-2">
                                  <strong className="text-base text-gray-900 font-bold">Essay Evaluation:</strong>
                                  <br />
                                
                                  Focus: The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines.
                                </p>
                                <div className="mt-4">
                                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Strengths:</h4>
                                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                    <li>Thorough understanding of the question.</li>
                                    <li>Well-organized arguments.</li>
                                    <li>In-depth analysis of different viewpoints.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-200 rounded-lg shadow-inner border-t border-gray-300">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Final Remarks</h3>
                          <p className="text-gray-700">
                            The essay demonstrates a strong understanding of the topic with clear and logical reasoning. Further improvements could be made in the application of concepts to real-world scenarios.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {criteria === 'Criteria 2' && (
                    <div className=" bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-lg border border-gray-200">
                      <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">Evaluation Criteria</h2>
                        <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-300">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-yellow-500 mr-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 15.39l-4.39-4.39L8 9l4 4 4-4 1.39 1.39L12 15.39z"></path>
                            </svg>
                            <div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                                <span>Concept Application</span>
                                <div className="ml-2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg w-10 h-10 rounded-full">
                                  <span>13</span>
                                </div>
                                <span className="ml-1 text-gray-600">/20</span>
                              </h3>
                              <p className="text-gray-700 mt-2">
                                <strong className="font-medium">Essay Evaluation:</strong>
                                <br />
                                Focus: The essay applies concepts from the theory of knowledge to analyze the validity of knowledge claims in different scenarios.
                              </p>
                              <div className="mt-4">
                                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Strengths:</h4>
                                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                  <li>Clear application of concepts.</li>
                                  <li>Examples used to illustrate points.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-200 rounded-lg shadow-inner border-t border-gray-300">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Final Remarks</h3>
                        <p className="text-gray-700">
                          The application of concepts is strong, but there is room for more in-depth exploration of how these concepts are applied in various contexts.
                        </p>
                      </div>
                    </div>
                  )}
                  {criteria === 'Criteria 3' && (
                    <div className=" bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-lg border border-gray-200">
                      <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">Evaluation Criteria</h2>
                        <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-300">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 15.39l-4.39-4.39L8 9l4 4 4-4 1.39 1.39L12 15.39z"></path>
                            </svg>
                            <div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                                <span>Practical Usage</span>
                                <div className="ml-2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg w-10 h-10 rounded-full">
                                  <span>16</span>
                                </div>
                                <span className="ml-1 text-gray-600">/20</span>
                              </h3>
                              <p className="text-gray-700 mt-2">
                                <strong className="font-medium">Essay Evaluation:</strong>
                                <br />
                                Focus: The essay evaluates the practical usage of the concepts in real-world scenarios and their effectiveness.
                              </p>
                              <div className="mt-4">
                                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Strengths:</h4>
                                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                  <li>Effective use of concepts in real-world scenarios.</li>
                                  <li>Well-supported arguments.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-200 rounded-lg shadow-inner border-t border-gray-300">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Final Remarks</h3>
                        <p className="text-gray-700">
                          The practical application is strong, but the essay could benefit from additional real-world examples and case studies.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
