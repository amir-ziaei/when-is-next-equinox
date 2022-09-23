import { afterEach, beforeEach, vi } from 'vitest'
import { getNextEquinox } from './misc'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

test('getNextEquinox returns the next equinox', () => {
  vi.setSystemTime(new Date('2022 Jan 1 00:00 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2022-03-20T15:33:00.000Z')

  vi.setSystemTime(new Date('2022 Mar 20 15:32 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2022-03-20T15:33:00.000Z')

  vi.setSystemTime(new Date('2022 Mar 20 15:33 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2022-09-23T01:04:00.000Z')

  vi.setSystemTime(new Date('2022 Mar 20 15:34 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2022-09-23T01:04:00.000Z')

  vi.setSystemTime(new Date('2022 Sep 23 01:03 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2022-09-23T01:04:00.000Z')

  vi.setSystemTime(new Date('2022 Sep 23 01:04 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2023-03-20T21:25:00.000Z')

  vi.setSystemTime(new Date('2022 Sep 23 01:05 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2023-03-20T21:25:00.000Z')

  vi.setSystemTime(new Date('2022 Dec 31 23:59 UTC'))
  expect(getNextEquinox().toISOString()).toBe('2023-03-20T21:25:00.000Z')
})
