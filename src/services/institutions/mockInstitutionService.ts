import { Institution } from '@/types/institution';
import { DEMO_INSTITUTIONS } from '@/data/demoInstitutions';

export class MockInstitutionService {
  private institutions: Institution[] = [...DEMO_INSTITUTIONS];

  async getAll(): Promise<Institution[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.institutions]), 300);
    });
  }

  async getById(id: string): Promise<Institution | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const institution = this.institutions.find((i) => i.id === id);
        resolve(institution || null);
      }, 200);
    });
  }

  async search(query: string): Promise<Institution[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = this.institutions.filter(
          (i) =>
            i.name.toLowerCase().includes(lowerQuery) ||
            i.aictePermanentId.toLowerCase().includes(lowerQuery) ||
            i.state.toLowerCase().includes(lowerQuery) ||
            i.region.toLowerCase().includes(lowerQuery)
        );
        resolve(filtered);
      }, 300);
    });
  }
}

export const mockInstitutionService = new MockInstitutionService();
