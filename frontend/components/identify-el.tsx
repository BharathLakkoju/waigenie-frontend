"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaRobot,
  FaCode,
  FaBug,
  FaEdit,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

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
      const response = await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/proxy",
        // "https://waigenie-delpoyment-test.onrender.com/api/proxy",
        "https://qa-sdet-latest.onrender.com/api/proxy",
        {
          url,
        }
      );
      setProxyHtml(response.data.html);
    } catch (error) {
      console.error("Error loading URL:", error);
      setError(
        "An error occurred while loading the URL. Please check the console for more details."
      );
    }
    setLoading(false);
  };

  const identifyElements = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        setIdentifiedElements([]);
        setProgress(0);
        setLoading(true);
        (
          iframeRef.current.contentWindow as Window & {
            identifyElements: () => void;
          }
        ).identifyElements();
      } catch (error) {
        console.error("Error identifying elements:", error);
        setError(
          "An error occurred while identifying elements. Please check the console for more details."
        );
        setLoading(false);
      }
    }
  };

  const downloadCsv = async () => {
    try {
      const response = await axios.post(
        // "https://favourable-rea-bharath07-7294baab.koyeb.app/api/generate-csv",
        // "https://waigenie-delpoyment-test.onrender.com/api/generate-csv",
        "https://qa-sdet-latest.onrender.com/api/generate-csv",
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

  return (
    <>
      <div className="container mx-auto px-4 py-8 w-screen flex justify-center items-center gap-8">
        <div className="w-1/3 bg-purple-50 p-8 rounded-md h-[calc(100vh-100px)] shadow-lg">
          <h1 className="text-xl font-bold text-black mb-4">
            Identify Page Elements
          </h1>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to inspect"
            className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
          />
          <input
            type="text"
            value={outputFileName}
            onChange={(e) => setOutputFileName(e.target.value)}
            placeholder="Output CSV file name"
            className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
          />
          <button
            onClick={loadUrl}
            disabled={loading}
            className="mb-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.02] text-sm"
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
                <span>
                  Identifying Elements ({Math.round(progress * 100)}%)
                </span>
              ) : (
                <span>
                  <FaRobot className="inline-block mr-2" />
                  Identify Elements
                </span>
              )}
            </button>
          )}

          {error && (
            <div className="mt-4 bg-red-500 text-white p-4 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="w-2/3 bg-blue-50 rounded-md h-[calc(100vh-100px)] shadow-lg">
          {proxyHtml && (
            <iframe
              ref={iframeRef}
              srcDoc={proxyHtml}
              className="w-full h-[calc(100vh-100px)] border-none"
              sandbox="allow-scripts allow-same-origin"
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
        identifiedElements.length > 0 && (
          <>
            <div
              className={`w-full bg-gray-50 rounded-md shadow-lg max-w-6xl ${
                loading ? "" : "h-[700px]"
              } mx-auto flex flex-col mb-5 overflow-y-scroll`}
            >
              <div className="container mx-auto px-4 py-8 w-screen flex flex-col gap-4">
                {/* Advanced Features Toggle */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() =>
                      setShowAdvancedFeatures(!showAdvancedFeatures)
                    }
                    className="bg-purple-600 text-white px-4 py-2 rounded-md"
                  >
                    {showAdvancedFeatures ? "Hide" : "Show"} Advanced Features
                  </button>
                  <button
                    onClick={() => setCompareMode(!compareMode)}
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {compareMode ? "Exit" : "Enter"} Compare Mode
                  </button>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex flex-wrap gap-4 items-center">
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
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showOnlyVisible}
                        onChange={(e) => setShowOnlyVisible(e.target.checked)}
                      />
                      Show Only Visible
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showOnlyInteractive}
                        onChange={(e) =>
                          setShowOnlyInteractive(e.target.checked)
                        }
                      />
                      Show Only Interactive
                    </label>
                  </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <table className="w-full text-sm text-left text-gray-900">
                    <thead className="text-xs uppercase bg-gray-100">
                      <tr>
                        {compareMode && (
                          <th scope="col" className="px-4 py-2">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                const allIds = filteredElements.map(
                                  (el) => el.id
                                );
                                setSelectedElements(
                                  e.target.checked ? allIds : []
                                );
                              }}
                            />
                          </th>
                        )}
                        <th scope="col" className="px-4 py-2">
                          Basic Info
                        </th>
                        <th scope="col" className="px-4 py-2">
                          Selectors
                        </th>
                        <th scope="col" className="px-4 py-2">
                          Accessibility
                        </th>
                        <th scope="col" className="px-4 py-2">
                          State
                        </th>
                        <th scope="col" className="px-4 py-2">
                          Styles
                        </th>
                        <th scope="col" className="px-4 py-2">
                          Position
                        </th>
                        {showAdvancedFeatures && (
                          <>
                            <th scope="col" className="px-4 py-2">
                              Events
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Shadow DOM
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Performance
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Framework
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Validation
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredElements.map((element, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          {compareMode && (
                            <td className="px-4 py-2">
                              <input
                                type="checkbox"
                                checked={selectedElements.includes(element.id)}
                                onChange={(e) => {
                                  setSelectedElements((prev) =>
                                    e.target.checked
                                      ? [...prev, element.id]
                                      : prev.filter((id) => id !== element.id)
                                  );
                                }}
                              />
                            </td>
                          )}
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer font-medium">
                                {element.tag.toLowerCase()}{" "}
                                {element.elementId && `#${element.elementId}`}
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                <div>
                                  <span className="font-semibold">ID:</span>{" "}
                                  {element.elementId}
                                </div>
                                <div>
                                  <span className="font-semibold">Class:</span>{" "}
                                  {element.className}
                                </div>
                                <div>
                                  <span className="font-semibold">Text:</span>{" "}
                                  {element.text.substring(0, 50)}
                                </div>
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer">
                                View Selectors
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                <div>
                                  <span className="font-semibold">CSS:</span>{" "}
                                  {element.cssSelector}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Relative XPath:
                                  </span>{" "}
                                  {element.relativeXPath}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Absolute XPath:
                                  </span>{" "}
                                  {element.absoluteXPath}
                                </div>
                                <div>
                                  <span className="font-semibold">Unique:</span>{" "}
                                  {element.customSelectors.uniqueSelector}
                                </div>
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer">
                                View A11y Info
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                <div>
                                  <span className="font-semibold">Role:</span>{" "}
                                  {element.accessibility.role}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Aria Label:
                                  </span>{" "}
                                  {element.accessibility.ariaLabel}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Focusable:
                                  </span>{" "}
                                  {element.accessibility.isKeyboardFocusable
                                    ? "Yes"
                                    : "No"}
                                </div>
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer">
                                View State
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                {Object.entries(element.state).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <span className="font-semibold">
                                        {key}:
                                      </span>{" "}
                                      {value.toString()}
                                    </div>
                                  )
                                )}
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer">
                                View Styles
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                {Object.entries(element.computedStyles).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <span className="font-semibold">
                                        {key}:
                                      </span>{" "}
                                      {value}
                                    </div>
                                  )
                                )}
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-2">
                            <details>
                              <summary className="cursor-pointer">
                                View Position
                              </summary>
                              <div className="mt-2 space-y-1 text-xs">
                                <div>
                                  <span className="font-semibold">
                                    Dimensions:
                                  </span>
                                </div>
                                <div>
                                  X: {element.dimensions.x}, Y:{" "}
                                  {element.dimensions.y}
                                </div>
                                <div>
                                  Width: {element.dimensions.width}, Height:{" "}
                                  {element.dimensions.height}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Siblings:
                                  </span>
                                </div>
                                <div>
                                  Position:{" "}
                                  {element.siblings.siblingPosition + 1} of{" "}
                                  {element.siblings.totalSiblings}
                                </div>
                              </div>
                            </details>
                          </td>
                          {showAdvancedFeatures && (
                            <>
                              <td className="px-4 py-2">
                                <details>
                                  <summary className="cursor-pointer">
                                    Event Listeners
                                  </summary>
                                  <div className="mt-2 space-y-1 text-xs">
                                    {Object.entries(element.eventListeners).map(
                                      ([event]) => (
                                        <div
                                          key={event}
                                          className="text-green-600"
                                        >
                                          {event}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </details>
                              </td>
                              <td className="px-4 py-2">
                                <details>
                                  <summary className="cursor-pointer">
                                    Shadow DOM
                                  </summary>
                                  <div className="mt-2 space-y-1 text-xs">
                                    {element.shadowDOM.hasShadowRoot ? (
                                      <>
                                        <div className="font-semibold">
                                          Shadow Elements:
                                        </div>
                                        {element.shadowDOM.shadowElements.map(
                                          (el, i) => (
                                            <div key={i}>
                                              {el.tag} {el.id && `#${el.id}`}
                                            </div>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <div>No Shadow DOM</div>
                                    )}
                                  </div>
                                </details>
                              </td>
                              <td className="px-4 py-2">
                                <details>
                                  <summary className="cursor-pointer">
                                    Performance
                                  </summary>
                                  <div className="mt-2 space-y-1 text-xs">
                                    <div>
                                      Render Time:{" "}
                                      {element.performance.renderTime.toFixed(
                                        2
                                      )}
                                      ms
                                    </div>
                                    <div>
                                      Layout Impact:{" "}
                                      {element.performance.layoutImpact.toFixed(
                                        2
                                      )}
                                      %
                                    </div>
                                    <div>
                                      Memory:{" "}
                                      {(
                                        element.performance.memoryEstimate /
                                        1024
                                      ).toFixed(2)}
                                      KB
                                    </div>
                                  </div>
                                </details>
                              </td>
                              <td className="px-4 py-2">
                                <details>
                                  <summary className="cursor-pointer">
                                    Framework
                                  </summary>
                                  <div className="mt-2 space-y-1 text-xs">
                                    {Object.entries(element.framework)
                                      .filter(([, used]) => used)
                                      .map(([name]) => (
                                        <div
                                          key={name}
                                          className="text-blue-600"
                                        >
                                          {name}
                                        </div>
                                      ))}
                                  </div>
                                </details>
                              </td>
                              <td className="px-4 py-2">
                                <details>
                                  <summary className="cursor-pointer">
                                    Validation
                                  </summary>
                                  <div className="mt-2 space-y-1 text-xs">
                                    {element.validation.hasValidation ? (
                                      <>
                                        <div>
                                          Message:{" "}
                                          {element.validation.validationMessage}
                                        </div>
                                        {element.validation.validity &&
                                          Object.entries(
                                            element.validation.validity
                                          )
                                            .filter(([, value]) => value)
                                            .map(([key]) => (
                                              <div
                                                key={key}
                                                className="text-red-600"
                                              >
                                                {key}
                                              </div>
                                            ))}
                                      </>
                                    ) : (
                                      <div>No Validation</div>
                                    )}
                                  </div>
                                </details>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Comparison Panel */}
                {compareMode && selectedElements.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                    <h3 className="text-lg font-bold mb-4">
                      Element Comparison
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedElements.map((id) => {
                        const element = identifiedElements.find(
                          (el) => el.id === id
                        );
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
                                  Object.values(element.accessibility).filter(
                                    Boolean
                                  ).length
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
              </div>
              <div className="overflow-auto p-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Identified Elements
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-900 sticky top-10">
                      <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tag
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Element ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Class
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Relative XPath
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Absolute XPath
                          </th>
                          <th scope="col" className="px-6 py-3">
                            CSS Selector
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Link Text
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Partial Link Text
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Text Content
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Attributes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {identifiedElements.map((element, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">{element.id}</td>
                            <td className="px-6 py-4">{element.tag}</td>
                            <td className="px-6 py-4">{element.elementId}</td>
                            <td className="px-6 py-4">{element.className}</td>
                            <td className="px-6 py-4">
                              {element.relativeXPath}
                            </td>
                            <td className="px-6 py-4">
                              {element.absoluteXPath}
                            </td>
                            <td className="px-6 py-4">{element.cssSelector}</td>
                            <td className="px-6 py-4">{element.linkText}</td>
                            <td className="px-6 py-4">
                              {element.partialLinkText}
                            </td>
                            <td className="px-6 py-4">
                              {element.text.substring(0, 50)}
                              {element.text.length > 50 ? "..." : ""}
                            </td>
                            <td className="px-6 py-4">
                              <details>
                                <summary className="cursor-pointer">
                                  View Attributes
                                </summary>
                                <div className="mt-2">
                                  {Object.entries(element.attributes).map(
                                    ([key, value]) => (
                                      <div key={key} className="text-xs">
                                        <span className="font-semibold">
                                          {key}:
                                        </span>{" "}
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              </details>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={downloadCsv}
                    className="mt-4 bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    <FaCode className="inline-block mr-2" />
                    Download CSV
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
