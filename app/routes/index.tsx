import * as React from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getNextEquinox } from '~/utils/misc'

export function loader() {
  const nextEquinox = getNextEquinox()
  const remainingMs = nextEquinox.getTime() - Date.now()
  return json({ remainingMs })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  const [remainingMs, setRemainingMs] = React.useState<number>(data.remainingMs)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingMs(ms => ms - 1000)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const [days, hours, minutes, seconds] = [
    Math.floor(remainingMs / 1000 / 60 / 60 / 24),
    Math.floor((remainingMs / 1000 / 60 / 60) % 24),
    Math.floor((remainingMs / 1000 / 60) % 60),
    Math.floor((remainingMs / 1000) % 60),
  ].map(t => (t < 10 ? `0${t}` : `${t}`))

  return (
    <div>
      <h1>Next Equinox</h1>
      <p>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  )
}
