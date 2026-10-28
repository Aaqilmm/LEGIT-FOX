import { FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { DemoModeAlert } from '@/components/common/DemoModeBadge';

export function StudentDashboardPage() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your complaints and draft submissions
        </p>
      </div>

      <DemoModeAlert />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Draft Complaints</CardTitle>
            <CardDescription>Work in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={FileText}
              title="No drafts yet"
              description="Start using the Complaint Checker to create your first draft"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Complaints</CardTitle>
            <CardDescription>Track your submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Clock}
              title="No submissions yet"
              description="Your submitted complaints will appear here"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <div className="font-medium">Use the Assistant</div>
                <p className="text-sm text-muted-foreground">
                  Get help understanding complaint categories and requirements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <div className="font-medium">Check Completeness</div>
                <p className="text-sm text-muted-foreground">
                  Use the Smart Checker to identify missing information
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <div className="font-medium">Prepare Your Draft</div>
                <p className="text-sm text-muted-foreground">
                  Review and refine your complaint before submission
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
