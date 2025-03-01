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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProxyUrl(
      `https://waigenie.onrender.com/proxy?url=${encodeURIComponent(currentUrl)}`
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

  return (
    (url !== "") && (
      <div className="browser-view flex flex-col">
        {isLoading && (
          <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50 rounded-md">
            <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 rounded-full">
              <div className="rounded-full h-12 w-12 bg-white"></div>
            </div>
          </div>
        )}
        <iframe
          src={proxyUrl}
          style={{
            width: "100%",
            border: "none",
            display: isLoading ? "none" : "block"
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="w-full h-[calc(100vh-100px)] rounded-md"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    )
  );
};

export default BrowserView;