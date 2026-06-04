import type { ReactNode } from 'react'

/** Extended subtitles for cards where the default description is intentionally brief. */
const EXTENDED_DESCRIPTIONS: Record<string, string> = {
  'Add New Club':
    'Register a golf club on the platform by entering its name, location, hole count, and optional course notes so players can discover the club and book tee times.',
}

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
}

export function Card({ children, className = '', title, description }: CardProps) {
  const displayDescription =
    title && description && EXTENDED_DESCRIPTIONS[title]
      ? EXTENDED_DESCRIPTIONS[title]
      : description

  return (
    <section
      className={`rounded-lg border border-gray-300 bg-gray-200 p-4 ${className}`}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-bold text-gray-900">{title}</h2>}
          {displayDescription && (
            <p className="mt-1 max-w-4xl text-sm leading-relaxed text-gray-600">{displayDescription}</p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
