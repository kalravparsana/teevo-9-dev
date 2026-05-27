import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        'fixed inset-0 z-50 m-auto w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-0 shadow-xl backdrop:bg-stone-900/40',
        'open:animate-in open:fade-in open:zoom-in-95',
        className,
      )}
      aria-labelledby="modal-title"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 id="modal-title" className="text-lg font-semibold text-ink">
          {title}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Close dialog"
          className="!p-1.5"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  )
}
