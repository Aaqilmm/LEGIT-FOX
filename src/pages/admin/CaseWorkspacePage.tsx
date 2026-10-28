import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { Complaint } from '@/types/complaint';

export function CaseWorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      mockComplaintService.getById(id).then((data) => {
        setCaseData(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading case details..." />;
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Case Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested case could not be found.</p>
          <Link to="/admin/cases">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
              Return to Case Register
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto py-6 px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/admin/cases">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Register
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
            CASE WORKSPACE
          </p>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-medium text-muted-foreground">
                  {caseData.caseId}
                </span>
                <RiskBadge level={caseData.riskLevel} />
                <Badge variant="outline" className="border-border text-muted-foreground">
                  {mockComplaintService.getBureauName(caseData.assignedBureauId)}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{caseData.subject}</h1>
              <p className="text-muted-foreground">
                {mockComplaintService.getInstitutionName(caseData.institutionId)} · {caseData.category.replace(/_/g, ' ')} ·
                Submitted {new Date(caseData.receivedAt).toLocaleDateString()}
              </p>
            </div>
            <StatusBadge status={caseData.status} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Details */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-foreground">Case Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Reference Number
                    </p>
                    <p className="font-mono text-sm text-foreground">{caseData.caseId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Institution
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {mockComplaintService.getInstitutionName(caseData.institutionId)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Category
                    </p>
                    <p className="text-sm text-foreground">{caseData.category.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Assigned Bureau
                    </p>
                    <p className="text-sm text-foreground">
                      {mockComplaintService.getBureauName(caseData.assignedBureauId)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Region
                    </p>
                    <p className="text-sm text-foreground">{caseData.submitterRegion}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Priority
                    </p>
                    <RiskBadge level={caseData.riskLevel} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Submitted
                    </p>
                    <p className="text-sm text-foreground">
                      {new Date(caseData.receivedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                      Expected Disposal
                    </p>
                    <p className="text-sm text-foreground">
                      {caseData.expectedDisposalAt
                        ? new Date(caseData.expectedDisposalAt).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-3">
                    DESCRIPTION
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {caseData.originalDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Case History */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">Case History</CardTitle>
                  <span className="text-sm text-muted-foreground/70">1 event</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm text-foreground">Case received</p>
                        <span className="text-xs text-muted-foreground/70">
                          {new Date(caseData.receivedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Case submitted by {caseData.submitterEmail}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {new Date(caseData.receivedAt).toLocaleString()} · Citizen
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submitter Information */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-foreground">Submitter Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                    Email
                  </p>
                  <p className="text-sm text-foreground">{caseData.submitterEmail}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                    Phone
                  </p>
                  <p className="text-sm text-foreground">{caseData.submitterPhone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1.5">
                    Region
                  </p>
                  <p className="text-sm text-foreground">{caseData.submitterRegion}</p>
                </div>
              </CardContent>
            </Card>

            {/* Institution Context */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-foreground">Institution Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground mb-0.5">
                      {mockComplaintService.getInstitutionName(caseData.institutionId)}
                    </p>
                    <p className="text-xs text-muted-foreground/70">{caseData.submitterRegion}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground/70">Other cases</span>
                    <span className="font-medium text-foreground">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground/70">Open alerts</span>
                    <span className="font-medium text-foreground">No</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
