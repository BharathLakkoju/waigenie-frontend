'use client';
// types.ts
export interface Trend {
  category: string;
  trend: string;
  impact: string;
  adoption_rate: string;
}

export interface CompetitionAnalysis {
  market_position: string;
  differentiators: string[];
  gaps: string[];
}

export interface Opportunity {
  type: string;
  potential_impact: string;
  implementation_complexity: string;
  estimated_roi: string;
}

export interface Recommendation {
  priority: string;
  action: string;
  expected_outcome: string;
  measurement_metrics: string[];
}

export interface DashboardData {
  trends: Trend[];
  competition: CompetitionAnalysis;
  opportunities: Opportunity[];
  recommendations: Recommendation[];
}

// page.tsx

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function UxStrategy({ data }: { data: DashboardData }) {
  console.log("automation data: ", data)
  const [activeTab, setActiveTab] = useState('trends');

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getProgressValue = (percentage: string) => {
    return parseInt(percentage.replace('%', ''));
  };

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

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Automation Analysis Dashboard</h1>

      <Tabs
        defaultValue="trends"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.trends?.map((trend, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{trend?.category}</CardTitle>
                  <Badge className={`${getImpactColor(trend?.impact)} w-fit`}>
                    {trend?.impact?.charAt(0).toUpperCase() +
                      trend?.impact?.slice(1)}{' '}
                    Impact
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{trend?.trend}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adoption Rate</span>
                      <span className="font-medium">{trend?.adoption_rate}</span>
                    </div>
                    <Progress
                      value={getProgressValue(trend?.adoption_rate)}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competition Tab */}
        <TabsContent value="competition">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>
                Market position and competitive landscape
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Market Position</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {data?.competition?.market_position}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Key Differentiators
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {data?.competition?.differentiators?.map((diff, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Market Gaps</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data?.competition?.gaps?.map((gap, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.opportunities?.map((opportunity, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{opportunity?.type}</CardTitle>
                  <div className="flex space-x-2 mt-2">
                    <Badge
                      className={getImpactColor(opportunity?.potential_impact)}
                    >
                      {opportunity?.potential_impact?.charAt(0).toUpperCase() +
                        opportunity?.potential_impact?.slice(1)}{' '}
                      Impact
                    </Badge>
                    <Badge
                      className={getComplexityColor(
                        opportunity?.implementation_complexity
                      )}
                    >
                      {opportunity?.implementation_complexity
                        .charAt(0)
                        .toUpperCase() +
                        opportunity?.implementation_complexity?.slice(1)}{' '}
                      Complexity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-sm font-medium mb-1">Expected ROI</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {opportunity?.estimated_roi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {data?.recommendations?.map((rec, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    Recommendation {index + 1}
                  </CardTitle>
                  <Badge className={getPriorityColor(rec?.priority)}>
                    {rec?.priority?.charAt(0).toUpperCase() +
                      rec?.priority?.slice(1)}{' '}
                    Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Action</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {rec?.action}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Expected Outcome</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {rec?.expected_outcome}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">
                    Measurement Metrics
                  </h3>
                  <ul className="list-disc list-inside">
                    {rec?.measurement_metrics?.map((metric, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
