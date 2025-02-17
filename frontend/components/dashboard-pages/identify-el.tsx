"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaRobot,
  FaCode,
  FaSearch,
  FaShieldAlt,
  FaUniversalAccess,
  FaBolt,
  FaEye,
} from "react-icons/fa";
import apiClient from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";

interface IdentifiedElement {
  id: string;
  tag: string;
  elementId: string;
  className: string;
  relativeXPath: string;
  absoluteXPath: string;
  cssSelector: string;
  linkText: string;
  partialLinkText: string;
  attributes: Record<string, string>;
  text: string;
  computedStyles: Record<string, string>;
  accessibility: {
    role: string;
    ariaLabel: string;
    ariaDescribedBy: string;
    ariaHidden: string;
    tabIndex: string;
    isKeyboardFocusable: boolean;
    hasAccessibleName: boolean;
  };
  state: {
    isVisible: boolean;
    isEnabled: boolean;
    isChecked: boolean;
    isRequired: boolean;
    isReadOnly: boolean;
    isContentEditable: boolean;
    isFocused: boolean;
    isInViewport: boolean;
  };
  siblings: {
    previousSibling: { tag: string; id: string; class: string } | null;
    nextSibling: { tag: string; id: string; class: string } | null;
    siblingPosition: number;
    totalSiblings: number;
  };
  customSelectors: {
    uniqueSelector: string;
    dataTestId: string;
    dataAutomationId: string;
    customDataAttributes: Record<string, string>;
  };
  dimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  eventListeners: Record<string, boolean>;
  shadowDOM: {
    hasShadowRoot: boolean;
    shadowElements: Array<{
      tag: string;
      id: string;
      class: string;
      text: string;
    }>;
    shadowSelectors: string[];
  };
  performance: {
    renderTime: number;
    layoutImpact: number;
    memoryEstimate: number;
  };
  framework: {
    react: boolean;
    angular: boolean;
    vue: boolean;
    svelte: boolean;
  };
  validation: {
    hasValidation: boolean;
    validationMessage: string;
    validity: {
      valueMissing: boolean;
      typeMismatch: boolean;
      patternMismatch: boolean;
      tooLong: boolean;
      tooShort: boolean;
      rangeUnderflow: boolean;
      rangeOverflow: boolean;
      stepMismatch: boolean;
      badInput: boolean;
      customError: boolean;
      valid: boolean;
    } | null;
  };
}

interface ComprehensiveAnalysis {
  security: {
    risks: string[];
    recommendations: string[];
    severity_level: string;
  };
  automation: string;
  accessibility: {
    issues: string[];
    recommendations: string[];
    wcag_violations: string[];
  };
  performance: {
    issues: string[];
    optimizations: string[];
    metrics_to_monitor: string[];
  };
  visual: {
    checkpoints: string[];
    strategies: string[];
    tools: string[];
  };
  test_ideas: string[];
}

