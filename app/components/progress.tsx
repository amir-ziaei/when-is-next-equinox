import clsx from 'clsx'

export function CircularProgress({
  value,
  max,
  className,
  children,
}: {
  value: number
  max: number
  className?: string
  children: React.ReactNode
}) {
  const completedPercentage = `${(1 - value / max) * 100}%`

  return (
    <div
      className={clsx(
        `circular-progress relative flex h-36 w-36 flex-col items-center justify-center`,
        className,
      )}
      style={{ ['--completed-percentage' as any]: completedPercentage }}
    >
      {children}
    </div>
  )
}
