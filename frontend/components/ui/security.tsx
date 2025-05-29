// SecurityAnalysisDashboard.tsx
'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Define types for our data
interface ComplianceImpact {
  requirements: string[];
  standard: string;
}

interface Recommendation {
  action: string;
  implementation: string;
  priority: 'low' | 'medium' | 'high';
}

interface Risk {
  category: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

interface SecurityAnalysisData {
  compliance_impact: ComplianceImpact;
  recommendations: Recommendation[];
  risks: Risk[];
  severity_level: 'low' | 'medium' | 'high' | 'critical';
}

export default function SecurityAnalysisDashboard({ data }: { data: SecurityAnalysisData }) {

  // Helper function to get badge color based on severity
  const getSeverityColor = (
    severity: 'low' | 'medium' | 'high' | 'critical'
  ) => {
    switch (severity) {
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'high':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'critical':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Helper function to get icon based on severity
  const getSeverityIcon = (
    severity: 'low' | 'medium' | 'high' | 'critical'
  ) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'medium':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'high':
        return <AlertCircle className="h-8 w-8 text-orange-500" />;
      case 'critical':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Shield className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Main Summary Card */}
      <Card className="mb-6 border-2 border-green-100 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl">Security Analysis</CardTitle>
            <CardDescription>
              Component security assessment and risk analysis
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getSeverityIcon(data?.severity_level)}
            <Badge
              className={`${getSeverityColor(
                data?.severity_level
              )} px-3 py-1`}
            >
              {data?.severity_level.toUpperCase()} SEVERITY
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-16 w-16 text-green-500 mb-2" />
              <h2 className="text-xl font-semibold mb-1">
                Component Analysis Complete
              </h2>
              <p className="text-gray-500">
                No security concerns were identified in this component
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.risks?.length === 0 ||
              (data?.risks?.length === 1 &&
                data?.risks[0]?.description?.includes(
                  'No security risks'
                )) ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>No Risks Identified</AlertTitle>
                <AlertDescription>
                  This component has passed all security checks and no risks
                  were found.
                </AlertDescription>
              </Alert>
            ) : (
              // If there were risks, they would be displayed here
              <div className="space-y-4">
                {data?.risks?.map((risk, index) => (
                  <Alert
                    key={index}
                    className="border-l-4"
                    style={{
                      borderLeftColor:
                        risk.impact === 'high'
                          ? '#ef4444'
                          : risk.impact === 'medium'
                            ? '#f59e0b'
                            : '#22c55e',
                    }}
                  >
                    <AlertTitle className="font-medium">
                      {risk?.category}
                    </AlertTitle>
                    <AlertDescription>{risk?.description}</AlertDescription>
                    <div className="mt-2">
                      <Badge className={getSeverityColor(risk?.impact)}>
                        {risk?.impact?.toUpperCase()} IMPACT
                      </Badge>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.recommendations?.length === 0 ||
              (data?.recommendations?.length === 1 &&
                data?.recommendations[0]?.action?.includes(
                  'No recommendations'
                )) ? (
              <Alert className="bg-blue-50 border-blue-200">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle>No Actions Required</AlertTitle>
                <AlertDescription>
                  This component does not require any security improvements at
                  this time.
                </AlertDescription>
              </Alert>
            ) : (
              // If there were recommendations, they would be displayed here
              <div className="space-y-4">
                {data?.recommendations?.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{rec?.action}</h3>
                      <Badge className={getSeverityColor(rec?.priority as any)}>
                        {rec?.priority?.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {rec?.implementation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Compliance Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium">Standard: </h3>
              <span className="ml-2">
                {data?.compliance_impact?.standard === 'none'
                  ? 'No compliance standards applicable'
                  : data?.compliance_impact?.standard}
              </span>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-medium mb-2">Requirements:</h3>
              {data?.compliance_impact?.requirements?.length === 0 ? (
                <p className="text-gray-600">
                  No compliance requirements affected
                </p>
              ) : (
                <ul className="list-disc list-inside">
                  {data?.compliance_impact?.requirements?.map(
                    (req, index) => (
                      <li key={index} className="text-gray-600">
                        {req}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
