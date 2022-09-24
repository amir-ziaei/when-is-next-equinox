export function CircularProgress({
  value,
  max,
  children,
}: {
  value: number
  max: number
  children: React.ReactNode
}) {
  const completedPercentage = `${(1 - value / max) * 100}%`

  return (
    <div
      className={`circular-progress relative flex h-36 w-36 flex-col items-center justify-center`}
      style={{ ['--completed-percentage' as any]: completedPercentage }}
    >
      {children}
    </div>
  )
}
