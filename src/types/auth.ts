export type UserRole = 'student' | 'bureau_officer' | 'regional_officer' | 'senior_management' | 'super_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bureauId?: string;
  region?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
