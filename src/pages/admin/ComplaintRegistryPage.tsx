import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { Complaint } from '@/types/complaint';
import { formatDate, formatTimeAgo } from '@/utils/dates';

export function ComplaintRegistryPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    mockComplaintService.getAll().then((data) => {
      const sorted = data.sort(
        (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
      );
      setComplaints(sorted);
      setFilteredComplaints(sorted);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredComplaints(complaints);
    } else {
      const filtered = complaints.filter(
        (complaint) =>
          complaint.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          complaint.originalDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mockComplaintService
            .getInstitutionName(complaint.institutionId)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredComplaints(filtered);
    }
  }, [searchQuery, complaints]);

  if (loading) {
    return <LoadingState message="Loading complaints..." />;
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complaint Registry</h1>
        <p className="text-muted-foreground mt-2">
          Search and manage all complaint cases
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by case ID, institution, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <Link
                key={complaint.id}
                to={`/admin/complaints/${complaint.id}`}
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{complaint.caseId}</span>
                        <StatusBadge status={complaint.status} />
                        <RiskBadge level={complaint.riskLevel} />
                      </div>
                      <div className="text-sm font-medium text-foreground/90 mt-1">
                        {complaint.subject}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {mockComplaintService.getInstitutionName(complaint.institutionId)} • {complaint.submitterRegion}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {complaint.originalDescription}
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline">{complaint.category.replace('_', ' ')}</Badge>
                        <Badge variant="outline">
                          {mockComplaintService.getBureauName(complaint.assignedBureauId)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Received {formatTimeAgo(complaint.receivedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground flex-shrink-0">
                    <div>{formatDate(complaint.receivedAt)}</div>
                    {complaint.expectedDisposalAt && (
                      <div className="mt-1 text-xs">
                        Due: {formatDate(complaint.expectedDisposalAt)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
