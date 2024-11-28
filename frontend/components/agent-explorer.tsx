"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRobot } from "react-icons/fa";

export default function AgentExplorer() {
  const [objective, setObjective] = useState("");
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [browserStarted, setBrowserStarted] = useState(false);
  const [screenshot, setScreenshot] = useState("");

  const startBrowser = async () => {
    setLoading(true);
    try {
      await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/agent-explorer/start-browser",
        "https://waigenie-delpoyment-test.onrender.com/api/agent-explorer/start-browser",
        { url }
      );
      setBrowserStarted(true);
    } catch (error) {
      console.error("Error starting browser:", error);
      setError(
        "An error occurred while starting the browser. Please try again."
      );
    }
    setLoading(false);
  };

  const stopBrowser = async () => {
    setLoading(true);
    try {
      await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/agent-explorer/stop-browser",
        "https://waigenie-delpoyment-test.onrender.com/api/agent-explorer/stop-browser"
      );
      setBrowserStarted(false);
      setScreenshot("");
    } catch (error) {
      console.error("Error stopping browser:", error);
      setError(
        "An error occurred while stopping the browser. Please try again."
      );
    }
    setLoading(false);
  };

  const runWebAgent = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/agent-explorer/run-web-agent",
        "https://waigenie-delpoyment-test.onrender.com/api/agent-explorer/run-web-agent",
        {
          objective,
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error running web agent:", error);
      setError(
        "An error occurred while running the web agent. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (browserStarted) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/agent-explorer/get-screenshot"
            "https://waigenie-delpoyment-test.onrender.com/api/agent-explorer/get-screenshot"
          );
          setScreenshot(`data:image/png;base64,${response.data.screenshot}`);
        } catch (error) {
          console.error("Error fetching screenshot:", error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [browserStarted]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
        <div className="w-1/3 bg-purple-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg">
          <h1 className="text-xl font-bold text-black mb-4">
            Web Agent Explorer
          </h1>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter starting URL"
            className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
          />
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="Enter objective"
            className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
          />
          {!browserStarted ? (
            <button
              onClick={startBrowser}
              disabled={loading}
              className="mb-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
            >
              {loading ? "Loading..." : "Start Browser"}
            </button>
          ) : (
            <button
              onClick={stopBrowser}
              disabled={loading}
              className="mb-2 w-full bg-gradient-to-r from-red-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-yellow-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
            >
              Stop Browser
            </button>
          )}

          <button
            onClick={runWebAgent}
            disabled={loading || !browserStarted}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
          >
            {loading ? (
              "Running Web Agent..."
            ) : (
              <span>
                <FaRobot className="inline-block mr-2" />
                Start Demo
              </span>
            )}
          </button>

          {error && (
            <div className="mt-4 bg-red-500 text-white p-4 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="w-2/3 bg-blue-50 rounded-md h-[calc(100vh-100px)] shadow-lg">
          {browserStarted && screenshot && (
            <Image
              src={screenshot}
              alt="Browser view"
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 size-24 aspect-square rounded-full">
            <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 backdrop-blur-md"></div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gray-50 rounded-md shadow-lg max-w-6xl mx-auto flex flex-col mb-5 overflow-y-scroll">
          {results.length > 0 && (
            <div className="overflow-auto p-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Agent Steps
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-900 sticky top-10">
                    <thead className="text-xs uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Step
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Current URL
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action Taken
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Output
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Success
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="bg-white border-b">
                          <td className="px-6 py-4">{result.step}</td>
                          <td className="px-6 py-4">{result.current_url}</td>
                          <td className="px-6 py-4">{result.action_taken}</td>
                          <td className="px-6 py-4">{result.output}</td>
                          <td className="px-6 py-4">
                            {result.success ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
