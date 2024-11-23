"use client";
import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";

interface BrowserViewProps {
  url: string;
  onElementsSelected: (elements: any[]) => void;
}

const BrowserView: React.FC<BrowserViewProps> = ({
  url,
  onElementsSelected,
}) => {
  const [proxyUrl, setProxyUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    setProxyUrl(
      `http://localhost:5000/proxy?url=${encodeURIComponent(currentUrl)}`
    );
  }, [currentUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "elementsSelected") {
        onElementsSelected(event.data.elements);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onElementsSelected]);

  const handleReload = () => {
    setProxyUrl(
      `http://localhost:5000/proxy?url=${encodeURIComponent(currentUrl)}`
    );
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUrl(currentUrl);
  };

  return (
    <div className="browser-view flex flex-col">
      {/* <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-t-xl h-14">
        <button
          onClick={handleReload}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <IoReload className="w-5 h-5" />
        </button>
        <form onSubmit={handleUrlSubmit} className="flex-1">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            placeholder="Enter URL"
          />
        </form>
      </div> */}
      <iframe
        src={proxyUrl}
        style={{
          width: "100%",
          border: "none",
        }}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-[calc(100vh-100px)] rounded-md"
      />
    </div>
  );
};

export default BrowserView;
