import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/common/LoadingState';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { DEMO_BUREAUS } from '@/data/demoBureaus';
import { Complaint } from '@/types/complaint';
import { isOverdue, formatTimeAgo } from '@/utils/dates';

export function OverviewPage() {
  const [cases, setCases] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockComplaintService.getAll().then((data) => {
      setCases(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingState message="Loading overview..." />;
  }

  // Calculate KPIs
  const activeCases = cases.filter(c => c.status !== 'disposed').length;
  const awaitingAction = cases.filter(c =>
    c.status === 'received' ||
    c.status === 'awaiting_information' ||
    c.status === 'under_review'
  ).length;
  const overdueCases = cases.filter(c =>
    c.expectedDisposalAt && isOverdue(c.expectedDisposalAt)
  ).length;
  const highPriorityCases = cases.filter(c =>
    (c.riskLevel === 'critical' || c.riskLevel === 'high') &&
    c.status !== 'disposed'
  ).length;

  // Recent cases (last 5)
  const recentCases = cases
    .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
    .slice(0, 5);

  // Needs attention items
  const needsAttention = [
    ...cases.filter(c => c.expectedDisposalAt && isOverdue(c.expectedDisposalAt)).slice(0, 3),
    ...cases.filter(c => (c.riskLevel === 'critical' || c.riskLevel === 'high') && c.status !== 'disposed').slice(0, 3),
  ].slice(0, 5);

  // Bureau workload
  const bureauWorkload = DEMO_BUREAUS.map(bureau => {
    const bureauCases = cases.filter(c => c.assignedBureauId === bureau.id);
    const active = bureauCases.filter(c => c.status !== 'disposed').length;
    return {
      code: bureau.code,
      displayName: bureau.displayName.replace(' — demo', ''),
      total: bureauCases.length,
      active,
      percentage: bureauCases.length > 0 ? (active / bureauCases.length) * 100 : 0,
    };
  }).filter(b => b.total > 0);

  // Monthly case statistics (last 4 months)
  const now = new Date();
  const monthlyStats = Array.from({ length: 4 }, (_, i) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const closedInMonth = cases.filter(c => {
      const disposedDate = c.status === 'disposed' ? new Date(c.lastActionAt) : null;
      return disposedDate && disposedDate >= monthStart && disposedDate <= monthEnd;
    }).length;

    const receivedInMonth = cases.filter(c => {
      const receivedDate = new Date(c.receivedAt);
      return receivedDate >= monthStart && receivedDate <= monthEnd;
    }).length;

    return {
      month: month.toLocaleDateString('en-US', { month: 'short' }),
      closed: closedInMonth,
      received: receivedInMonth,
    };
  });

  const maxValue = Math.max(...monthlyStats.map(m => Math.max(m.closed, m.received)), 1);

  // Overlap alerts (institutions with multiple cases in same category)
  const institutionCategoryMap: Record<string, Record<string, number>> = {};
  cases.forEach(c => {
    if (c.status !== 'disposed' && c.institutionId && c.category) {
      if (!institutionCategoryMap[c.institutionId]) {
        institutionCategoryMap[c.institutionId] = {};
      }
      if (!institutionCategoryMap[c.institutionId][c.category]) {
        institutionCategoryMap[c.institutionId][c.category] = 0;
      }
      institutionCategoryMap[c.institutionId][c.category]++;
    }
  });

  const overlapAlerts = Object.entries(institutionCategoryMap)
    .flatMap(([institutionId, categoryMap]) =>
      Object.entries(categoryMap)
        .filter(([_, count]) => count >= 2)
        .map(([category, count]) => ({
          institutionId,
          institutionName: mockComplaintService.getInstitutionName(institutionId),
          category: category.replace(/_/g, ' '),
          count,
          severity: count >= 4 ? 'critical' : count >= 3 ? 'high' : 'medium',
        }))
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto py-6 px-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
            COMMAND CENTRE
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Overview</h1>
              <p className="text-muted-foreground">
                Monitor case activity, deadlines, institutional issues, and cross-bureau coordination
              </p>
            </div>
            <Link to="/admin/cases">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
                <FileText className="mr-2 h-4 w-4" />
                Open Case Register
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                    Active Cases
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">{activeCases}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Cases not yet disposed
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/20">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                    Awaiting Action
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">{awaitingAction}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Pending review or info
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/20">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                    Overdue Cases
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">{overdueCases}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Past expected disposal
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
                    High Priority
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">{highPriorityCases}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Critical & high risk
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/20">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Main Content - Left Side */}
          <div className="space-y-6">
            {/* Recent Cases */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base text-foreground">Recent Cases</CardTitle>
                <Link to="/admin/cases">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCases.map(caseItem => (
                    <Link
                      key={caseItem.id}
                      to={`/admin/cases/${caseItem.id}`}
                      className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-accent">
                              {caseItem.caseId}
                            </span>
                            <StatusBadge status={caseItem.status} />
                            <RiskBadge level={caseItem.riskLevel} />
                          </div>
                          <p className="text-sm text-foreground line-clamp-1 mb-1">
                            {caseItem.subject}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {mockComplaintService.getInstitutionName(caseItem.institutionId)} · {caseItem.submitterRegion}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground/70 flex-shrink-0">
                          {formatTimeAgo(caseItem.receivedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bureau Workload */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground">Bureau Workload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bureauWorkload.map(bureau => (
                    <div key={bureau.code}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{bureau.code}</span>
                        <span className="text-xs text-muted-foreground/70">
                          {bureau.active} active of {bureau.total} total
                        </span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${Math.min(100, bureau.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charts Side by Side */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Case Activity Chart */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground">Case Activity (Last 4 Months)</CardTitle>
                  <p className="text-xs text-muted-foreground/70 mt-1">Monthly received and closed cases</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monthlyStats.map((stat, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">{stat.month}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground/70">
                              R: <span className="text-foreground font-medium">{stat.received}</span>
                            </span>
                            <span className="text-muted-foreground/70">
                              C: <span className="text-accent font-medium">{stat.closed}</span>
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-6 bg-background rounded overflow-hidden flex items-end">
                            <div
                              className="w-full bg-gradient-to-t from-primary to-primary/80 transition-all"
                              style={{ height: `${(stat.received / maxValue) * 100}%`, minHeight: stat.received > 0 ? '4px' : '0' }}
                            />
                          </div>
                          <div className="h-6 bg-background rounded overflow-hidden flex items-end">
                            <div
                              className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F4E5B5] transition-all"
                              style={{ height: `${(stat.closed / maxValue) * 100}%`, minHeight: stat.closed > 0 ? '4px' : '0' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground/70 mb-1">Total Received</p>
                      <p className="text-lg font-bold text-foreground">
                        {monthlyStats.reduce((sum, m) => sum + m.received, 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/70 mb-1">Total Closed</p>
                      <p className="text-lg font-bold text-accent">
                        {monthlyStats.reduce((sum, m) => sum + m.closed, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Statistics */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground">Case Statistics</CardTitle>
                  <p className="text-xs text-muted-foreground/70 mt-1">Current status distribution</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { status: 'disposed', label: 'Disposed', color: '#065F46', count: cases.filter(c => c.status === 'disposed').length },
                      { status: 'under_process', label: 'Under Process', color: '#D97706', count: cases.filter(c => c.status === 'under_process').length },
                      { status: 'under_review', label: 'Under Review', color: '#2563EB', count: cases.filter(c => c.status === 'under_review').length },
                      { status: 'received', label: 'Received', color: '#71877C', count: cases.filter(c => c.status === 'received').length },
                      { status: 'escalated', label: 'Escalated', color: '#DC2626', count: cases.filter(c => c.status === 'escalated').length },
                      { status: 'awaiting_information', label: 'Awaiting Info', color: '#7C3AED', count: cases.filter(c => c.status === 'awaiting_information').length },
                    ].map((item) => {
                      const percentage = cases.length > 0 ? (item.count / cases.length) * 100 : 0;
                      return (
                        <div key={item.status}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-foreground">{item.label}</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">{item.count}</span>
                          </div>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color,
                                minWidth: item.count > 0 ? '2px' : '0'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground/70 mb-1">Resolution Rate</p>
                    <p className="text-lg font-bold text-accent">
                      {cases.length > 0 ? Math.round((cases.filter(c => c.status === 'disposed').length / cases.length) * 100) : 0}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Needs Attention */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground">Needs Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {needsAttention.length === 0 ? (
                    <div className="text-center py-6">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-sm text-muted-foreground/70">All cases on track</p>
                    </div>
                  ) : (
                    needsAttention.map(caseItem => {
                      const isOverdueCase = caseItem.expectedDisposalAt && isOverdue(caseItem.expectedDisposalAt);
                      return (
                        <Link
                          key={caseItem.id}
                          to={`/admin/cases/${caseItem.id}`}
                          className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-accent/10 transition-colors"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            {isOverdueCase ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground mb-1">
                                {isOverdueCase ? 'Overdue' : 'High Priority'}
                              </p>
                              <p className="text-xs text-muted-foreground/70 line-clamp-2">
                                {caseItem.subject}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-accent">
                            {caseItem.caseId}
                          </span>
                        </Link>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Latest Activity */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground">Latest Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cases
                    .sort((a, b) => new Date(b.lastActionAt).getTime() - new Date(a.lastActionAt).getTime())
                    .slice(0, 5)
                    .map(caseItem => (
                      <div key={caseItem.id} className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground line-clamp-1">
                            {caseItem.subject}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">
                            {formatTimeAgo(caseItem.lastActionAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Overlap Alerts Preview */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base text-foreground">Overlap Alerts</CardTitle>
                <Link to="/admin/overlap-alerts">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-7 text-xs">
                    View All
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {overlapAlerts.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="h-6 w-6 mx-auto text-primary mb-2" />
                      <p className="text-xs text-muted-foreground/70">No overlaps detected</p>
                    </div>
                  ) : (
                    overlapAlerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          <AlertTriangle
                            className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                              alert.severity === 'critical' ? 'text-red-500' :
                              alert.severity === 'high' ? 'text-orange-500' :
                              'text-yellow-500'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground line-clamp-1">
                              {alert.institutionName}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5">
                              {alert.count} cases · {alert.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {overlapAlerts.length > 0 && (
                  <Link to="/admin/overlap-alerts">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 border-border text-accent hover:bg-accent/10 hover:text-accent hover:border-accent"
                    >
                      <Building2 className="mr-2 h-3.5 w-3.5" />
                      View All {overlapAlerts.length}+ Alerts
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
