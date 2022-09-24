import * as React from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getNextEquinox, getPreviousEquinox } from '~/utils/equinox'
import { getDatesDiffInDays } from '~/utils/date'
import { CircularProgress } from '~/components/progress'

export function loader() {
  const nextEquinox = getNextEquinox()
  const prevEquinox = getPreviousEquinox()

  if (!nextEquinox || !prevEquinox) {
    throw new Error(
      'We failed to get the date of the equinox. Please try again later.',
    )
  }

  const remainingMs = nextEquinox.getTime() - Date.now()
  const daysBetween = getDatesDiffInDays(nextEquinox, prevEquinox)

  return json({ remainingMs, daysBetween })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const [remainingMs, setRemainingMs] = React.useState<number>(data.remainingMs)

  React.useEffect(() => {
    if (remainingMs <= 0) {
      return
    }
    const timeoutId = setTimeout(() => {
      setRemainingMs(ms => ms - 1000)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [remainingMs])

  const [days, hours, minutes, seconds] = [
    Math.floor(remainingMs / 1000 / 60 / 60 / 24),
    Math.floor((remainingMs / 1000 / 60 / 60) % 24),
    Math.floor((remainingMs / 1000 / 60) % 60),
    Math.floor((remainingMs / 1000) % 60),
  ].map(t => (t < 10 ? `0${t}` : `${t}`))

  return (
    <div className="flex gap-5">
      {[
        {
          label: 'days',
          value: days,
          max: data.daysBetween,
        },
        {
          label: 'hours',
          value: hours,
          max: 24,
        },
        {
          label: 'minutes',
          value: minutes,
          max: 60,
        },
        {
          label: 'seconds',
          value: seconds,
          max: 60,
        },
      ].map(({ label, value, max }) => (
        <CircularProgress key={label} value={Number(value)} max={max}>
          <div className="text-4xl font-bold">{value}</div> {label}
        </CircularProgress>
      ))}
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1 className="mb-4 text-6xl">Oh no ☹️</h1>
      <p className="text-xl">{error.message}</p>
    </div>
  )
}
