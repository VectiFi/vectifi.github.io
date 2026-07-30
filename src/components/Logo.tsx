interface LogoProps {
  variant?: 'full' | 'icon' | 'onDark';
  className?: string;
  /** Hide from assistive tech when the wrapping element already names the logo. */
  decorative?: boolean;
}

const SOURCES = {
  full: '/brand/vectifi-logo-light-transparent.svg',
  icon: '/brand/vectifi-mark-v1.svg',
  onDark: '/brand/vectifi-logo-on-dark.svg',
} as const;

export function Logo({ variant = 'full', className = '', decorative = false }: LogoProps) {
  return (
    <img
      src={SOURCES[variant]}
      alt={decorative ? '' : 'VectiFi'}
      aria-hidden={decorative || undefined}
      className={className || (variant === 'icon' ? 'h-10 w-10' : 'h-10')}
    />
  );
}
