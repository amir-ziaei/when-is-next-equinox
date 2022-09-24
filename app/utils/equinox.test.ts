import { afterEach, beforeEach, vi } from 'vitest'
import { getNextEquinox, getPreviousEquinox } from './equinox'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('getNextEquinox', () => {
  it('returns the next equinox', () => {
    vi.setSystemTime(new Date('2022 Jan 1 00:00 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2022-03-20T15:33:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:32 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2022-03-20T15:33:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:33 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2022-09-23T01:04:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:34 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2022-09-23T01:04:00.000Z')

    vi.setSystemTime(new Date('2022 Sep 23 01:03 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2022-09-23T01:04:00.000Z')

    vi.setSystemTime(new Date('2022 Sep 23 01:04 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2023-03-20T21:25:00.000Z')

    vi.setSystemTime(new Date('2022 Sep 23 01:05 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2023-03-20T21:25:00.000Z')

    vi.setSystemTime(new Date('2022 Dec 31 23:59 UTC'))
    expect(getNextEquinox()?.toISOString()).toBe('2023-03-20T21:25:00.000Z')
  })

  it('returns undefined if the next equinox is not pre-defined', () => {
    vi.setSystemTime(new Date('1900 Jan 1 00:00 UTC'))
    expect(getNextEquinox()).toBeUndefined()

    vi.setSystemTime(new Date('2100 Jan 1 00:00 UTC'))
    expect(getNextEquinox()).toBeUndefined()
  })
})

describe('getPreviousEquinox', () => {
  it('returns the previous equinox', () => {
    vi.setSystemTime(new Date('2022 Jan 1 00:00 UTC'))
    expect(getPreviousEquinox()?.toISOString()).toBe('2021-09-22T19:21:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:32 UTC'))
    expect(getPreviousEquinox()?.toISOString()).toBe('2021-09-22T19:21:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:33 UTC'))
    expect(getPreviousEquinox()?.toISOString()).toBe('2021-09-22T19:21:00.000Z')

    vi.setSystemTime(new Date('2022 Mar 20 15:34 UTC'))
    expect(getPreviousEquinox()?.toISOString()).toBe('2022-03-20T15:33:00.000Z')
  })

  it('returns undefined if the previous equinox is not pre-defined', () => {
    vi.setSystemTime(new Date('1900 Jan 1 00:00 UTC'))
    expect(getPreviousEquinox()).toBeUndefined()

    vi.setSystemTime(new Date('2100 Jan 1 00:00 UTC'))
    expect(getPreviousEquinox()).toBeUndefined()
  })
})
