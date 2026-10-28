import { Moon, Sun, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAuth } from '@/app/providers/AuthProvider';
import { DemoModeBadge } from '@/components/common/DemoModeBadge';
import { BrandLogo } from '@/components/branding/BrandLogo';
import { Badge } from '@/components/ui/Badge';

interface TopbarProps {
  title?: string;
  onMenuClick?: () => void;
  showLogo?: boolean;
  variant?: 'student' | 'admin';
}

export function Topbar({ title, onMenuClick, showLogo = true, variant = 'admin' }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const roleColors: Record<string, 'blue' | 'green' | 'purple' | 'orange' | 'default'> = {
    student: 'blue',
    bureau_officer: 'green',
    regional_officer: 'purple',
    senior_management: 'orange',
    super_admin: 'default',
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 gap-3">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Logo - Hidden on mobile if title exists */}
        {showLogo && (
          <div className={`${title ? 'hidden md:flex' : 'flex'} items-center`}>
            <BrandLogo variant={variant} size="md" />
          </div>
        )}

        {/* Title */}
        {title && <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>}

        {/* Right side items */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <DemoModeBadge />

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="flex-shrink-0">
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-medium leading-none">{user.name}</div>
                  <Badge variant={roleColors[user.role] || 'default'} className="mt-1 text-xs">
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Mobile User Icon */}
          {isAuthenticated && user && (
            <div className="sm:hidden h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
