import { User } from '@/types/auth';

export const DEMO_USERS: User[] = [
  {
    id: 'user-student-1',
    email: 'student@demo.legit',
    name: 'Demo Student',
    role: 'student',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-officer-1',
    email: 'officer@demo.legit',
    name: 'Demo Bureau Officer',
    role: 'bureau_officer',
    bureauId: 'bureau-pgrc',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-regional-1',
    email: 'regional@demo.legit',
    name: 'Demo Regional Officer',
    role: 'regional_officer',
    region: 'Southern',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-senior-1',
    email: 'senior@demo.legit',
    name: 'Demo Senior Management',
    role: 'senior_management',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-admin-1',
    email: 'admin@demo.legit',
    name: 'Demo Super Admin',
    role: 'super_admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
];
