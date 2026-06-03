// Figma layer: "Landing / Hero Section"
import { ArrowRight, Calendar, CheckCircle2, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroAurora from '../../assets/hero-aurora.svg'
import heroVisual from '../../assets/hero.png'
import { Button } from '../ui/Button'
import styles from './LandingHero.module.css'

const previewTasks = [
  {
    id: '1',
    title: 'Ship onboarding flow',
    meta: 'Design · Due today',
    done: false,
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Review sprint priorities',
    meta: 'Product · Tomorrow',
    done: true,
    priority: 'medium' as const,
  },
  {
    id: '3',
    title: 'Sync with engineering',
    meta: 'Meeting · Fri 2:00 PM',
    done: false,
    priority: 'low' as const,
  },
]

const stats = [
  { label: 'Teams organized', value: '12k+' },
  { label: 'Avg. rating', value: '4.9' },
  { label: 'Setup time', value: '< 2 min' },
]

const priorityStyles = {
  high: 'bg-amber-100 text-amber-800',
  medium: 'bg-sky-100 text-sky-800',
  low: 'bg-stone-200 text-stone-600',
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${styles.auroraDrift}`}
      >
        <img
          src={heroAurora}
          alt=""
          className="absolute left-1/2 top-0 h-[900px] w-[900px] max-w-none -translate-x-1/2 opacity-80"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-20 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:pb-28 md:pt-24 lg:gap-16">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-muted/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Task management, reimagined
          </div>

          <h1 className="mt-6 max-w-xl font-display text-[2.75rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
            Focus on what matters.
            <span className="mt-1 block bg-gradient-to-r from-primary via-teal-600 to-violet-600 bg-clip-text text-transparent italic">
              Let the rest wait.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            Manage priorities, deadlines, and momentum in a calm workspace built
            for modern teams — without the noise of bloated project tools.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/sign-in" className="cursor-pointer">
              <Button size="lg" className="w-full shadow-md shadow-primary/20 sm:w-auto">
                Open your workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/sign-in" className="cursor-pointer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View tasks
              </Button>
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/80 pt-8">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-subtle">
                  {label}
                </dt>
                <dd className="mt-1 flex items-center gap-1 font-display text-2xl text-ink">
                  {value}
                  {label === 'Avg. rating' && (
                    <Star
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <div
            aria-hidden="true"
            className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-violet-400/20 blur-3xl ${styles.glowPulseA}`}
          />
          <div
            aria-hidden="true"
            className={`absolute -bottom-8 -left-4 h-32 w-32 rounded-full bg-primary/25 blur-3xl ${styles.glowPulseB}`}
          />

          <div className="relative rounded-[28px] border border-white/60 bg-white/70 p-3 shadow-[0_24px_80px_-24px_rgba(15,118,110,0.35)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[20px] border border-border/70 bg-surface-elevated">
              <div className="flex items-center justify-between border-b border-border/70 bg-stone-50/90 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-medium text-ink-subtle">Today · 5 tasks</span>
              </div>

              <ul className="space-y-2.5 p-4">
                {previewTasks.map((task, index) => (
                  <li
                    key={task.id}
                    className={`group flex items-start gap-3 rounded-xl border border-border/60 bg-white p-3.5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-md ${styles.riseIn}`}
                    style={{ animationDelay: `${120 + index * 90}ms` }}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        task.done
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-border-strong bg-surface'
                      }`}
                    >
                      {task.done && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-medium ${
                          task.done ? 'text-ink-subtle line-through' : 'text-ink'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
                        <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
                        {task.meta}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityStyles[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md ${styles.floatCard}`}
              aria-hidden="true"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-ink-subtle">Completed this week</p>
                <p className="font-display text-lg text-ink">24 tasks</p>
              </div>
            </div>
          </div>

          <img
            src={heroVisual}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute -right-10 -top-12 hidden w-36 rotate-12 opacity-90 drop-shadow-2xl lg:block xl:w-44 ${styles.floatVisual}`}
          />
        </div>
      </div>
    </section>
  )
}
