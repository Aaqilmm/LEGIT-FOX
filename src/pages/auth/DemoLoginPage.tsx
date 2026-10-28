import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { BrandLogo } from '@/components/branding/BrandLogo';
import { useAuth } from '@/app/providers/AuthProvider';
import { DEMO_USERS } from '@/data/demoUsers';
import { UserRole } from '@/types/auth';
import { DemoModeAlert } from '@/components/common/DemoModeBadge';

export function DemoLoginPage() {
  const navigate = useNavigate();
  const { switchDemoUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleLogin = () => {
    const user = DEMO_USERS.find((u) => u.role === selectedRole);
    if (user) {
      switchDemoUser(user.id);
      if (selectedRole === 'student') {
        navigate('/student');
      } else {
        navigate('/admin');
      }
    }
  };

  const roleOptions: { value: UserRole; label: string; description: string }[] = [
    { value: 'student', label: 'Student', description: 'Access student portal and assistant' },
    {
      value: 'bureau_officer',
      label: 'Bureau Officer',
      description: 'Manage cases within Bureau scope',
    },
    {
      value: 'regional_officer',
      label: 'Regional Officer',
      description: 'View regional institution data',
    },
    {
      value: 'senior_management',
      label: 'Senior Management',
      description: 'View consolidated metrics and reports',
    },
    {
      value: 'super_admin',
      label: 'Super Admin',
      description: 'Full system administration access',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BrandLogo variant="student" size="lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">LEGIT Demo Access</h1>
            <p className="text-muted-foreground mt-2">
              Select a role to explore the application
            </p>
          </div>
        </div>

        <DemoModeAlert />

        <Card>
          <CardHeader>
            <CardTitle>Choose Your Role</CardTitle>
            <CardDescription>Select a demo user role to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedRole(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedRole === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                </button>
              ))}
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              Continue as {roleOptions.find((o) => o.value === selectedRole)?.label}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
