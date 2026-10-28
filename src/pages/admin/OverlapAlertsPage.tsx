import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Building2, Users, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { Complaint } from '@/types/complaint';

interface OverlapAlert {
  institutionId: string;
  institutionName: string;
  overlappingCases: Complaint[];
  commonCategory: string;
  severity: 'critical' | 'high' | 'medium';
  region: string;
}

export function OverlapAlertsPage() {
  const [alerts, setAlerts] = useState<OverlapAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockComplaintService.getAll().then((cases) => {
      // Group cases by institution and category
      const institutionCategoryMap: Record<string, Record<string, Complaint[]>> = {};

      cases.forEach(c => {
        if (c.status !== 'disposed' && c.institutionId && c.category) {
          if (!institutionCategoryMap[c.institutionId]) {
            institutionCategoryMap[c.institutionId] = {};
          }
          if (!institutionCategoryMap[c.institutionId]![c.category]) {
            institutionCategoryMap[c.institutionId]![c.category] = [];
          }
          institutionCategoryMap[c.institutionId]![c.category]!.push(c);
        }
      });

      // Find overlaps (2+ active cases in same institution + category)
      const foundAlerts: OverlapAlert[] = [];

      Object.entries(institutionCategoryMap).forEach(([institutionId, categoryMap]) => {
        Object.entries(categoryMap).forEach(([category, casesInCategory]) => {
          if (casesInCategory.length >= 2) {
            const severity: 'critical' | 'high' | 'medium' =
              casesInCategory.length >= 4 ? 'critical' :
              casesInCategory.length >= 3 ? 'high' : 'medium';

            foundAlerts.push({
              institutionId,
              institutionName: mockComplaintService.getInstitutionName(institutionId),
              overlappingCases: casesInCategory.sort((a, b) =>
                new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
              ),
              commonCategory: category,
              severity,
              region: casesInCategory[0].submitterRegion,
            });
          }
        });
      });

      // Sort by severity and number of cases
      foundAlerts.sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return b.overlappingCases.length - a.overlappingCases.length;
      });

      setAlerts(foundAlerts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingState message="Analyzing overlap patterns..." />;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/50' };
      case 'high': return { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/50' };
      case 'medium': return { bg: 'bg-yellow-500/20', text: 'text-yellow-500', border: 'border-yellow-500/50' };
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-500', border: 'border-gray-500/50' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto py-6 px-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
            PATTERN DETECTION
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Overlap Alerts</h1>
              <p className="text-muted-foreground">
                Institutions with multiple active cases in the same category — potential systemic issues
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground/70">Total Alerts</p>
              <p className="text-3xl font-bold text-accent">{alerts.length}</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-card border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Critical</p>
                  <p className="text-2xl font-bold text-foreground">
                    {alerts.filter(a => a.severity === 'critical').length}
                  </p>
                  <p className="text-xs text-red-500">4+ cases per institution</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">High</p>
                  <p className="text-2xl font-bold text-foreground">
                    {alerts.filter(a => a.severity === 'high').length}
                  </p>
                  <p className="text-xs text-orange-500">3 cases per institution</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">Medium</p>
                  <p className="text-2xl font-bold text-foreground">
                    {alerts.filter(a => a.severity === 'medium').length}
                  </p>
                  <p className="text-xs text-yellow-500">2 cases per institution</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Overlap Alerts</h3>
                <p className="text-muted-foreground">
                  No institutions currently have multiple active cases in the same category
                </p>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert, idx) => {
              const colors = getSeverityColor(alert.severity);
              return (
                <Card key={idx} className={`bg-card border-2 ${colors.border}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="default" className={`${colors.bg} ${colors.text} border-none uppercase text-xs font-semibold`}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            {alert.overlappingCases.length} cases
                          </Badge>
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            {alert.region}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-foreground mb-1">
                          {alert.institutionName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Common Issue: <span className="text-accent font-medium">
                            {alert.commonCategory.replace(/_/g, ' ')}
                          </span>
                        </p>
                      </div>
                      <AlertTriangle className={`h-6 w-6 ${colors.text}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">
                        Overlapping Cases:
                      </p>
                      {alert.overlappingCases.map((caseItem) => (
                        <Link
                          key={caseItem.id}
                          to={`/admin/cases/${caseItem.id}`}
                          className="flex items-start justify-between p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm text-accent">
                                {caseItem.caseId}
                              </span>
                              <Badge
                                variant={
                                  caseItem.status === 'disposed' ? 'green' :
                                  caseItem.status === 'escalated' ? 'red' :
                                  caseItem.status === 'under_process' ? 'blue' :
                                  'default'
                                }
                                className="text-xs"
                              >
                                {caseItem.status.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground line-clamp-1 mb-1">
                              {caseItem.subject}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(caseItem.receivedAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {caseItem.submitterEmail}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground/70 group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
