// AccessibilityAnalysisDashboard.tsx
'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
  InfoCircledIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Define types for our data
interface AccessibilityIssue {
  category: string;
  wcag_criterion: string;
  description: string;
  impact_level: 'low' | 'medium' | 'high';
}

interface Recommendation {
  priority: 'low' | 'medium' | 'high';
  action: string;
  implementation_details: string;
  wcag_success_criteria: string[];
}

interface WcagViolation {
  criterion: string;
  level: string;
  description: string;
  fix_required: boolean;
}

interface ComplianceSummary {
  overall_status: string;
  critical_issues_count: number;
  recommended_actions_count: number;
}

export default function AccessibilityAnalysisDashboard({issues, recommendations, wcagViolations, complianceSummary}: {issues: AccessibilityIssue[], recommendations: Recommendation[], wcagViolations: WcagViolation[], complianceSummary: ComplianceSummary}) {

  // Helper functions
  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getImpactIcon = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return <CrossCircledIcon className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <InfoCircledIcon className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'perceivable':
        return <span className="text-purple-500">👁️</span>;
      case 'operable':
        return <span className="text-green-500">🖱️</span>;
      case 'understandable':
        return <span className="text-blue-500">🧠</span>;
      case 'visual':
        return <span className="text-amber-500">🎨</span>;
      default:
        return <span className="text-gray-500">📋</span>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Compliance Summary */}
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Accessibility Analysis</CardTitle>
              <CardDescription>
                WCAG compliance assessment and recommendations
              </CardDescription>
            </div>
            <Badge
              className={
                complianceSummary.overall_status === 'compliant'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }
              // size="lg"
            >
              {complianceSummary.overall_status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Critical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-red-500">
                    {complianceSummary.critical_issues_count}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    issues to fix
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-blue-500">
                    {complianceSummary.recommended_actions_count}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">tasks</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">WCAG Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-amber-500">A</span>
                  <span className="ml-2 text-sm text-gray-500">violations</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="violations">WCAG Violations</TabsTrigger>
        </TabsList>

        {/* Issues Tab */}
        <TabsContent value="issues" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Issues</CardTitle>
              <CardDescription>
                Identified problems that need to be addressed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <Alert
                    key={index}
                    variant="default"
                    className="border-l-4"
                    style={{
                      borderLeftColor:
                        issue.impact_level === 'high'
                          ? '#ef4444'
                          : issue.impact_level === 'medium'
                          ? '#f59e0b'
                          : '#3b82f6',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {getImpactIcon(issue.impact_level)}
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(issue.category)}
                        <AlertTitle className="font-medium">
                          {issue.category}: {issue.wcag_criterion}
                        </AlertTitle>
                      </div>
                    </div>
                    <AlertDescription className="mt-2">
                      <p className="mt-1 text-sm">{issue.description}</p>
                      <div className="mt-2">
                        <Badge
                          className={`mt-2 ${getImpactColor(
                            issue.impact_level
                          )}`}
                        >
                          {issue.impact_level.toUpperCase()} IMPACT
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Suggested actions to improve accessibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        {getImpactIcon(recommendation.priority)}
                        {recommendation.action}
                      </h3>
                      <Badge
                        className={`${getImpactColor(recommendation.priority)}`}
                      >
                        {recommendation.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Implementation Details:
                      </h4>
                      <p className="text-sm">
                        {recommendation.implementation_details}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        WCAG Success Criteria:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.wcag_success_criteria.map(
                          (criterion, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {criterion}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Violations Tab */}
        <TabsContent value="violations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>WCAG Violations</CardTitle>
              <CardDescription>
                Non-compliance with WCAG standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criterion</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Fix Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wcagViolations.map((violation, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {violation.criterion}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                        >
                          {violation.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{violation.description}</TableCell>
                      <TableCell>
                        {violation.fix_required ? (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Required
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Optional
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-4">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm text-gray-600">
                  All identified violations are Level A, which are the most
                  basic web accessibility requirements that must be satisfied.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};