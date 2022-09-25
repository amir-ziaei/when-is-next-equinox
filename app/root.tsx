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

import { BgCopyright } from './components/copyright'
import styles from '~/styles/app.css'
import { ErrorPage } from './components/errors'

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
      <body className="h-screen bg-[url('/bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat text-slate-100">
        <main className="flex h-full flex-col items-center justify-center overflow-hidden">
          {children}
          <BgCopyright />
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
      <ErrorPage>
        <p className="text-lg">Something went wrong!</p>
      </ErrorPage>
    </App>
  )
}
