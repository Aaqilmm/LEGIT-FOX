import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { Complaint } from '@/types/complaint';

export function TrackCasePage() {
  const [caseId, setCaseId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!caseId.trim()) {
      setError('Please enter a case ID');
      return;
    }

    setSearching(true);
    setError('');
    setComplaint(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const allComplaints = await mockComplaintService.getAll();
      const found = allComplaints.find(
        (c) => c.caseId.toLowerCase() === caseId.trim().toLowerCase()
      );

      if (found) {
        setComplaint(found);
      } else {
        setError('Case ID not found. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'disposed') return CheckCircle2;
    if (status === 'escalated') return AlertCircle;
    return Clock;
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      draft: 'Your complaint is in draft status',
      received: 'Your complaint has been received and is awaiting review',
      under_review: 'Your complaint is being reviewed by our team',
      under_process: 'Your complaint is being actively processed',
      awaiting_information: 'We need additional information from you',
      coordination_required: 'Coordinating with relevant departments',
      escalated: 'Your complaint has been escalated to senior officials',
      transferred: 'Your complaint has been transferred to another bureau',
      disposed: 'Your complaint has been resolved',
    };
    return messages[status] || 'Processing your complaint';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div className="container max-w-4xl mx-auto py-8 px-6 space-y-6">
        {/* Back Button */}
        <Link to="/student">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
            Track Your Case
          </h1>
          <p className="text-foreground/70 mt-2">
            Enter your case ID to check the status of your complaint
          </p>
        </div>

        {/* Search Card */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Enter Case ID</CardTitle>
            <CardDescription>
              Your case ID was provided when you submitted your complaint (e.g., CASE-2024-001)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="caseId">Case ID</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="caseId"
                  value={caseId}
                  onChange={(e) => {
                    setCaseId(e.target.value);
                    setError('');
                  }}
                  placeholder="CASE-2024-001"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={searching}>
                  <Search className="mr-2 h-4 w-4" />
                  {searching ? 'Searching...' : 'Track'}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-300">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {complaint && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{complaint.caseId}</CardTitle>
                    <CardDescription className="text-base">{complaint.subject}</CardDescription>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  {(() => {
                    const Icon = getStatusIcon(complaint.status);
                    return <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />;
                  })()}
                  <div className="flex-1">
                    <p className="font-medium">{getStatusMessage(complaint.status)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated: {new Date(complaint.lastActionAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{complaint.category.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <RiskBadge level={complaint.riskLevel} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium">{complaint.submitterRegion}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Institution</p>
                      <p className="font-medium">
                        {mockComplaintService.getInstitutionName(complaint.institutionId)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Bureau</p>
                      <Badge variant="outline">
                        {mockComplaintService.getBureauName(complaint.assignedBureauId)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted On</p>
                      <p className="font-medium">
                        {new Date(complaint.receivedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {complaint.expectedDisposalAt && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-900 dark:text-blue-300">
                      <strong>Expected Resolution:</strong>{' '}
                      {new Date(complaint.expectedDisposalAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Complaint Details */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm leading-relaxed">{complaint.originalDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Email</p>
                    <p className="font-medium text-sm">{complaint.submitterEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Phone</p>
                    <p className="font-medium text-sm">{complaint.submitterPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      Your complaint is being handled by the{' '}
                      <strong>{mockComplaintService.getBureauName(complaint.assignedBureauId)}</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      You will be contacted at your registered email/phone if additional information is
                      needed
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Keep checking this page with your Case ID for status updates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      For urgent queries, you can use the Legit Fox chatbot (🦊 in the bottom-right corner)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        {!complaint && !error && (
          <Card className="bg-muted/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Your Case ID is provided immediately after submitting a complaint. Check your email or the
                  confirmation screen.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Case IDs follow the format: CASE-YYYY-XXX (e.g., CASE-2024-001)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Use the Legit Fox chatbot for any questions about tracking your case
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
