import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RiskBadge } from '@/components/common/RiskBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { mockComplaintService } from '@/services/complaints/mockComplaintService';
import { DEMO_BUREAUS } from '@/data/demoBureaus';
import { Complaint } from '@/types/complaint';
import { formatDate, isOverdue } from '@/utils/dates';

export function CaseRegisterPage() {
  const [cases, setCases] = useState<Complaint[]>([]);
  const [filteredCases, setFilteredCases] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBureau, setSelectedBureau] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    mockComplaintService.getAll().then((data) => {
      const sorted = data.sort(
        (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
      );
      setCases(sorted);
      setFilteredCases(sorted);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = [...cases];

    // Bureau filter
    if (selectedBureau !== 'all') {
      filtered = filtered.filter(c => c.assignedBureauId === selectedBureau);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    // Priority/Risk filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(c => c.riskLevel === selectedPriority);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Overdue filter
    if (showOverdueOnly) {
      filtered = filtered.filter(c => c.expectedDisposalAt && isOverdue(c.expectedDisposalAt));
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.caseId.toLowerCase().includes(query) ||
        c.subject.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.submitterRegion.toLowerCase().includes(query) ||
        mockComplaintService.getInstitutionName(c.institutionId).toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortBy === 'priority') {
      const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      filtered.sort((a, b) => priorityOrder[a.riskLevel] - priorityOrder[b.riskLevel]);
    } else {
      filtered.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
    }

    setFilteredCases(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cases, selectedBureau, selectedStatus, selectedPriority, selectedCategory, showOverdueOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBureau('all');
    setSelectedStatus('all');
    setSelectedPriority('all');
    setSelectedCategory('all');
    setShowOverdueOnly(false);
    setSortBy('date');
  };

  const exportToExcel = () => {
    // Create CSV content
    const headers = ['Case ID', 'Institution', 'Category', 'Bureau', 'Priority', 'Status', 'Region', 'Submitted Date', 'Due Date', 'Subject', 'Description', 'Submitter Email', 'Submitter Phone'];
    const rows = filteredCases.map(c => [
      c.caseId,
      mockComplaintService.getInstitutionName(c.institutionId),
      c.category.replace(/_/g, ' '),
      mockComplaintService.getBureauName(c.assignedBureauId),
      c.riskLevel,
      c.status,
      c.submitterRegion,
      formatDate(c.receivedAt),
      c.expectedDisposalAt ? formatDate(c.expectedDisposalAt) : 'N/A',
      c.subject,
      c.originalDescription,
      c.submitterEmail,
      c.submitterPhone
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `AICTE_Cases_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, endIndex);

  // Get unique categories from cases
  const categories = Array.from(new Set(cases.map(c => c.category)));

  if (loading) {
    return <LoadingState message="Loading case register..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto py-6 px-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">
            CASE MANAGEMENT
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Case Register</h1>
              <p className="text-muted-foreground">
                Search, filter, prioritize, and manage institution-related cases across bureaus
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={exportToExcel}
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-none"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              <Input
                placeholder="Search cases, institutions, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/70"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
                className="px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground hover:border-accent focus:border-accent focus:outline-none transition-colors cursor-pointer"
              >
                <option value="date">Recent First</option>
                <option value="priority">By Priority</option>
              </select>
            </div>

            <div className="h-6 w-px bg-[#214438]"></div>

            {/* Bureau Filter - PRIMARY FILTER */}
            <select
              value={selectedBureau}
              onChange={(e) => setSelectedBureau(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground hover:border-accent focus:border-accent focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Bureaus</option>
              {DEMO_BUREAUS.filter(b => b.active).map(bureau => (
                <option key={bureau.id} value={bureau.id}>
                  {bureau.code}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground hover:border-accent focus:border-accent focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="received">Received</option>
              <option value="under_review">Under Review</option>
              <option value="under_process">Under Process</option>
              <option value="escalated">Escalated</option>
              <option value="disposed">Disposed</option>
              <option value="awaiting_information">Awaiting Information</option>
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground hover:border-accent focus:border-accent focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground hover:border-accent focus:border-accent focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, ' ')}
                </option>
              ))}
            </select>

            {/* Overdue Toggle */}
            <label className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border-2 border-border bg-card text-foreground cursor-pointer hover:border-accent transition-colors">
              <input
                type="checkbox"
                checked={showOverdueOnly}
                onChange={(e) => setShowOverdueOnly(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-background text-accent focus:ring-[#D4AF37] focus:ring-offset-0 cursor-pointer"
              />
              <span>Overdue Only</span>
            </label>

            {/* Reset Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            {/* Results Count */}
            <div className="ml-auto text-sm font-medium text-accent">
              {filteredCases.length} {filteredCases.length === 1 ? 'case' : 'cases'}
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Case Reference
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Bureau
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#214438]">
                {paginatedCases.map((caseItem) => {
                  const isOverdueCase = caseItem.expectedDisposalAt && isOverdue(caseItem.expectedDisposalAt);

                  return (
                    <tr
                      key={caseItem.id}
                      className="hover:bg-accent/10 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/cases/${caseItem.id}`}
                          className="font-mono text-sm font-medium text-accent hover:text-[#F4E5B5]"
                        >
                          {caseItem.caseId}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {mockComplaintService.getInstitutionName(caseItem.institutionId)}
                          </p>
                          <p className="text-xs text-muted-foreground/70">{caseItem.submitterRegion}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {caseItem.category.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {mockComplaintService.getBureauName(caseItem.assignedBureauId)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <RiskBadge level={caseItem.riskLevel} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={caseItem.status} />
                      </td>
                      <td className="px-4 py-3">
                        {caseItem.expectedDisposalAt ? (
                          <span className={`text-sm ${isOverdueCase ? 'text-red-400 font-medium' : 'text-muted-foreground'}`}>
                            {formatDate(caseItem.expectedDisposalAt)}
                            {isOverdueCase && (
                              <span className="block text-xs text-red-400">Overdue</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground/70">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/cases/${caseItem.id}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground/70">No cases match the current filters</p>
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="mt-2 text-muted-foreground"
              >
                Reset filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredCases.length > 0 && (
            <div className="border-t border-border px-4 py-3 flex items-center justify-between bg-background">
              <div className="text-sm text-muted-foreground/70">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredCases.length)} of {filteredCases.length} cases
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-border text-muted-foreground"
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-accent text-[#07130F]" : "border-border text-muted-foreground"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border text-muted-foreground"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
