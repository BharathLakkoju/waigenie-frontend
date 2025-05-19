// PerformanceAnalysisDashboard.tsx
'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Define types for our data
interface Issue {
  category: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  metrics_affected: string[];
}

interface Optimization {
  priority: 'low' | 'medium' | 'high';
  recommendation: string;
  implementation: string;
  expected_improvement: string;
}

interface Metric {
  metric: string;
  current_value: string;
  target_value: string;
  measurement_method: string;
}

interface PerformanceScore {
  overall: number;
  categories: {
    loading: number;
    rendering: number;
    execution: number;
    memory: number;
  };
}

interface Performance {
  issues: Issue[];
  metrics_to_monitor: Metric[];
  optimizations: Optimization[];
  performance_score: PerformanceScore;
}

export default function PerformanceAnalysisDashboard({ performance }: { performance: Performance }) {
  console.log("performance data: ", performance)
  // const optimizations: Optimization[] = [
  //   {
  //     priority: 'high',
  //     recommendation:
  //       'Optimize DOM structure and CSS for improved layout performance.',
  //     implementation:
  //       '1. Analyze the content of the div and refactor to minimize unnecessary DOM nodes. Consider using CSS grid or flexbox for efficient layout. 2. Profile the layout calculations using browser developer tools to identify bottlenecks. 3. Optimize CSS selectors to avoid complex calculations. 4. Minimize the use of inline styles.',
  //     expected_improvement:
  //       'Reduce layoutImpact by 50% (from 6.87 to <3.43) and renderTime by 20% (from 0.1s to <0.08s).',
  //   },
  //   {
  //     priority: 'medium',
  //     recommendation:
  //       'Reduce the number of event listeners or implement event delegation.',
  //     implementation:
  //       '1. Identify essential event listeners and remove unnecessary ones. 2. For similar event handlers on multiple child elements, use event delegation to attach a single listener to a parent element.',
  //     expected_improvement:
  //       'Reduce event handling overhead, improving renderTime by 10% (from 0.1s to <0.09s) and potentially reducing memory usage.',
  //   },
  //   {
  //     priority: 'medium',
  //     recommendation: 'Optimize text rendering for memory efficiency.',
  //     implementation:
  //       '1. If the text content is dynamic, consider using techniques like virtual DOM or efficient text updates to minimize DOM manipulation. 2. If possible, reduce the amount of text displayed or break it into smaller chunks.',
  //     expected_improvement:
  //       'Reduce memoryEstimate by 20% (from 1259 bytes to <1007 bytes).',
  //   },
  // ];

  // const metrics: Metric[] = [
  //   {
  //     metric: 'layoutImpact',
  //     current_value: '6.87',
  //     target_value: '<3.43',
  //     measurement_method: 'Browser developer tools (Performance tab)',
  //   },
  //   {
  //     metric: 'renderTime',
  //     current_value: '0.1s',
  //     target_value: '<0.08s',
  //     measurement_method: 'Browser developer tools (Performance tab)',
  //   },
  //   {
  //     metric: 'memoryEstimate',
  //     current_value: '1259 bytes',
  //     target_value: '<1007 bytes',
  //     measurement_method: 'Browser developer tools (Memory tab)',
  //   },
  // ];

  // const performanceScore: PerformanceScore = {
  // overall: 70,
  //   categories: {
  //   loading: 100,
  //     rendering: 60,
  //       execution: 80,
  //         memory: 75,
  //   },
  // };

  // Helper function to get the appropriate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Helper function to get the appropriate color for impact/priority badges
  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Helper function to get the appropriate icon for impact/priority
  const getImpactIcon = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return <XCircle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Overall Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>
            Overall performance score and category breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="text-center mb-4">
                <span className="text-6xl font-bold">
                  {performance?.performance_score?.overall}
                </span>
                <span className="text-xl">/100</span>
              </div>
              <Progress
                foreColor={getScoreColor(
                  performance?.performance_score?.overall
                )}
                value={performance?.performance_score?.overall}
                className={`h-3 w-full rounded-full ${getScoreColor(
                  performance?.performance_score?.overall
                )} bg-gray-400`}
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Loading</span>
                  <span>{performance?.performance_score?.categories?.loading} %</span>
                </div>
                <Progress
                  value={performance?.performance_score?.categories?.loading}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Rendering</span>
                  <span>{performance?.performance_score?.categories?.rendering}%</span>
                </div>
                <Progress
                  value={performance?.performance_score?.categories?.rendering}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Execution</span>
                  <span>{performance?.performance_score?.categories?.execution}%</span>
                </div>
                <Progress
                  value={performance?.performance_score?.categories?.execution}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Memory</span>
                  <span>{performance?.performance_score?.categories?.memory}%</span>
                </div>
                <Progress
                  value={performance?.performance_score?.categories?.memory}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
          <CardDescription>Identified performance problems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performance?.issues?.map((issue, index) => (
              <Alert
                key={index}
                className="border-l-4"
                style={{
                  borderLeftColor:
                    issue?.impact === 'high'
                      ? '#ef4444'
                      : issue?.impact === 'medium'
                        ? '#f59e0b'
                        : '#22c55e',
                }}
              >
                <div className="flex items-center gap-2">
                  {getImpactIcon(issue?.impact)}
                  <AlertTitle className="font-medium">
                    {issue?.category}
                  </AlertTitle>
                </div>
                <AlertDescription className="mt-2">
                  <p className="mt-1 text-sm">{issue?.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-medium">Affects:</span>
                    {issue?.metrics_affected.map((metric, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={`mt-2 ${getImpactColor(issue.impact)}`}>
                    {issue?.impact.toUpperCase()} IMPACT
                  </Badge>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimizations */}
      <Card>
        <CardHeader>
          <CardTitle>Optimizations</CardTitle>
          <CardDescription>
            Recommended performance improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performance?.optimizations?.map((opt, index) => (
              <div
                key={index}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{opt.recommendation}</h3>
                  <Badge className={`${getImpactColor(opt.priority)}`}>
                    {opt.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <h4 className="font-medium">Implementation:</h4>
                    <p className="whitespace-pre-line">{opt.implementation}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Expected Improvement:</h4>
                    <p>{opt.expected_improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics to Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Metrics to Monitor</CardTitle>
          <CardDescription>Key performance indicators to track</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Target Value</TableHead>
                <TableHead>Measurement Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performance?.metrics_to_monitor?.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{metric.metric}</TableCell>
                  <TableCell>{metric.current_value}</TableCell>
                  <TableCell>{metric.target_value}</TableCell>
                  <TableCell>{metric.measurement_method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
