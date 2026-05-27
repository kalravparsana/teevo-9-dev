import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-sm disabled:opacity-50',
  secondary:
    'bg-surface-elevated text-ink border border-border hover:border-border-strong hover:bg-stone-50',
  ghost: 'text-ink-muted hover:text-ink hover:bg-stone-100',
  danger: 'bg-error text-white hover:bg-red-700',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
