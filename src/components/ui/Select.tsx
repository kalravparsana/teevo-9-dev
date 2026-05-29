import { forwardRef, type SelectHTMLAttributes } from 'react'
import chevronDown from '../../assets/images/chevron-down.svg'
import { cn } from '../../lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface-elevated py-2 pl-3 pr-10 text-sm text-ink transition-colors',
              'hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none',
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <img
            src={chevronDown}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>
      </div>
    )
  },
)

Select.displayName = 'Select'
