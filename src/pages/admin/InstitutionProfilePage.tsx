import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { mockInstitutionService } from '@/services/institutions/mockInstitutionService';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { Institution } from '@/types/institution';
import { Complaint } from '@/types/complaint';
import { formatDate } from '@/utils/dates';

export function InstitutionProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      mockInstitutionService.getById(id),
      mockComplaintService.getByInstitutionId(id),
    ]).then(([inst, comps]) => {
      setInstitution(inst);
      setComplaints(comps);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading institution profile..." />;
  }

  if (!institution) {
    return <ErrorState title="Institution not found" message="The requested institution could not be found" />;
  }

  const activeComplaints = complaints.filter((c) => c.status !== 'disposed');
  const disposedComplaints = complaints.filter((c) => c.status === 'disposed');

  return (
    <div className="container max-w-7xl mx-auto py-8 px-6 space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/admin/institutions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Institution Profile</h1>
      </div>

      {/* Institution Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{institution.name}</CardTitle>
              <p className="text-muted-foreground mt-2">{institution.aictePermanentId}</p>
            </div>
            <Badge
              variant={
                institution.status === 'active'
                  ? 'green'
                  : institution.status === 'inactive'
                    ? 'default'
                    : 'yellow'
              }
            >
              {institution.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Region</div>
              <div className="mt-1">{institution.region}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">State</div>
              <div className="mt-1">{institution.state}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Address</div>
              <div className="mt-1">{institution.addressSummary}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Type</div>
              <div className="mt-1">{institution.institutionType}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaint History */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{complaints.length}</div>
              <div className="text-sm text-muted-foreground">Total Complaints</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{activeComplaints.length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{disposedComplaints.length}</div>
              <div className="text-sm text-muted-foreground">Disposed</div>
            </div>
          </div>

          <div className="space-y-3">
            {complaints.map((complaint) => (
              <Link
                key={complaint.id}
                to={`/admin/complaints/${complaint.id}`}
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold">{complaint.caseId}</div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {complaint.originalDescription}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{complaint.category.replace('_', ' ')}</Badge>
                        <Badge variant="outline">
                          {mockComplaintService.getBureauName(complaint.assignedBureauId)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(complaint.receivedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
