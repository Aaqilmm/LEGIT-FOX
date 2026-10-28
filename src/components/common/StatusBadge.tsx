import { Badge } from '@/components/ui/Badge';
import { CaseStatus } from '@/types/complaint';
import { getStatusConfig } from '@/utils/status';

interface StatusBadgeProps {
  status: CaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return <Badge variant={config.color}>{config.label}</Badge>;
}
