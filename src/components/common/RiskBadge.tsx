import { Badge } from '@/components/ui/Badge';
import { RiskLevel } from '@/types/complaint';
import { AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
}

export function RiskBadge({ level, showIcon = true }: RiskBadgeProps) {
  const config = {
    critical: {
      label: 'Critical',
      variant: 'red' as const,
      icon: AlertTriangle,
    },
    high: {
      label: 'High',
      variant: 'orange' as const,
      icon: AlertCircle,
    },
    medium: {
      label: 'Med',
      variant: 'yellow' as const,
      icon: Info,
    },
    low: {
      label: 'Low',
      variant: 'green' as const,
      icon: Shield,
    },
  };

  const { label, variant, icon: Icon } = config[level];

  return (
    <Badge variant={variant} className="gap-1">
      {showIcon && <Icon className="h-3 w-3" />}
      {label} Risk
    </Badge>
  );
}
