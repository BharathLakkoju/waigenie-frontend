"use client";

import React, { useState, useEffect } from "react";
import apiClient from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export default function AutomationCodeGenerator() {
  const [url, setUrl] = useState("");
  const [featureContent, setFeatureContent] = useState("");
  const [language, setLanguage] = useState("Python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [browserStarted, setBrowserStarted] = useState(false);
  const { toast } = useToast();

  const startBrowser = async () => {
    setLoading(true);
    try {
      await apiClient.post(
        "https://waigenie.onrender.com/api/start-browser",
        { url },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
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
      await apiClient.post(
        "https://waigenie.onrender.com/api/stop-browser",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setBrowserStarted(false);
      setScreenshot("");
    } catch (error) {
      console.error("Error stopping browser:", error);
    }
    setLoading(false);
  };

  const generateCode = async () => {
    if (!featureContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Gherkin feature",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedCode("");
    try {
      await stopBrowser();
      await startBrowser();
      const response = await apiClient.post(
        "https://waigenie.onrender.com/api/generate-automation",
        {
          gherkinFeature: featureContent,
          language,
        }
      );
      setGeneratedCode(response.data.automation_code);
      await stopBrowser();
    } catch (error: any) {
      console.error("Error generating automation code:", error);
      if (!error.message?.includes("Insufficient credits")) {
        toast({
          title: "Error",
          description: "Failed to generate automation code. Please try again.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (browserStarted) {
      interval = setInterval(async () => {
        try {
          const response = await apiClient.get(
            "https://waigenie.onrender.com/api/get-screenshot",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
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
        <div className="w-1/3 bg-gray-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg overflow-y-auto">
          <h1 className="text-xl font-bold text-black mb-2">AutoScribe</h1>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={browserStarted ? stopBrowser : startBrowser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm mb-4"
          >
            {browserStarted ? "Stop Browser" : "Start Browser"}
          </button>

          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setLanguage("Python")}
              className={`px-4 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                language === "Python"
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setLanguage("Java")}
              className={`px-4 py-2 rounded-full text-xs shadow-lg transition-all duration-300 ${
                language === "Java"
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              Java
            </button>
          </div>

          <textarea
            value={featureContent}
            onChange={(e) => setFeatureContent(e.target.value)}
            placeholder="Enter Gherkin Feature Steps"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500"
            rows={5}
          />

          <button
            onClick={generateCode}
            disabled={loading || !browserStarted}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm cursor-pointer"
          >
            {loading ? "Generating Code..." : "Generate Code"}
          </button>

          {generatedCode && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Generated {language} Code
              </h2>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  generatedCode
                )}`}
                download={`generated_test.${
                  language.toLowerCase() === "python" ? "py" : "java"
                }`}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm inline-block text-center"
              >
                Download {language} Code
              </a>
            </div>
          )}
        </div>

        <div className="w-2/3 bg-gray-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg overflow-y-auto">
          {browserStarted && screenshot && (
            <img
              src={screenshot}
              alt="Browser view"
              className="w-full rounded-md mb-4"
            />
          )}
        </div>
      </div>
      {generatedCode && (
        <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-md shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold text-black">
            Generated {language} Code
          </h2>
          <pre className="bg-white p-4 rounded-md overflow-x-auto text-black border border-gray-300 whitespace-pre-wrap mt-4 h-[550px] overflow-y-scroll">
            {generatedCode}
          </pre>
        </div>
      )}
    </>
  );
}