export default function IdentifyEl() {
  const [url, setUrl] = useState("");
  const [outputFileName, setOutputFileName] = useState("elements.csv");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [proxyHtml, setProxyHtml] = useState("");
  const [identifiedElements, setIdentifiedElements] = useState<
    IdentifiedElement[]
  >([]);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showOnlyVisible, setShowOnlyVisible] = useState(false);
  const [showOnlyInteractive, setShowOnlyInteractive] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [analysis, setAnalysis] = useState<ComprehensiveAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("playwright");
  const [locators, setLocators] = useState("");
  const { toast } = useToast();

  const filteredElements = identifiedElements.filter((element) => {
    if (filterText) {
      const searchText = filterText.toLowerCase();
      const matchesSearch =
        element.tag.toLowerCase().includes(searchText) ||
        element.elementId.toLowerCase().includes(searchText) ||
        element.className.toLowerCase().includes(searchText) ||
        element.text.toLowerCase().includes(searchText) ||
        element.cssSelector.toLowerCase().includes(searchText) ||
        element.relativeXPath.toLowerCase().includes(searchText);

      if (!matchesSearch) return false;
    }

    if (showOnlyVisible && !element.state.isVisible) return false;
    if (showOnlyInteractive && !element.state.isEnabled) return false;

    if (selectedCategory !== "all") {
      switch (selectedCategory) {
        case "interactive":
          return (
            element.tag === "BUTTON" ||
            element.tag === "A" ||
            element.tag === "INPUT"
          );
        case "text":
          return (
            element.tag === "P" ||
            element.tag === "SPAN" ||
            element.tag === "DIV"
          );
        case "media":
          return (
            element.tag === "IMG" ||
            element.tag === "VIDEO" ||
            element.tag === "AUDIO"
          );
        default:
          return true;
      }
    }

    return true;
  });

  const loadUrl = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/proxy",
        // "https://waigenie-delpoyment-test.onrender.com/api/proxy",
        "https://waigenie.onrender.com/api/proxy",
        {
          url,
        }
      );
      setProxyHtml(response.data.html);
    } catch (error) {
      setError(
        "An error occurred while loading the URL."
      );
    }
    setLoading(false);
  };

  const identifyElements = () => {
    if (!iframeRef.current?.contentWindow) {
      setError("Iframe not properly initialized");
      return;
    }

    try {
      setIdentifiedElements([]);
      setProgress(0);
      setError("");
      setLoading(true);

      // Ensure the iframe is loaded
      if (iframeRef.current.contentDocument?.readyState !== "complete") {
        iframeRef.current.onload = () => {
          executeIdentification();
        };
      } else {
        executeIdentification();
      }
    } catch (error) {
      console.error("Error identifying elements:", error);
      setError(
        `An error occurred while identifying elements: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setLoading(false);
    }
  };

  const executeIdentification = () => {
    const win = iframeRef.current?.contentWindow as Window & {
      identifyElements?: () => void;
    };

    if (typeof win?.identifyElements !== "function") {
      throw new Error("Element identification script not properly initialized");
    }

    win.identifyElements();
  };

  useEffect(() => {
    if (proxyHtml && iframeRef.current) {
      const iframe = iframeRef.current;

      // Set sandbox attributes to allow scripts but maintain security
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");

      // Create a blob URL from the HTML content
      const blob = new Blob([proxyHtml], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);

      // Set the iframe source
      iframe.src = blobUrl;

      // Clean up the blob URL when component unmounts
      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [proxyHtml]);

  const downloadCsv = async () => {
    try {
      const response = await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/generate-csv",
        // "https://waigenie-delpoyment-test.onrender.com/api/generate-csv",
        "https://waigenie.onrender.com/api/generate-csv",
        { elements: identifiedElements, filename: outputFileName },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError(
        "An error occurred while downloading the CSV. Please check the console for more details."
      );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateTestCode = (element: IdentifiedElement) => {
    const framework = Object.entries(element.framework).find(
      ([, value]) => value
    )?.[0];
    let code = "";

    switch (framework) {
      case "react":
        code = `test('should interact with ${element.tag}', () => {
  const element = screen.getByTestId('${element.customSelectors.dataTestId}');
  expect(element).toBeInTheDocument();
});`;
        break;
      default:
        code = `test('should interact with ${element.tag}', () => {
  const element = document.querySelector('${element.cssSelector}');
  expect(element).toBeTruthy();
});`;
    }

    return code;
  };

  const analyzeElement = async (element: IdentifiedElement) => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        "https://waigenie.onrender.com/api/comprehensive-analysis",
        {
          element,
          url: url,
          framework: selectedFramework,
        }
      );

      if (response.data.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      console.error("Error in analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportAnalysis = async (format: "markdown" | "html" | "pdf") => {
    try {
      const response = await axios.post(
        "https://waigenie.onrender.com/api/export-analysis",
        {
          analysis,
          format,
        }
      );

      if (response.data.success) {
        // Handle different format downloads
        if (format === "pdf") {
          // Handle PDF download
          const blob = new Blob([response.data.content], {
            type: "application/pdf",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `element-analysis.${format}`;
          a.click();
        } else {
          // Handle markdown/html
          const blob = new Blob([response.data.content], {
            type: "text/plain",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `element-analysis.${format}`;
          a.click();
        }
      }
    } catch (error) {
      console.error("Error exporting analysis:", error);
    }
  };

  const renderValue = (value: unknown): React.ReactNode => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value.toString();
    }
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4">
          {value.map((item, index) => (
            <li key={index}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }
    if (value && typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const renderAnalysisDetails = () => {
    if (!analysis) return null;

    console.log("Full Analysis Data:", JSON.stringify(analysis, null, 2));

    const renderSection = (sectionName: keyof typeof analysis) => {
      const sectionData = analysis[sectionName];

      // Log each section for debugging
      console.log(
        `${sectionName} Section Data:`,
        JSON.stringify(sectionData, null, 2)
      );

      // Attempt to parse if it's a string
      const parsedData =
        typeof sectionData === "string"
          ? (() => {
              try {
                return JSON.parse(sectionData.replace(/```json\n|\n```/g, ""));
              } catch (e) {
                console.error(`Error parsing ${sectionName} section:`, e);
                return null;
              }
            })()
          : sectionData;

      if (!parsedData) return null;

      const renderIcon = () => {
        switch (sectionName) {
          case "security":
            return <FaShieldAlt className="text-red-500" />;
          case "accessibility":
            return <FaUniversalAccess className="text-green-500" />;
          case "performance":
            return <FaBolt className="text-yellow-500" />;
          case "visual":
            return <FaEye className="text-blue-500" />;
          default:
            return null;
        }
      };

      return (
        <div key={sectionName} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold capitalize">
              {sectionName} Analysis
            </h3>
            {renderIcon()}
          </div>
          <div className="space-y-2">
            {Object.entries(parsedData).map(([key, value]) => (
              <div key={key} className="mb-2">
                <span className="font-semibold capitalize">
                  {key.replace(/_/g, " ")}:
                </span>{" "}
                {renderValue(value)}
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(["security", "accessibility", "performance", "visual"] as const)
          .map(renderSection)
          .filter(Boolean)}

        {analysis.automation && (
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Market Intelligence</h3>
              <FaCode className="text-blue-600" />
            </div>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{analysis.automation}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "elementsIdentified") {
        setIdentifiedElements((prev) => [...prev, ...event.data.elements]);
        setProgress(event.data.progress);
      } else if (event.data.type === "identificationComplete") {
        setLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const generateLocators = async () => {
    if (!url.trim() || selectedElements.length === 0) {
      toast({
        title: "Error",
        description: "Please enter a URL and select elements",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post(
        "https://waigenie.onrender.com/api/generate-locators",
        {
          url,
          selectedElements,
        }
      );
      setLocators(response.data.locators);
    } catch (error: any) {
      console.error("Error generating locators:", error);
      if (!error.message?.includes("Insufficient credits")) {
        toast({
          title: "Error",
          description: "Failed to generate locators. Please try again.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Main Layout */}
      <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Control Panel */}
        <div className="w-full md:w-1/3 bg-purple-50 p-4 md:p-8 rounded-md shadow-lg">
          <h1 className="text-xl font-bold text-black mb-4">DomDetective</h1>
          <div className="space-y-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to inspect"
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
            />
            <input
              type="text"
              value={outputFileName}
              onChange={(e) => setOutputFileName(e.target.value)}
              placeholder="Output CSV file name"
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
            />
            <button
              onClick={loadUrl}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
            >
              {loading ? "Loading..." : "Load URL"}
            </button>
            {proxyHtml && (
              <button
                onClick={identifyElements}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
              >
                {loading ? (
                  <span>Identifying Elements ({Math.round(progress * 100)}%)</span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaRobot className="mr-2" />
                    Identify Elements
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full md:w-2/3 bg-blue-50 rounded-md shadow-lg overflow-hidden h-[50vh] md:h-[calc(100vh-120px)]">
          {proxyHtml && (
            <div className="relative w-full h-full">
              <iframe
                ref={iframeRef}
                srcDoc={proxyHtml}
                className="absolute top-0 left-0 w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {identifiedElements.length > 0 && (
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Filters */}
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      placeholder="Search elements..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-md px-4 py-2"
                >
                  <option value="all">All Elements</option>
                  <option value="interactive">Interactive Elements</option>
                  <option value="text">Text Elements</option>
                  <option value="media">Media Elements</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Elements Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-2">Element</th>
                    <th scope="col" className="px-4 py-2">Details</th>
                    <th scope="col" className="px-4 py-2 hidden md:table-cell">Accessibility</th>
                    <th scope="col" className="px-4 py-2 hidden md:table-cell">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredElements.map((element, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <div className="text-sm font-medium">{element.tag.toLowerCase()}</div>
                        <div className="text-xs text-gray-500">{element.elementId}</div>
                      </td>
                      <td className="px-4 py-2">
                        <details className="text-sm">
                          <summary className="cursor-pointer">View Details</summary>
                          <div className="mt-2 space-y-1">
                            <div><span className="font-medium">Class:</span> {element.className}</div>
                            <div><span className="font-medium">Text:</span> {element.text.substring(0, 50)}</div>
                          </div>
                        </details>
                      </td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        <details className="text-sm">
                          <summary className="cursor-pointer">View A11y</summary>
                          <div className="mt-2 space-y-1">
                            <div>Role: {element.accessibility.role}</div>
                            <div>Focusable: {element.accessibility.isKeyboardFocusable ? "Yes" : "No"}</div>
                          </div>
                        </details>
                      </td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        <details className="text-sm">
                          <summary className="cursor-pointer">View State</summary>
                          <div className="mt-2 space-y-1">
                            <div>Visible: {element.state.isVisible ? "Yes" : "No"}</div>
                            <div>Enabled: {element.state.isEnabled ? "Yes" : "No"}</div>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={downloadCsv}
              className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
              <FaCode className="inline-block mr-2" />
              Download CSV
            </button>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 rounded-full">
            <div className="rounded-full h-12 w-12 bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};
