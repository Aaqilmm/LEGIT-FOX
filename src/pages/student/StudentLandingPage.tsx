import { Link } from 'react-router-dom';
import { FileCheck, ArrowRight, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { FoxMascot } from '@/components/branding/FoxMascot';
import { DemoModeAlert } from '@/components/common/DemoModeBadge';

export function StudentLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <FoxMascot variant="welcome" size="xl" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
              Welcome to Legit Fox
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mt-4 max-w-3xl mx-auto leading-relaxed">
              Your intelligent companion for navigating the grievance resolution process. Get help
              understanding requirements, checking completeness, and filing complaints with confidence.
            </p>
          </div>
          <DemoModeAlert />
        </div>

        {/* Main CTA */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">File Your Complaint</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Our Smart Complaint Checker guides you through the process, ensuring you have all
                  necessary information before submission. Get real-time suggestions and explanations.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="lg">
              <Link to="/student/checker">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Chat with Legit Fox in the bottom-right corner for instant help and guidance
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Check</h3>
              <p className="text-sm text-muted-foreground">
                Get real-time feedback on your complaint completeness with clear explanations
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                View your submitted complaints and track their status in your dashboard
              </p>
            </CardContent>
          </Card>
        </div>

      {/* Information Section */}
      <Card className="bg-muted/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="font-semibold text-lg mb-2 text-primary dark:text-amber-400">
                1. Describe Your Issue
              </div>
              <p className="text-sm text-foreground/80">
                Explain your complaint in your own words. Our assistant helps you understand what
                category it falls under and what information may be useful.
              </p>
            </div>
            <div>
              <div className="font-semibold text-lg mb-2 text-primary dark:text-amber-400">
                2. Check Completeness
              </div>
              <p className="text-sm text-foreground/80">
                Use the Smart Checker to identify missing information and understand why each detail
                matters for official review.
              </p>
            </div>
            <div>
              <div className="font-semibold text-lg mb-2 text-primary dark:text-amber-400">
                3. Prepare Your Draft
              </div>
              <p className="text-sm text-foreground/80">
                Review your complaint with all necessary details. The assistant helps you prepare a
                clear, factual draft for submission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Important Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-amber-400 mb-3 text-lg">
            Important to Know
          </h3>
          <ul className="text-sm text-blue-800 dark:text-gray-200 space-y-2">
            <li>• The assistant provides guidance but does not make final decisions.</li>
            <li>
              • Missing information does not automatically mean your complaint is invalid — official
              processes determine requirements.
            </li>
            <li>
              • Historical case examples are for reference only, not legal precedents guaranteed to
              apply to your situation.
            </li>
            <li>
              • Always verify official procedures and requirements through authorized AICTE channels.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
