import * as React from 'react'

import { CircularProgress } from './progress'

export function ErrorPage({ children }: { children: React.ReactNode }) {
  const [rand1, setRand1] = React.useState(0)
  const [rand2, setRand2] = React.useState(0)

  React.useEffect(() => {
    const rand1IntervalId = setInterval(() => {
      setRand1(Math.floor(Math.random() * 100))
    }, 250)

    const rand2IntervalId = setInterval(() => {
      setRand2(Math.floor(Math.random() * 10))
    }, 500)

    return () => {
      clearInterval(rand1IntervalId)
      clearInterval(rand2IntervalId)
    }
  }, [])

  const emoji = ['😥', '😭', '😢', '😱', '😰', '😨', '😧', '😦', '😣', '😞'][
    rand2
  ]

  return (
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="text-8xl">Ooh N</span>
        <CircularProgress className="h-20 w-20" value={rand1} max={100}>
          <span className="text-3xl">{emoji}</span>
        </CircularProgress>
        <span className="text-8xl">...</span>
      </div>
      {children}
    </div>
  )
}
