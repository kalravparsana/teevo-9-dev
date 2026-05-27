import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface DeleteConfirmModalProps {
  open: boolean
  taskTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmModal({
  open,
  taskTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} title="Delete task">
      <p className="text-sm text-ink-muted">
        Are you sure you want to delete{' '}
        <span className="font-medium text-ink">&ldquo;{taskTitle}&rdquo;</span>?
        This action cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
