import { useEffect, useState } from 'react';
import { Building2, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { DEMO_BUREAUS } from '@/data/demoBureaus';
import { Complaint, RiskLevel } from '@/types/complaint';
import { Button } from '@/components/ui/Button';

export function BureauComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBureau, setSelectedBureau] = useState<string | null>(null);

  useEffect(() => {
    mockComplaintService.getAll().then((data) => {
      setComplaints(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingState message="Loading complaints..." />;
  }

  // Group complaints by bureau
  const bureauGroups = DEMO_BUREAUS.map((bureau) => {
    const bureauComplaints = complaints.filter((c) => c.assignedBureauId === bureau.id);

    // Risk analysis
    const riskCounts = {
      critical: bureauComplaints.filter((c) => c.riskLevel === 'critical').length,
      high: bureauComplaints.filter((c) => c.riskLevel === 'high').length,
      medium: bureauComplaints.filter((c) => c.riskLevel === 'medium').length,
      low: bureauComplaints.filter((c) => c.riskLevel === 'low').length,
    };

    const highRiskCount = riskCounts.critical + riskCounts.high;

    return {
      bureau,
      complaints: bureauComplaints,
      total: bureauComplaints.length,
      pending: bureauComplaints.filter((c) => c.status !== 'disposed').length,
      riskCounts,
      highRiskCount,
    };
  }).filter((group) => group.total > 0);

  const filteredComplaints = selectedBureau
    ? complaints.filter((c) => c.assignedBureauId === selectedBureau)
    : complaints;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
            Bureau-wise Complaints
          </h1>
          <p className="text-foreground/70 mt-2">
            Complaints segregated by bureau with risk level analysis
          </p>
        </div>

        {/* Bureau Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bureauGroups.map(({ bureau, total, pending, riskCounts, highRiskCount }) => (
            <Card
              key={bureau.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedBureau === bureau.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedBureau(selectedBureau === bureau.id ? null : bureau.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{bureau.code}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{bureau.displayName}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{total}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{pending}</div>
                    <div className="text-xs text-muted-foreground mt-1">Pending</div>
                  </div>
                </div>

                {/* Risk Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Risk Analysis</span>
                    {highRiskCount > 0 && (
                      <Badge variant="red" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {highRiskCount} High Risk
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <div className="text-sm font-bold text-red-600">{riskCounts.critical}</div>
                      <div className="text-xs text-muted-foreground">Critical</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <div className="text-sm font-bold text-orange-600">{riskCounts.high}</div>
                      <div className="text-xs text-muted-foreground">High</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <div className="text-sm font-bold text-yellow-600">{riskCounts.medium}</div>
                      <div className="text-xs text-muted-foreground">Medium</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <div className="text-sm font-bold text-green-600">{riskCounts.low}</div>
                      <div className="text-xs text-muted-foreground">Low</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Reset */}
        {selectedBureau && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing complaints for{' '}
              <span className="font-medium text-foreground">
                {DEMO_BUREAUS.find((b) => b.id === selectedBureau)?.displayName}
              </span>
            </p>
            <Button variant="outline" size="sm" onClick={() => setSelectedBureau(null)}>
              Show All
            </Button>
          </div>
        )}

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedBureau ? 'Bureau Complaints' : 'All Complaints'} ({filteredComplaints.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredComplaints
                .sort((a, b) => {
                  // Sort by risk level first (critical > high > medium > low)
                  const riskOrder: Record<RiskLevel, number> = {
                    critical: 0,
                    high: 1,
                    medium: 2,
                    low: 3,
                  };
                  return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
                })
                .map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{complaint.caseId}</span>
                            <StatusBadge status={complaint.status} />
                            <RiskBadge level={complaint.riskLevel} />
                          </div>
                          <p className="text-sm font-medium text-foreground/90 mt-1">
                            {complaint.subject}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {mockComplaintService.getInstitutionName(complaint.institutionId)}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <Badge variant="outline" className="mb-1">
                            {mockComplaintService.getBureauName(complaint.assignedBureauId)}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            {complaint.submitterRegion}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2">{complaint.originalDescription}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Category: {complaint.category.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>
                          Received: {new Date(complaint.receivedAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{complaint.submitterEmail}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {filteredComplaints.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No complaints found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
