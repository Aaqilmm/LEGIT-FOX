import { cn } from '@/utils/cn';

type MascotVariant = 'full' | 'avatar' | 'welcome' | 'assistance';

interface FoxMascotProps {
  variant: MascotVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const variantPaths: Record<MascotVariant, string> = {
  full: '/mascot/legit-fox-mascot.png',
  avatar: '/mascot/legit-fox-avatar.png',
  welcome: '/mascot/legit-fox-welcome.png',
  assistance: '/mascot/legit-fox-assistance.png',
};

const sizeClasses = {
  sm: 'h-12',
  md: 'h-20',
  lg: 'h-32',
  xl: 'h-48',
};

export function FoxMascot({ variant, className, size = 'md' }: FoxMascotProps) {
  return (
    <img
      src={variantPaths[variant]}
      alt="Legit Fox Mascot"
      className={cn('object-contain', sizeClasses[size], className)}
    />
  );
}
