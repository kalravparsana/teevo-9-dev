import { ArrowRight, CheckCircle2, ListTodo, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

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
            <Link to="/app">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/app">
              <Button>
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center md:pt-28">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Task management, simplified
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-tight text-ink md:text-6xl">
          Focus on what matters.{' '}
          <span className="italic text-primary">Let the rest wait.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
          Manage your tasks, priorities, and deadlines in one calm, distraction-free
          workspace designed for modern teams.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/app">
            <Button size="lg">
              Open your workspace
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/app/tasks">
            <Button variant="secondary" size="lg">
              View tasks
            </Button>
          </Link>
        </div>
      </section>

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
        <Link to="/app" className="mt-8 inline-block">
          <Button size="lg">Start for free</Button>
        </Link>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-ink-subtle">
        © {new Date().getFullYear()} Clearboard. All rights reserved.
      </footer>
    </div>
  )
}
