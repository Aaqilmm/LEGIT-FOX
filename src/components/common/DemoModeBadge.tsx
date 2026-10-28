import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { isDemoMode } from '@/config/runtimeConfig';

export function DemoModeBadge() {
  if (!isDemoMode) return null;

  return (
    <Badge variant="yellow" className="gap-1">
      <AlertCircle className="h-3 w-3" />
      DEMO DATA — NOT OFFICIAL AICTE DATA
    </Badge>
  );
}

export function DemoModeAlert() {
  if (!isDemoMode) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-100">
          Demo Mode Active
        </p>
        <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-1">
          This application is running with synthetic demo data. All institutions, complaints, and
          records are fictional and not official AICTE data.
        </p>
      </div>
    </div>
  );
}
