import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockInstitutionService } from '@/services/institutions/mockInstitutionService';
import { Institution } from '@/types/institution';

export function InstitutionDirectoryPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    mockInstitutionService.getAll().then((data) => {
      setInstitutions(data);
      setFilteredInstitutions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredInstitutions(institutions);
    } else {
      const filtered = institutions.filter(
        (inst) =>
          inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inst.aictePermanentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inst.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInstitutions(filtered);
    }
  }, [searchQuery, institutions]);

  if (loading) {
    return <LoadingState message="Loading institutions..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto py-6 px-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
            INSTITUTIONAL OVERSIGHT
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Institution Directory</h1>
              <p className="text-muted-foreground">
                Search and view registered institutions across India
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              <Input
                placeholder="Search by name, AICTE ID, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="text-sm text-muted-foreground/70 flex items-center">
              {filteredInstitutions.length} institutions
            </div>
          </div>
        </div>

        {/* Institutions Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Institution Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    AICTE ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#214438]">
                {filteredInstitutions.map((institution) => (
                  <tr
                    key={institution.id}
                    className="hover:bg-accent/10 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/institutions/${institution.id}`}
                        className="text-sm font-medium text-foreground hover:text-accent line-clamp-1"
                      >
                        {institution.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-muted-foreground">
                        {institution.aictePermanentId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-foreground">{institution.state}</p>
                        <p className="text-xs text-muted-foreground/70">{institution.region}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {institution.institutionType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={institution.status === 'active' ? 'green' : 'default'}
                        className="border-border"
                      >
                        {institution.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/institutions/${institution.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground/70 mb-4" />
              <p className="text-muted-foreground/70">No institutions match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
