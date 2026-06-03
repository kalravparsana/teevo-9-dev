import { ArrowRight, CheckCircle2, ListTodo, Zap } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { LandingHero } from '../components/landing/LandingHero'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

const features = [
  {
    icon: ListTodo,
    title: 'Organize with clarity',
    description:
      'Capture tasks, set priorities, and track due dates in a focused workspace built for daily work.',
  },
  {
    icon: Zap,
    title: 'Stay on top of deadlines',
    description:
      'See what needs attention at a glance and keep momentum across your projects.',
  },
  {
    icon: CheckCircle2,
    title: 'Complete with confidence',
    description:
      'Mark progress, filter by status, and celebrate wins as you move through your day.',
  },
]

export function LandingPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/60 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ListTodo className="h-5 w-5" />
            </div>
            <span className="font-display text-xl text-ink">Clearboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/sign-in">
              <Button>
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <LandingHero />

      <section className="border-t border-border bg-surface-elevated py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-muted text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          Ready to take control of your day?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          Join thousands of professionals who rely on Clearboard to stay organized
          and productive.
        </p>
        <Link to="/sign-in" className="mt-8 inline-block">
          <Button size="lg">Start for free</Button>
        </Link>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-ink-subtle">
        © {new Date().getFullYear()} Clearboard. All rights reserved.
      </footer>
    </div>
  )
}
