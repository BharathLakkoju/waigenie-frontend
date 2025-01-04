import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TestIdeaStore {
  url: string;
  selectedElements: any[];
  testScenarios: string;
  manualTestCases: string;
  browserStarted: boolean;
  mode: "auto" | "manual";
  setUrl: (url: string) => void;
  setSelectedElements: (elements: any[]) => void;
  setTestScenarios: (scenarios: string) => void;
  setManualTestCases: (cases: string) => void;
  setBrowserStarted: (started: boolean) => void;
  setMode: (mode: "auto" | "manual") => void;
  clearAll: () => void;
}

interface GenerateBDDStore {
  userStory: string;
  detailLevel: string;
  generationMethod: string;
  gherkinFeature: string;
  manualTestCases: string;
  setUserStory: (story: string) => void;
  setDetailLevel: (level: string) => void;
  setGenerationMethod: (method: string) => void;
  setGherkinFeature: (feature: string) => void;
  setManualTestCases: (cases: string) => void;
  clearAll: () => void;
}

interface IdentifyElStore {
  url: string;
  outputFileName: string;
  identifiedElements: any[];
  proxyHtml: string;
  filterText: string;
  selectedCategory: string;
  showOnlyVisible: boolean;
  showOnlyInteractive: boolean;
  selectedFramework: string;
  setUrl: (url: string) => void;
  setOutputFileName: (name: string) => void;
  setIdentifiedElements: (elements: any[]) => void;
  setProxyHtml: (html: string) => void;
  setFilterText: (text: string) => void;
  setSelectedCategory: (category: string) => void;
  setShowOnlyVisible: (show: boolean) => void;
  setShowOnlyInteractive: (show: boolean) => void;
  setSelectedFramework: (framework: string) => void;
  clearAll: () => void;
}

interface AutomateCodeStore {
  url: string;
  featureContent: string;
  language: string;
  generatedCode: string;
  browserStarted: boolean;
  setUrl: (url: string) => void;
  setFeatureContent: (content: string) => void;
  setLanguage: (lang: string) => void;
  setGeneratedCode: (code: string) => void;
  setBrowserStarted: (started: boolean) => void;
  clearAll: () => void;
}

export const useTestIdeaStore = create<TestIdeaStore>()(
  persist(
    (set) => ({
      url: "",
      selectedElements: [],
      testScenarios: "",
      manualTestCases: "",
      browserStarted: false,
      mode: "auto",
      setUrl: (url) => set({ url }),
      setSelectedElements: (elements) => set({ selectedElements: elements }),
      setTestScenarios: (scenarios) => set({ testScenarios: scenarios }),
      setManualTestCases: (cases) => set({ manualTestCases: cases }),
      setBrowserStarted: (started) => set({ browserStarted: started }),
      setMode: (mode) => set({ mode }),
      clearAll: () =>
        set({
          url: "",
          selectedElements: [],
          testScenarios: "",
          manualTestCases: "",
          browserStarted: false,
          mode: "auto",
        }),
    }),
    {
      name: "test-idea-store",
    }
  )
);

export const useGenerateBDDStore = create<GenerateBDDStore>()(
  persist(
    (set) => ({
      userStory: "",
      detailLevel: "Simple",
      generationMethod: "direct",
      gherkinFeature: "",
      manualTestCases: "",
      setUserStory: (story) => set({ userStory: story }),
      setDetailLevel: (level) => set({ detailLevel: level }),
      setGenerationMethod: (method) => set({ generationMethod: method }),
      setGherkinFeature: (feature) => set({ gherkinFeature: feature }),
      setManualTestCases: (cases) => set({ manualTestCases: cases }),
      clearAll: () =>
        set({
          userStory: "",
          detailLevel: "Simple",
          generationMethod: "direct",
          gherkinFeature: "",
          manualTestCases: "",
        }),
    }),
    {
      name: "generate-bdd-store",
    }
  )
);

export const useIdentifyElStore = create<IdentifyElStore>()(
  persist(
    (set) => ({
      url: "",
      outputFileName: "elements.csv",
      identifiedElements: [],
      proxyHtml: "",
      filterText: "",
      selectedCategory: "all",
      showOnlyVisible: false,
      showOnlyInteractive: false,
      selectedFramework: "playwright",
      setUrl: (url) => set({ url }),
      setOutputFileName: (name) => set({ outputFileName: name }),
      setIdentifiedElements: (elements) =>
        set({ identifiedElements: elements }),
      setProxyHtml: (html) => set({ proxyHtml: html }),
      setFilterText: (text) => set({ filterText: text }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setShowOnlyVisible: (show) => set({ showOnlyVisible: show }),
      setShowOnlyInteractive: (show) => set({ showOnlyInteractive: show }),
      setSelectedFramework: (framework) =>
        set({ selectedFramework: framework }),
      clearAll: () =>
        set({
          url: "",
          outputFileName: "elements.csv",
          identifiedElements: [],
          proxyHtml: "",
          filterText: "",
          selectedCategory: "all",
          showOnlyVisible: false,
          showOnlyInteractive: false,
          selectedFramework: "playwright",
        }),
    }),
    {
      name: "identify-el-store",
    }
  )
);

export const useAutomateCodeStore = create<AutomateCodeStore>()(
  persist(
    (set) => ({
      url: "",
      featureContent: "",
      language: "Python",
      generatedCode: "",
      browserStarted: false,
      setUrl: (url) => set({ url }),
      setFeatureContent: (content) => set({ featureContent: content }),
      setLanguage: (lang) => set({ language: lang }),
      setGeneratedCode: (code) => set({ generatedCode: code }),
      setBrowserStarted: (started) => set({ browserStarted: started }),
      clearAll: () =>
        set({
          url: "",
          featureContent: "",
          language: "Python",
          generatedCode: "",
          browserStarted: false,
        }),
    }),
    {
      name: "automate-code-store",
    }
  )
);
