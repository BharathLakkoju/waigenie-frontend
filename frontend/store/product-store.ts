import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Test Idea Store Types
interface TestIdeaState {
  url: string;
  selectedElements: any[];
  testScenarios: string;
  manualTestCases: string;
  browserStarted: boolean;
  mode: 'auto' | 'manual';
}

// Identify Elements Store Types
interface IdentifyElState {
  url: string;
  outputFileName: string;
  proxyHtml: string;
  identifiedElements: any[];
  filterText: string;
  selectedCategory: string;
  showOnlyVisible: boolean;
  showOnlyInteractive: boolean;
  analysis: any;
  selectedFramework: string;
  locators: string;
}

// Automate Code Store Types
interface AutomateCodeState {
  url: string;
  featureContent: string;
  language: string;
  generatedCode: string;
  screenshot: string;
  browserStarted: boolean;
}

// Generate BDD Store Types
interface GenerateBDDState {
  userStory: string;
  detailLevel: string;
  generationMethod: string;
  gherkinFeature: string;
  manualTestCases: string;
  generatedBDD: string;
}

// Test Idea Store
export const useTestIdeaStore = create<TestIdeaState>()(
  persist(
    (set) => ({
      url: "",
      selectedElements: [],
      testScenarios: "",
      manualTestCases: "",
      browserStarted: false,
      mode: "auto",
    }),
    {
      name: 'test-idea-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Identify Elements Store
export const useIdentifyElStore = create<IdentifyElState>()(
  persist(
    (set) => ({
      url: "",
      outputFileName: "elements.csv",
      proxyHtml: "",
      identifiedElements: [],
      filterText: "",
      selectedCategory: "all",
      showOnlyVisible: false,
      showOnlyInteractive: false,
      analysis: null,
      selectedFramework: "playwright",
      locators: "",
    }),
    {
      name: 'identify-el-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Automate Code Store
export const useAutomateCodeStore = create<AutomateCodeState>()(
  persist(
    (set) => ({
      url: "",
      featureContent: "",
      language: "Python",
      generatedCode: "",
      screenshot: "",
      browserStarted: false,
    }),
    {
      name: 'automate-code-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Generate BDD Store
export const useGenerateBDDStore = create<GenerateBDDState>()(
  persist(
    (set) => ({
      userStory: "",
      detailLevel: "Simple",
      generationMethod: "direct",
      gherkinFeature: "",
      manualTestCases: "",
      generatedBDD: "",
    }),
    {
      name: 'generate-bdd-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 