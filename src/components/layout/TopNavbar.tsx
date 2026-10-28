import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAuth } from '@/app/providers/AuthProvider';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface NavItem {
  name: string;
  href: string;
}

interface TopNavbarProps {
  variant: 'student' | 'admin';
}

export function TopNavbar({ variant }: TopNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentNav: NavItem[] = [];

  const adminNav: NavItem[] = [
    { name: 'Overview', href: '/admin' },
    { name: 'Cases', href: '/admin/cases' },
    { name: 'Overlap Alerts', href: '/admin/overlap-alerts' },
    { name: 'Institutions', href: '/admin/institutions' },
  ];

  const navigation = variant === 'student' ? studentNav : adminNav;

  const roleColors: Record<string, 'blue' | 'green' | 'purple' | 'orange' | 'default'> = {
    student: 'blue',
    bureau_officer: 'green',
    regional_officer: 'purple',
    senior_management: 'orange',
    super_admin: 'default',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-navbar shadow-sm">
      <div className="container max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-4">
            <Link to={variant === 'student' ? '/student' : '/admin'} className="flex items-center gap-4">
              <img
                src="/branding/legit-fox-icon.png"
                alt="Legit Fox"
                className="h-12 w-12 md:h-14 md:w-14 object-contain"
              />
              <div className="hidden sm:block">
                <div
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r dark:from-[#D4AF37] dark:via-[#F4E5B5] dark:to-[#D4AF37] from-[#065F46] via-[#059669] to-[#065F46] bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                    letterSpacing: '0.03em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  {variant === 'student' ? 'Legit Fox' : 'AICTE Legit'}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {navigation.length > 0 && (
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive =
                  item.href === (variant === 'student' ? '/student' : '/admin')
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-active-nav text-primary shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Side Items */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="flex-shrink-0">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* User Menu - Desktop */}
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-muted border">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium leading-none">{user.name}</div>
                    <Badge variant={roleColors[user.role] || 'default'} className="mt-1 text-xs">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Mobile Menu Button - Only show if there are nav items */}
            {navigation.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-navbar">
            <div className="px-4 py-3 space-y-1">
              {navigation.length > 0 &&
                navigation.map((item) => {
                  const isActive =
                    item.href === (variant === 'student' ? '/student' : '/admin')
                      ? location.pathname === item.href
                      : location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-active-nav text-primary shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

              {/* User Info - Mobile */}
              {isAuthenticated && user && (
                <div className="pt-3 mt-3 border-t space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <Badge variant={roleColors[user.role] || 'default'} className="mt-1 text-xs">
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
