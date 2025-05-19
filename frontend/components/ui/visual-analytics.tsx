'use client';
// types.ts
export interface VerificationStep {
  verification_steps: string[];
  expected_results: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export interface Checkpoint extends VerificationStep {
  name: string;
  type: string;
  priority: string;
}

export interface Breakpoint {
  width: number;
  device_category: string;
  critical_checks: string[];
}

export interface LayoutShift {
  scenario: string;
  expected_behavior: string;
  validation_points: string[];
}

export interface ResponsiveTesting {
  breakpoints: Breakpoint[];
  layout_shifts: LayoutShift[];
}

export interface Browser {
  name: string;
  versions: string[];
  specific_checks: string[];
}

export interface BrowserMatrix {
  supported_browsers: Browser[];
  known_issues: string[];
}

export interface ComparisonMethod {
  type: string;
  threshold: number | null;
  applicable_scenarios: string[];
}

export interface AutomationTool {
  name: string;
  purpose: string;
  configuration: Record<string, any>;
}

export interface TestingStrategy {
  baseline_requirements: string[];
  comparison_methods: ComparisonMethod[];
  automation_tools: AutomationTool[];
}

export interface ImplementationPlan {
  setup_steps: string[];
  test_sequence: string[];
  maintenance_considerations: string[];
  success_criteria: string[];
}

export interface VisualAnalysisData {
  checkpoints: Checkpoint[];
  responsive_testing: ResponsiveTesting;
  dynamic_content: {
    states: any[];
    async_behaviors: any[];
  };
  browser_matrix: BrowserMatrix;
  testing_strategy: TestingStrategy;
  implementation_plan: ImplementationPlan;
}

// page.tsx

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VisualAnalysisDashboard({ data }: { data: VisualAnalysisData }) {
  console.log("visual data: ", data);
  const [activeTab, setActiveTab] = useState('checkpoints');

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'layout':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'style':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'interaction':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Visual Analysis Dashboard</h1>

      <Tabs
        defaultValue="checkpoints"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="checkpoints">Checkpoints</TabsTrigger>
          <TabsTrigger value="responsive">Responsive Testing</TabsTrigger>
          <TabsTrigger value="browsers">Browser Support</TabsTrigger>
          <TabsTrigger value="strategy">Testing Strategy</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Plan</TabsTrigger>
        </TabsList>

        {/* Checkpoints Tab */}
        <TabsContent value="checkpoints" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {data?.checkpoints?.map((checkpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{checkpoint?.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getTypeColor(checkpoint?.type)}>
                        {checkpoint?.type?.charAt(0).toUpperCase() +
                          checkpoint?.type?.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(checkpoint?.priority)}>
                        {checkpoint?.priority?.charAt(0).toUpperCase() +
                          checkpoint?.priority.slice(1)}{' '}
                        Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Verification Steps
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {checkpoint?.verification_steps?.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Expected Results
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>Expected Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Desktop</TableCell>
                          <TableCell>
                            {checkpoint?.expected_results?.desktop}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Tablet</TableCell>
                          <TableCell>
                            {checkpoint?.expected_results?.tablet}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mobile</TableCell>
                          <TableCell>
                            {checkpoint?.expected_results?.mobile}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Responsive Testing Tab */}
        <TabsContent value="responsive">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Breakpoints</CardTitle>
                <CardDescription>
                  Device-specific testing configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device Category</TableHead>
                      <TableHead>Width (px)</TableHead>
                      <TableHead>Critical Checks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.responsive_testing?.breakpoints?.map(
                      (breakpoint, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium capitalize">
                            {breakpoint?.device_category}
                          </TableCell>
                          <TableCell>{breakpoint?.width}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {breakpoint?.critical_checks?.map((check, idx) => (
                                <Badge key={idx} variant="outline">
                                  {check}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout Shifts</CardTitle>
                <CardDescription>
                  Expected behavior during responsive adjustments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.responsive_testing?.layout_shifts?.map((shift, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">
                        Scenario: {shift?.scenario}
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">
                            Expected Behavior:
                          </span>{' '}
                          {shift?.expected_behavior}
                        </p>
                        <div>
                          <p className="font-medium">Validation Points:</p>
                          <ul className="list-disc list-inside mt-1">
                            {shift?.validation_points?.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Browser Support Tab */}
        <TabsContent value="browsers">
          <Card>
            <CardHeader>
              <CardTitle>Browser Compatibility Matrix</CardTitle>
              <CardDescription>
                Supported browsers and specific testing considerations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.browser_matrix?.supported_browsers?.map(
                  (browser, index) => (
                    <Card key={index}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg">
                          {browser?.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Versions</p>
                            <div className="flex gap-2">
                              {browser?.versions?.map((version, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {version}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Specific Checks
                            </p>
                            <ul className="list-disc list-inside">
                              {browser?.specific_checks?.map((check, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-gray-700 dark:text-gray-300"
                                >
                                  {check}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>

              {data?.browser_matrix?.known_issues?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Known Issues</h3>
                  <ul className="list-disc list-inside">
                    {data?.browser_matrix?.known_issues?.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Strategy Tab */}
        <TabsContent value="strategy">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Baseline Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {data?.testing_strategy?.baseline_requirements?.map(
                    (req, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {req}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparison Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Applicable Scenarios</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.testing_strategy?.comparison_methods?.map(
                      (method, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium capitalize">
                            {method?.type}
                          </TableCell>
                          <TableCell>
                            {method?.threshold !== null
                              ? method?.threshold
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside">
                              {method?.applicable_scenarios?.map(
                                (scenario, idx) => (
                                  <li key={idx}>{scenario}</li>
                                )
                              )}
                            </ul>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automation Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data?.testing_strategy?.automation_tools?.map((tool, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-1">{tool?.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {tool?.purpose}
                      </p>
                      {Object.keys(tool?.configuration)?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium">Configuration:</p>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 text-xs overflow-x-auto">
                            {JSON.stringify(tool?.configuration, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Implementation Plan Tab */}
        <TabsContent value="implementation">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="setup">
              <AccordionTrigger>Setup Steps</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  {data?.implementation_plan?.setup_steps?.map((step, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sequence">
              <AccordionTrigger>Test Sequence</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  {data?.implementation_plan?.test_sequence?.map((step, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="maintenance">
              <AccordionTrigger>Maintenance Considerations</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {data?.implementation_plan?.maintenance_considerations?.map(
                    (consideration, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {consideration}
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="success">
              <AccordionTrigger>Success Criteria</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {data?.implementation_plan?.success_criteria?.map(
                    (criteria, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {criteria}
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
