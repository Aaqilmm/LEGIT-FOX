import { useState } from 'react';
import { CheckCircle2, ArrowLeft, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { Autocomplete } from '@/components/ui/Autocomplete';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DEMO_INSTITUTIONS } from '@/data/demoInstitutions';

export function MainComplaintPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    institutionName: '',
    category: '',
    subject: '',
    description: '',
  });
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const institutionOptions = DEMO_INSTITUTIONS.map((inst) => ({
    value: inst.id,
    label: inst.name,
    subtitle: inst.addressSummary,
  }));

  const regionOptions = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Other'
  ];

  const categoryOptions = [
    { value: 'document_retention', label: 'Document Retention' },
    { value: 'fee_refund', label: 'Fee Refund' },
    { value: 'examination_related', label: 'Examination Related' },
    { value: 'admission_grievance', label: 'Admission Grievance' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'faculty_shortage', label: 'Faculty Shortage' },
    { value: 'ragging', label: 'Ragging' },
    { value: 'discrimination', label: 'Discrimination' },
    { value: 'academic_malpractice', label: 'Academic Malpractice' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = () => {
    const caseId = `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    alert(`Case submitted successfully!\n\nYour Case ID: ${caseId}\n\nPlease save this Case ID to track your case status.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      region: '',
      institutionName: '',
      category: '',
      subject: '',
      description: '',
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.region &&
      formData.institutionName &&
      formData.category &&
      formData.subject &&
      formData.description.length >= 50
    );
  };

  const caseHistory = [
    {
      id: 'CASE-2024-001',
      reference: 'AL-2026-0136',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      region: 'Tamil Nadu',
      institution: 'PSG College of Technology',
      category: 'Harassment',
      subject: 'Original Certificates Not Returned',
      description: 'My college is keeping my original certificates even though I have completed all requirements and have no pending dues. I graduated 6 months ago and have repeatedly requested for them.',
      status: 'under_process' as const,
      priority: 'High',
      date: '27 Oct 2026',
      bureau: 'Legal Cell',
      complaintType: 'Confidential',
    },
    {
      id: 'CASE-2024-002',
      reference: 'AL-2026-0142',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98234 56789',
      region: 'Tamil Nadu',
      institution: 'Raman Institute of Technology',
      category: 'Fee-related',
      subject: 'Fee Refund Request for Unauthorized Charges',
      description: 'The college charged me extra fees that were not disclosed during admission. I am requesting a refund of the unauthorized amount.',
      status: 'received' as const,
      priority: 'Medium',
      date: '25 Nov 2026',
      bureau: 'PGRC',
      complaintType: 'Public',
    },
  ];

  // Case Detail View (matching sample 1)
  if (selectedCase) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedCase(null)}
              className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to case register
            </Button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              CASE WORKSPACE
            </p>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm font-medium">{selectedCase.reference}</span>
                  <Badge variant={selectedCase.priority === 'High' ? 'red' : 'yellow'}>
                    {selectedCase.priority} priority
                  </Badge>
                  <Badge variant="outline">{selectedCase.bureau}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{selectedCase.subject}</h1>
                <p className="text-muted-foreground">
                  {selectedCase.institution} · {selectedCase.category} · Submitted {selectedCase.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedCase.status} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Complaint Details */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Complaint details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Reference number
                      </p>
                      <p className="font-mono text-sm">{selectedCase.reference}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Institution
                      </p>
                      <p className="text-sm font-medium">{selectedCase.institution}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Category
                      </p>
                      <p className="text-sm">{selectedCase.category}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Assigned bureau
                      </p>
                      <p className="text-sm">{selectedCase.bureau}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Region
                      </p>
                      <p className="text-sm">{selectedCase.region}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Priority
                      </p>
                      <Badge variant={selectedCase.priority === 'High' ? 'red' : 'yellow'}>
                        {selectedCase.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Submitted
                      </p>
                      <p className="text-sm">{selectedCase.date}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                        Complaint
                      </p>
                      <p className="text-sm">{selectedCase.complaintType}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      DESCRIPTION
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {selectedCase.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Case History */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Case history</CardTitle>
                    <span className="text-sm text-muted-foreground">1 events</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium text-sm">Complaint received</p>
                          <span className="text-xs text-muted-foreground">{selectedCase.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Confidential submission registered
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedCase.date}, 02:13 pm · Citizen
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
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Submitter information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                      Name
                    </p>
                    <p className="text-sm font-medium">{selectedCase.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                      Email
                    </p>
                    <p className="text-sm">{selectedCase.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                      Phone
                    </p>
                    <p className="text-sm">{selectedCase.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                      Region
                    </p>
                    <p className="text-sm">{selectedCase.region}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Institution Context */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Institution context</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-0.5">{selectedCase.institution}</p>
                      <p className="text-xs text-muted-foreground">{selectedCase.region}, Verified</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Other cases</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Open coordination alert</span>
                      <span className="font-medium">No</span>
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

  // Case History View - TABLE FORMAT (matching sample 2)
  if (showHistory) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              CASE MANAGEMENT
            </p>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Case register</h1>
                <p className="text-muted-foreground">
                  Search and triage cases, inspect their status, and open a record for permitted actions.
                </p>
              </div>
              <Button onClick={() => setShowHistory(false)}>
                <FileText className="mr-2 h-4 w-4" />
                New Complaint
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reference, institution..."
                    className="pl-9"
                  />
                </div>
                <Button variant="outline">Search</Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <select className="px-3 py-1.5 text-sm rounded-md border border-input bg-background">
                  <option>All statuses</option>
                </select>
                <select className="px-3 py-1.5 text-sm rounded-md border border-input bg-background">
                  <option>All bureaus</option>
                </select>
                <select className="px-3 py-1.5 text-sm rounded-md border border-input bg-background">
                  <option>All categories</option>
                </select>
                <select className="px-3 py-1.5 text-sm rounded-md border border-input bg-background">
                  <option>All priorities</option>
                </select>
                <Button variant="ghost" size="sm">Reset</Button>
              </div>
            </CardContent>
          </Card>

          {/* Cases Table */}
          <Card>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Reference
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Institution
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Category
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Bureau
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Priority
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-xs">
                      Due Date
                    </th>
                    <th className="h-12 px-4 w-12"></th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {caseHistory.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      <td className="p-4 align-middle">
                        <span className="font-mono text-sm font-medium">{caseItem.reference}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <div>
                          <p className="font-medium text-sm">{caseItem.institution}</p>
                          <p className="text-xs text-muted-foreground">{caseItem.region}</p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="text-sm">{caseItem.category}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="text-sm">{caseItem.bureau}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={caseItem.priority === 'High' ? 'red' : 'yellow'}>
                          {caseItem.priority}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <StatusBadge status={caseItem.status} />
                      </td>
                      <td className="p-4 align-middle">
                        <span className="text-sm">{caseItem.date}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="text-muted-foreground">→</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3 flex items-center justify-between text-sm text-muted-foreground">
              <div>Showing 1-10 of {caseHistory.length} matching sample records</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">→</Button>
              </div>
            </div>
          </Card>

          {/* Bottom Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wide">Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold mb-1">Status updates</p>
                <p className="text-sm text-muted-foreground">
                  Every status change is validated and added to case history.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wide">Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold mb-1">Bureau scope</p>
                <p className="text-sm text-muted-foreground">
                  These sample results are not permission-filtered by a live server.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wide">SLA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold mb-1">Deadline visibility</p>
                <p className="text-sm text-muted-foreground">
                  Overdue labels are derived from the sample expected disposal date.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Main Form View
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-6 px-4 md:px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                CASE MANAGEMENT
              </p>
              <h1 className="text-3xl font-bold mb-2">Submit new case</h1>
              <p className="text-muted-foreground">
                Fill in the details below to register your grievance
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.location.href = '/student/track'}>
                <Search className="mr-2 h-4 w-4" />
                Track case
              </Button>
              <Button variant="outline" onClick={() => setShowHistory(true)}>
                <FileText className="mr-2 h-4 w-4" />
                History
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Case information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1.5"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-xs uppercase tracking-wide text-muted-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs uppercase tracking-wide text-muted-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className="pt-6 border-t">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Case Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="region" className="text-xs uppercase tracking-wide text-muted-foreground">
                          Region
                        </Label>
                        <select
                          id="region"
                          value={formData.region}
                          onChange={(e) => updateFormData('region', e.target.value)}
                          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="">Select region</option>
                          {regionOptions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-xs uppercase tracking-wide text-muted-foreground">
                          Category
                        </Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => updateFormData('category', e.target.value)}
                          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="">Select category</option>
                          {categoryOptions.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="institution" className="text-xs uppercase tracking-wide text-muted-foreground">
                        Institution Name
                      </Label>
                      <div className="mt-1.5">
                        <Autocomplete
                          options={institutionOptions}
                          value={formData.institutionName}
                          onChange={(value) => updateFormData('institutionName', value)}
                          placeholder="Start typing institution name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-xs uppercase tracking-wide text-muted-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => updateFormData('subject', e.target.value)}
                        placeholder="Brief summary of your case"
                        className="mt-1.5"
                        maxLength={100}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-xs uppercase tracking-wide text-muted-foreground">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        placeholder="Provide detailed information about your case..."
                        rows={6}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.description.length} characters (minimum 50 required)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Submit Case
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Before you submit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Provide accurate contact information</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Include specific dates and timeline</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Describe actions already taken</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Save your Case ID after submission</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Need assistance?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  Use the chatbot (🦊) in the bottom-right corner for help with:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Form guidance</li>
                  <li>• Category selection</li>
                  <li>• General questions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
