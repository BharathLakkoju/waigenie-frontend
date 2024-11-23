"use client";

import { useState } from "react";
import axios from "axios";
import { FaCode, FaEdit } from "react-icons/fa";

export default function GenerateBDD() {
  const [userStory, setUserStory] = useState("");
  const [detailLevel, setDetailLevel] = useState("Simple");
  const [generationMethod, setGenerationMethod] = useState("direct");
  const [gherkinFeature, setGherkinFeature] = useState("");
  const [manualTestCases, setManualTestCases] = useState("");
  const [loading, setLoading] = useState(false);

  const generateGherkinFeature = async () => {
    setLoading(true);
    setGherkinFeature("");
    setManualTestCases("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-gherkin",
        {
          userStory,
          detailLevel,
          generationMethod,
        }
      );
      if (generationMethod === "manual-first") {
        setManualTestCases(response.data.manualTestCases);
      }
      setGherkinFeature(response.data.gherkinFeature);
    } catch (error) {
      console.error("Error generating Gherkin feature:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
      <div className="w-1/3 bg-gray-50 p-8 rounded-md h-[calc(100vh-100px)]">
        <h1 className="text-xl font-bold text-black mb-2">
          Generate BDD Gherkin Feature Steps
        </h1>
        <textarea
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          placeholder="Enter user story"
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
          rows={3}
        />
        <div className="mb-6">
          <h3 className="text-black text-lg font-bold mb-2">
            Generation Method:
          </h3>
          <div className="flex justify-center space-x-4 my-4">
            <button
              onClick={() => setGenerationMethod("direct")}
              className={`px-4 w-2/6 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                generationMethod === "direct"
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              Direct Gherkin
            </button>
            <button
              onClick={() => setGenerationMethod("manual-first")}
              className={`px-4 w-4/6 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                generationMethod === "manual-first"
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              Manual Test Cases + BDD Gherkin Steps
            </button>
          </div>
        </div>

        {generationMethod === "direct" && (
          <div className="mb-6">
            <h3 className="text-black font-bold text-lg mb-2">Detail Level:</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDetailLevel("Simple")}
                className={`px-4 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                  detailLevel === "Simple"
                    ? "bg-blue-600 text-white transform scale-105"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setDetailLevel("Detailed")}
                className={`px-4 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                  detailLevel === "Detailed"
                    ? "bg-blue-600 text-white transform scale-105"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        )}

        <button
          onClick={generateGherkinFeature}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
        >
          {loading ? "Generating..." : <>Generate Gherkin Feature</>}
        </button>
      </div>
      <div className="w-2/3 px-6 bg-gray-50 rounded-md h-[calc(100vh-100px)] shadow-lg overflow-y-scroll">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 size-24 aspect-square rounded-full">
              <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 backdrop-blur-md"></div>
            </div>
          </div>
        )}
        {manualTestCases && (
          <>
            <div className="bg-gray-50 py-2 flex flex-col items-center">
              <span className="text-2xl font-bold text-black mt-4">
                Generated Manual Test Cases
              </span>
              <pre className="bg-white p-4 rounded-md text-black border border-gray-300 whitespace-pre-wrap my-4">
                {manualTestCases}
              </pre>
            </div>
          </>
        )}
        {gherkinFeature && (
          <>
            <div className="bg-gray-50 py-2 flex flex-col items-center">
              <span className="text-2xl font-bold text-black mt-4">
                Generated Gherkin Feature
              </span>
              <pre className="bg-white p-4 rounded-md text-black border border-gray-300 whitespace-pre-wrap my-4">
                {gherkinFeature}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
