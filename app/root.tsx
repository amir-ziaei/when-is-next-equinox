import * as React from 'react'
import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import styles from '~/styles/app.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'When is the next Equinox?',
  viewport: 'width=device-width,initial-scale=1',
})

function App({ children }: { children: React.ReactElement | null }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-[#403583] bg-[linear-gradient(140deg,_#1A628A,_#FFFEFF_100%)] bg-fixed bg-no-repeat">
        <main className="flex h-full flex-col items-center justify-center overflow-hidden">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function AppWithOutlet() {
  return (
    <App>
      <Outlet />
    </App>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <App>
      <>
        <span className="mb-4 text-8xl">😥</span>
        <h1 className="text-5xl">Something went wrong!</h1>
      </>
    </App>
  )
}
