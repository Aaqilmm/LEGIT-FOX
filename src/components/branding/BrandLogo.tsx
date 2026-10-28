import { cn } from '@/utils/cn';

interface BrandLogoProps {
  variant: 'student' | 'admin';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

export function BrandLogo({ variant, className, size = 'md' }: BrandLogoProps) {
  const logoPath =
    variant === 'student' ? '/branding/legit-fox-logo.png' : '/branding/aicte-legit-logo.png';

  const alt = variant === 'student' ? 'Legit Fox' : 'AICTE Legit';

  return (
    <img
      src={logoPath}
      alt={alt}
      className={cn('object-contain', sizeClasses[size], className)}
    />
  );
}
