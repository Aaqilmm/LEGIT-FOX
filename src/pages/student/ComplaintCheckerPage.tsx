import { useState } from 'react';
import { CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { FoxMascot } from '@/components/branding/FoxMascot';
import { DemoModeAlert } from '@/components/common/DemoModeBadge';

export function ComplaintCheckerPage() {
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(true);
  };

  const checklistItems = [
    {
      label: 'Institution Identity',
      status: description.length > 20 ? 'complete' : 'needed',
      explanation: 'Clear identification of the institution helps route the complaint correctly',
    },
    {
      label: 'Issue Description',
      status: description.length > 50 ? 'complete' : 'needed',
      explanation: 'A detailed description helps officials understand the nature of the complaint',
    },
    {
      label: 'Timeline of Events',
      status: 'needed',
      explanation: 'When did the issue occur? Timeline helps establish sequence of events',
    },
    {
      label: 'Supporting Evidence',
      status: 'optional',
      explanation: 'Documents or references that support your complaint (optional but helpful)',
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
          Smart Complaint Checker
        </h1>
        <p className="text-foreground/70 mt-2">
          Check if your complaint has the necessary information
        </p>
      </div>

      <DemoModeAlert />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FoxMascot variant="assistance" size="sm" />
              <div>
                <CardTitle>Describe Your Issue</CardTitle>
                <CardDescription>
                  Explain your complaint in detail. The more information you provide, the better we
                  can help
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Complaint Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: My college is keeping my original certificates even though I have completed all requirements and have no pending dues. I graduated 6 months ago..."
                rows={6}
                className="mt-2"
              />
            </div>
            <Button onClick={handleCheck} disabled={description.length < 20}>
              Check Completeness
            </Button>
          </CardContent>
        </Card>

        {checked && (
          <Card>
            <CardHeader>
              <CardTitle>Completeness Check</CardTitle>
              <CardDescription>
                Review what information is present and what might be helpful to add
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                    {item.status === 'complete' && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {item.status === 'needed' && (
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    {item.status === 'optional' && (
                      <Circle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.label}</span>
                        <Badge
                          variant={
                            item.status === 'complete'
                              ? 'green'
                              : item.status === 'needed'
                                ? 'orange'
                                : 'blue'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-gray-200">
                  <strong className="text-blue-900 dark:text-amber-400">Remember:</strong> Missing information does not mean your complaint will
                  be automatically rejected. The official process determines what is required. This
                  checker helps you prepare a more complete submission.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
