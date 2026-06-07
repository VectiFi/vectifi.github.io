interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <img 
        src="/brand/vectifi-mark-v1.svg" 
        alt="VectiFi" 
        className={className || 'h-10 w-10'}
      />
    );
  }
  
  return (
    <img 
      src="/brand/vectifi-logo-light-transparent.svg" 
      alt="VectiFi" 
      className={className || 'h-10'}
    />
  );
}
