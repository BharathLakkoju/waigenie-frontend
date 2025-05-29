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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import UxStrategy from "../ui/uxstrategy";
import VisualAnalysisDashboard from "../ui/visual-analytics";
import PerformanceAnalysisDashboard from "../ui/performance-ui";
import AccessibilityAnalysisDashboard from "../ui/accessibility-ui";
import SecurityAnalysisDashboard from "../ui/security";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [selectedId, setSelectedId] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  const normalizeUrl = (url: string): string => {
    if (!url) return "";
    // Remove any whitespace
    url = url.trim();
    // If URL doesn't start with http:// or https://, add https://
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('www.')) {
      url = 'https://' + url;
    }
    return url;
  };

  const handleReset = () => {
    setIdentifiedElements([]);
    setFilterText("");
    setSelectedCategory("all");
    setShowOnlyVisible(false);
    setShowOnlyInteractive(false);
    setSelectedElements([]);
    setCompareMode(false);
    setAnalysis(null);
    setCurrentPage(1);
    setProgress(0);
    setError("");
    toast({
      title: "Reset successful",
      description: "All search results and filters have been cleared.",
    });
  };

  const toggleRow = (index: number) => {
    setExpandedRows((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

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

  // Add pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredElements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredElements.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setExpandedRows([]); // Reset expanded rows when changing pages
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setExpandedRows([]); // Reset expanded rows
  };

  const loadUrl = async () => {
    setLoading(true);
    setError("");
    try {
      const normalizedUrl = normalizeUrl(url);
      const response = await apiClient.post(
        "https://waigenie.onrender.com/api/proxy",
        {
          url: normalizedUrl,
        },
      );
      setProxyHtml(response.data.html);
    } catch (error) {
      setError("An error occurred while loading the URL.");
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
        `An error occurred while identifying elements: ${error instanceof Error ? error.message : "Unknown error"
        }`,
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
        "https://waigenie.onrender.com/api/generate-csv",
        { elements: identifiedElements, filename: outputFileName },
        { responseType: "blob" },
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
        "An error occurred while downloading the CSV. Please check the console for more details.",
      );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateTestCode = (element: IdentifiedElement) => {
    const framework = Object.entries(element.framework).find(
      ([, value]) => value,
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
      const response = await apiClient.post(
        "https://waigenie.onrender.com/api/comprehensive-analysis",
        {
          element,
          url: url,
          framework: selectedFramework,
        },
      );

      if (response.data.success) {
        console.log("Test Data: ", response.data);
        console.log("Analysis Data: ", response.data.analysis);
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
        },
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

  const renderAnalysisDetails = () => {
    if (!analysis) return null;
    console.log(analysis);

    const renderSection = (sectionName: keyof typeof analysis) => {
      const sectionData = analysis[sectionName];

      // Attempt to parse if it's a string
      const parsedData =
        typeof sectionData === "string"
          ? (() => {
            try {
              return JSON.parse(sectionData.replace(/```json\n|\n```/g, "").replace(/\n/g, " ").trim());
            } catch (e) {
              console.error(`Error parsing ${sectionName} section:`, e);
              return null;
            }
          })()
          : sectionData;

      if (!parsedData) return null;
      console.log("parsedData", parsedData);

      switch (sectionName) {
        case "automation":
          return <UxStrategy data={parsedData} />;
        case "visual":
          return <VisualAnalysisDashboard data={parsedData} />;
        case "performance":
          return (
            <PerformanceAnalysisDashboard performance={parsedData} />
          );
        case "accessibility":
          return (
            <AccessibilityAnalysisDashboard
              issues={parsedData.issues}
              recommendations={parsedData.recommendations}
              wcagViolations={parsedData.wcag_violations}
              complianceSummary={parsedData.compliance_summary}
            />
          );
        case "security":
          return <SecurityAnalysisDashboard data={parsedData} />;
        default:
          return null;
      }
    };

    return (
      <div className="space-y-8">
        {Object.keys(analysis).map((sectionName) => (
          <div key={sectionName} className="bg-white rounded-lg">
            {renderSection(sectionName as keyof typeof analysis)}
          </div>
        ))}
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
        },
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
            <Button
              onClick={loadUrl}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
            >
              {loading ? "Loading..." : "Load URL"}
            </Button>
            {proxyHtml && (
              <Button
                onClick={identifyElements}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
              >
                {loading ? (
                  <span>
                    Identifying Elements ({Math.round(progress * 100)}%)
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaRobot className="mr-2" />
                    Identify Elements
                  </span>
                )}
              </Button>
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
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  defaultValue="all"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="all">All Elements</SelectItem>
                      <SelectItem value="interactive">
                        Interactive Elements
                      </SelectItem>
                      <SelectItem value="text">Text Elements</SelectItem>
                      <SelectItem value="media">Media Elements</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FaRobot className="mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Elements Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Element</TableHead>
                    <TableHead className="hidden md:table-cell">Absolute XPath</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((element, index) => (
                    <React.Fragment key={`row-${index}`}>
                      <TableRow>
                        <TableCell className="p-2">
                          <button
                            onClick={() => toggleRow(index)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label={
                              expandedRows[index]
                                ? "Collapse row"
                                : "Expand row"
                            }
                          >
                            {expandedRows[index] ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        </TableCell>
                        <TableCell>
                          {element.id}
                        </TableCell>
                        <TableCell>{element.tag.toLowerCase()}</TableCell>
                        <TableCell className="hidden md:table-cell text-gray-500 text-sm">
                          {element.absoluteXPath ? element.absoluteXPath : "--"}
                        </TableCell>
                      </TableRow>

                      {expandedRows[index] && (
                        <TableRow
                          key={`details-${index}`}
                          className="bg-gray-50"
                        >
                          <TableCell colSpan={4} className="p-0">
                            <div className="p-4 space-y-4 w-full">
                              <div className="flex flex-wrap justify-start items-start w-full pl-10 gap-[7%]">
                                {/* Details Section */}
                                <div className="space-y-2 min-w-[calc(100vw/10)] max-w-[calc(100vw/25)]">
                                  <h4 className="font-bold text-sm">
                                    Details
                                  </h4>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <span className="font-semibold">
                                        Class:
                                      </span>{" "}
                                      {element.className ? element.className : "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Text:</span>{" "}
                                      <span className="break-words">{element.text.substring(0, 50) ? element.text.substring(0, 50) : "--"}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold">ID:</span>{" "}
                                      {element.elementId ? element.elementId : "--"}
                                    </div>
                                  </div>
                                </div>

                                {/* Accessibility Section */}
                                <div className="space-y-2 min-w-[calc(100vw/10)] max-w-[calc(100vw/25)]">
                                  <h4 className="font-bold text-sm">
                                    Accessibility
                                  </h4>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <span className="font-semibold">Role:</span>{" "}
                                      {element.accessibility.role ? element.accessibility.role : "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">
                                        Focusable:
                                      </span>{" "}
                                      {element.accessibility.isKeyboardFocusable
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">ariaLabel:</span>{" "}
                                      {element.accessibility.ariaLabel ? element.accessibility.ariaLabel : "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">ariaDescribedBy:</span>{" "}
                                      {element.accessibility.ariaDescribedBy ? element.accessibility.ariaDescribedBy : "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">ariaHidden:</span>{" "}
                                      {element.accessibility.ariaHidden ? element.accessibility.ariaHidden : "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Has Accessible Name?:</span>{" "}
                                      {element.accessibility.hasAccessibleName ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">tabIndex:</span>{" "}
                                      {element.accessibility.tabIndex ? element.accessibility.tabIndex : "--"}
                                    </div>
                                  </div>
                                </div>

                                {/* State Section */}
                                <div className="space-y-2 min-w-[calc(100vw/10)] max-w-[calc(100vw/25)]">
                                  <h4 className="font-bold text-sm">State</h4>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <span className="font-semibold">Visible:</span>{" "}
                                      {element.state.isVisible ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Enabled:</span>{" "}
                                      {element.state.isEnabled ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Checked:</span>{" "}
                                      {element.state.isChecked ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Required:</span>{" "}
                                      {element.state.isRequired ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Read Only:</span>{" "}
                                      {element.state.isReadOnly ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Content Editable:</span>{" "}
                                      {element.state.isContentEditable ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Focused:</span>{" "}
                                      {element.state.isFocused ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">In Viewport:</span>{" "}
                                      {element.state.isInViewport ? "Yes" : "No"}
                                    </div>
                                  </div>
                                </div>

                                {/* siblings */}
                                <div className="space-y-2 min-w-[calc(100vw/10)] max-w-[calc(100vw/25)]">
                                  <h4 className="font-bold text-sm">Siblings</h4>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <span className="font-semibold">Previous Sibling:</span>{" "}
                                      {element.siblings.previousSibling ? (
                                        <span>
                                          {element.siblings.previousSibling.tag || "--"}
                                          {element.siblings.previousSibling.id ? ` #${element.siblings.previousSibling.id}` : ""}
                                          {element.siblings.previousSibling.class ? ` .${element.siblings.previousSibling.class}` : ""}
                                        </span>
                                      ) : (
                                        "--"
                                      )}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Next Sibling:</span>{" "}
                                      {element.siblings.nextSibling ? (
                                        <span>
                                          {element.siblings.nextSibling.tag || "--"}
                                          {element.siblings.nextSibling.id ? ` #${element.siblings.nextSibling.id}` : ""}
                                          {element.siblings.nextSibling.class ? ` .${element.siblings.nextSibling.class}` : ""}
                                        </span>
                                      ) : (
                                        "--"
                                      )}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Position:</span>{" "}
                                      {element.siblings.siblingPosition || "--"} of {element.siblings.totalSiblings || "--"}
                                    </div>
                                  </div>
                                </div>

                                {/* CustomSelectors */}
                                <div className="space-y-2 min-w-[calc(100vw/10)] max-w-[calc(100vw/20)]">
                                  <h4 className="font-bold text-sm">Custom Selectors</h4>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <span className="font-semibold">Unique Selector:</span>{" "}
                                      {element.customSelectors.uniqueSelector || "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Data Test ID:</span>{" "}
                                      {element.customSelectors.dataTestId || "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Data Automation ID:</span>{" "}
                                      {element.customSelectors.dataAutomationId || "--"}
                                    </div>
                                    <div>
                                      <span className="font-semibold">Custom Data Attributes:</span>{" "}
                                      <div className="break-words">
                                        {Object.keys(element.customSelectors.customDataAttributes).length > 0
                                          ? Object.entries(element.customSelectors.customDataAttributes)
                                            .map(([key, value]) => `${key}="${value}"`)
                                            .join(", ")
                                          : "--"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current page
                    return page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there's a gap
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span className="px-2">...</span>
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => handlePageChange(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      );
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredElements.length)} of {filteredElements.length} items
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

      {/* Comparison Panel */}
      {compareMode && selectedElements.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h3 className="text-lg font-bold mb-4">Element Comparison</h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedElements.map((id) => {
              const element = identifiedElements.find((el) => el.id === id);
              if (!element) return null;
              return (
                <div key={id} className="border p-4 rounded-md">
                  <h4 className="font-bold">
                    {element.tag} #{element.elementId}
                  </h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      Accessibility Score:{" "}
                      {
                        Object.values(element.accessibility).filter(Boolean)
                          .length
                      }
                      /7
                    </div>
                    <div>
                      Performance Score:{" "}
                      {100 - element.performance.layoutImpact}%
                    </div>
                    <div>Test Code:</div>
                    <pre className="bg-gray-100 p-2 rounded text-xs">
                      {generateTestCode(element)}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {identifiedElements.length > 0 && (
        <div
          className={`mt-4 p-4 bg-white rounded-lg shadow container max-w-7xl mb-10 flex flex-col justify-between w-full`}
        >
          <div className="flex p-2 justify-between items-center w-full">
            <div className="flex w-1/2 gap-2 items-center">
              <Select
                value={selectedFramework}
                onValueChange={(e) => setSelectedFramework(e)}
                defaultValue="playwright"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Frameworks</SelectLabel>
                    <SelectItem value="playwright">Playwright</SelectItem>
                    <SelectItem value="cypress">Cypress</SelectItem>
                    <SelectItem value="selenium">Selenium</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={selectedId}
                onValueChange={(e) => setSelectedId(e)}
                defaultValue={identifiedElements[0]?.id}
              >
                <SelectTrigger className="max-w-[250px]">
                  <SelectValue placeholder="Select ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>IDs</SelectLabel>
                    {identifiedElements.map((element, index) => (
                      <SelectItem key={index} value={element.id}>
                        {element.tag} #{element.id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => {
                const selectedElement = identifiedElements.find(
                  element => element.id === selectedId
                );
                if (selectedElement) {
                  analyzeElement(selectedElement);
                }
              }}
              className="flex items-center px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors justify-center"
              disabled={isAnalyzing}
            >
              <FaRobot className="mr-2" />
              {isAnalyzing ? "Analyzing..." : "Comprehensive Analysis"}
            </Button>
          </div>
          {analysis && (
            <div className="w-full space-y-6">
              <div className="flex flex-wrap justify-end pr-5 gap-2">
                <button
                  onClick={() => exportAnalysis("markdown")}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Export MD
                </button>
                <button
                  onClick={() => exportAnalysis("html")}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Export HTML
                </button>
                <button
                  onClick={() => exportAnalysis("pdf")}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Export PDF
                </button>
              </div>
              {renderAnalysisDetails()}
            </div>
          )}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-3 animate-spin bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 rounded-full">
            <div className="rounded-full h-12 w-12 bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
}
