import { Complaint } from '@/types/complaint';
import { DEMO_COMPLAINTS } from '@/data/demoComplaints';
import { DEMO_INSTITUTIONS } from '@/data/demoInstitutions';
import { DEMO_BUREAUS } from '@/data/demoBureaus';

export class MockComplaintService {
  private complaints: Complaint[] = [...DEMO_COMPLAINTS];

  async getAll(): Promise<Complaint[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.complaints]), 300);
    });
  }

  async getById(id: string): Promise<Complaint | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const complaint = this.complaints.find((c) => c.id === id);
        resolve(complaint || null);
      }, 200);
    });
  }

  async getByCaseId(caseId: string): Promise<Complaint | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const complaint = this.complaints.find((c) => c.caseId === caseId);
        resolve(complaint || null);
      }, 200);
    });
  }

  async getByInstitutionId(institutionId: string): Promise<Complaint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.complaints.filter((c) => c.institutionId === institutionId);
        resolve(filtered);
      }, 200);
    });
  }

  async search(query: string): Promise<Complaint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = this.complaints.filter(
          (c) =>
            c.caseId.toLowerCase().includes(lowerQuery) ||
            c.originalDescription.toLowerCase().includes(lowerQuery) ||
            c.category.toLowerCase().includes(lowerQuery)
        );
        resolve(filtered);
      }, 300);
    });
  }

  getInstitutionName(institutionId: string | null): string {
    if (!institutionId) return 'Unknown Institution';
    const institution = DEMO_INSTITUTIONS.find((i) => i.id === institutionId);
    return institution?.name || 'Unknown Institution';
  }

  getBureauName(bureauId: string | null): string {
    if (!bureauId) return 'Unassigned';
    const bureau = DEMO_BUREAUS.find((b) => b.id === bureauId);
    return bureau?.displayName || 'Unknown Bureau';
  }
}

export const mockComplaintService = new MockComplaintService();
