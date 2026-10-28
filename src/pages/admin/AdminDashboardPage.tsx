import { useEffect, useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Building2,
  Archive,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingState } from '@/components/common/LoadingState';
import { Badge } from '@/components/ui/Badge';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { DEMO_BUREAUS } from '@/data/demoBureaus';
import { Complaint } from '@/types/complaint';
import { isOverdue } from '@/utils/dates';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function AdminDashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockComplaintService.getAll().then((data) => {
      setComplaints(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  // Calculate metrics
  const totalComplaints = complaints.length;
  const pending = complaints.filter((c) => c.status === 'received' || c.status === 'under_review')
    .length;
  const underProcess = complaints.filter((c) => c.status === 'under_process').length;
  const disposed = complaints.filter((c) => c.status === 'disposed').length;
  const overdue = complaints.filter(
    (c) => c.expectedDisposalAt && isOverdue(c.expectedDisposalAt)
  ).length;
  const escalated = complaints.filter((c) => c.status === 'escalated').length;
  const awaitingInfo = complaints.filter((c) => c.status === 'awaiting_information').length;
  const transferred = complaints.filter((c) => c.status === 'transferred').length;

  // Calculate average age
  const totalAge = complaints.reduce((sum, c) => {
    const age = Math.floor(
      (new Date().getTime() - new Date(c.receivedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return sum + age;
  }, 0);
  const averageAge = Math.round(totalAge / totalComplaints);

  // Bureau workload data
  const bureauWorkload = DEMO_BUREAUS.map((bureau) => {
    const bureauComplaints = complaints.filter((c) => c.assignedBureauId === bureau.id);
    const bureauOverdue = bureauComplaints.filter(
      (c) => c.expectedDisposalAt && isOverdue(c.expectedDisposalAt)
    ).length;
    return {
      name: bureau.code,
      total: bureauComplaints.length,
      pending: bureauComplaints.filter((c) => c.status !== 'disposed').length,
      overdue: bureauOverdue,
    };
  }).filter((b) => b.total > 0);

  // Status distribution
  const statusData = [
    { name: 'Disposed', value: disposed, color: '#10b981' },
    { name: 'Under Process', value: underProcess, color: '#f59e0b' },
    { name: 'Pending', value: pending, color: '#3b82f6' },
    { name: 'Escalated', value: escalated, color: '#ef4444' },
    { name: 'Awaiting Info', value: awaitingInfo, color: '#f97316' },
    { name: 'Transferred', value: transferred, color: '#8b5cf6' },
  ];

  // Monthly trend (simulated)
  const monthlyTrend = [
    { month: 'Jul', received: 3, disposed: 2 },
    { month: 'Aug', received: 4, disposed: 3 },
    { month: 'Sep', received: 5, disposed: 4 },
    { month: 'Oct', received: 8, disposed: 5 },
  ];

  // Region-wise distribution
  const regionCounts: Record<string, number> = {};
  complaints.forEach((c) => {
    regionCounts[c.submitterRegion] = (regionCounts[c.submitterRegion] || 0) + 1;
  });
  const regionData = Object.entries(regionCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 regions

  const stats = [
    {
      title: 'Total Complaints',
      value: totalComplaints,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      title: 'Pending Review',
      value: pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      change: '+5%',
      changeType: 'neutral' as const,
    },
    {
      title: 'Under Process',
      value: underProcess,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      change: '+8%',
      changeType: 'increase' as const,
    },
    {
      title: 'Disposed',
      value: disposed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      change: '+15%',
      changeType: 'increase' as const,
    },
    {
      title: 'Overdue Cases',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      change: '-3%',
      changeType: 'decrease' as const,
    },
    {
      title: 'Escalated',
      value: escalated,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      change: '0%',
      changeType: 'neutral' as const,
    },
    {
      title: 'Awaiting Information',
      value: awaitingInfo,
      icon: Archive,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      change: '+2',
      changeType: 'neutral' as const,
    },
    {
      title: 'Average Age (days)',
      value: averageAge,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950',
      change: '32 days',
      changeType: 'neutral' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
            Executive Dashboard
          </h1>
          <p className="text-foreground/70 mt-2">
            Consolidated view of complaint activity and metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <Badge
                    variant={
                      stat.changeType === 'increase'
                        ? 'green'
                        : stat.changeType === 'decrease'
                          ? 'red'
                          : 'default'
                    }
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Region Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Regions by Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="count" fill="#D4AF37" name="Complaints" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bureauWorkload}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="total" fill="#065F46" name="Cases" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bureau Workload - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Bureau Workload Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bureauWorkload}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Bar dataKey="total" fill="#065F46" name="Total Cases" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#D4AF37" name="Pending" radius={[4, 4, 0, 0]} />
                <Bar dataKey="overdue" fill="#ef4444" name="Overdue" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Complaint Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#065F46"
                  strokeWidth={2}
                  name="Received"
                  dot={{ fill: '#065F46' }}
                />
                <Line
                  type="monotone"
                  dataKey="disposed"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  name="Disposed"
                  dot={{ fill: '#D4AF37' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity with Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complaints
                .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
                .slice(0, 5)
                .map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{complaint.caseId}</div>
                          <div className="text-sm font-medium text-foreground/90 mt-1">
                            {complaint.subject}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {mockComplaintService.getInstitutionName(complaint.institutionId)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge variant="outline" className="mb-1">
                          {complaint.status.replace('_', ' ')}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {mockComplaintService.getBureauName(complaint.assignedBureauId)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pl-12">
                      <span>{complaint.submitterRegion}</span>
                      <span>•</span>
                      <span>{complaint.submitterEmail}</span>
                      <span>•</span>
                      <span>{complaint.submitterPhone}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
