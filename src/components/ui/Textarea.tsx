import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full resize-y rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink placeholder:text-ink-subtle transition-colors min-h-[88px]',
            'hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none',
            error && 'border-error focus:border-error focus:ring-error/20',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
