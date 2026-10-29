import Button from './Button'

interface Props {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <div
      className="grid justify-items-center gap-2.5 rounded-[18px] border-[1.5px] border-dashed border-line bg-surface px-5 py-16 text-center"
      role="status"
    >
      <span
        aria-hidden="true"
        className="size-[54px] rounded-full border-[3px] border-ink-soft bg-[linear-gradient(to_bottom,transparent_0_46%,var(--ink-soft)_46%_54%,transparent_54%)] opacity-60"
      />
      <h2 className="font-display text-[1.35rem] font-bold">{title}</h2>
      <p className="mb-2 max-w-[44ch] text-ink-soft">{message}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
