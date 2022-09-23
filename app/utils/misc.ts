import invariant from 'tiny-invariant'

type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
type mmmdd = `Mar ${19 | 20 | 21}` | `Sep ${22 | 23 | 24}`
type hh = `${0 | 1}${d}` | `2${0 | 1 | 2 | 3}`
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${d}`
type EquinoxDateStr = `${mmmdd} ${hh}:${mm}`

const equinox: { [key: number]: [EquinoxDateStr, EquinoxDateStr] } = {
  2022: ['Mar 20 15:33', 'Sep 23 01:04'],
  2023: ['Mar 20 21:25', 'Sep 23 06:50'],
  2024: ['Mar 20 03:07', 'Sep 22 12:44'],
  2025: ['Mar 20 09:02', 'Sep 22 18:20'],
  2026: ['Mar 20 14:46', 'Sep 23 00:06'],
  2027: ['Mar 20 20:25', 'Sep 23 06:02'],
  2028: ['Mar 20 02:17', 'Sep 22 11:45'],
  2029: ['Mar 20 08:01', 'Sep 22 17:37'],
  2030: ['Mar 20 13:51', 'Sep 22 23:27'],
  2031: ['Mar 20 19:41', 'Sep 23 05:15'],
  2032: ['Mar 20 01:23', 'Sep 22 11:11'],
  2033: ['Mar 20 07:23', 'Sep 22 16:52'],
  2034: ['Mar 20 13:18', 'Sep 22 22:41'],
  2035: ['Mar 20 19:03', 'Sep 23 04:39'],
  2036: ['Mar 20 01:02', 'Sep 22 10:23'],
  2037: ['Mar 20 06:50', 'Sep 22 16:13'],
  2038: ['Mar 20 12:40', 'Sep 22 22:02'],
  2039: ['Mar 20 18:32', 'Sep 23 03:50'],
  2040: ['Mar 20 00:11', 'Sep 22 09:44'],
  2041: ['Mar 20 06:07', 'Sep 22 15:27'],
  2042: ['Mar 20 11:53', 'Sep 22 21:11'],
  2043: ['Mar 20 17:29', 'Sep 23 03:07'],
  2044: ['Mar 19 23:20', 'Sep 22 08:47'],
  2045: ['Mar 20 05:08', 'Sep 22 14:33'],
  2046: ['Mar 20 10:58', 'Sep 22 20:22'],
  2047: ['Mar 20 16:52', 'Sep 23 02:07'],
  2048: ['Mar 19 22:34', 'Sep 22 08:01'],
  2049: ['Mar 20 04:28', 'Sep 22 13:42'],
  2050: ['Mar 20 10:20', 'Sep 22 19:29'],
  // from http://www.astropixels.com/ephemeris/soleq2001.html
}

function getEquinoxDatesOfYear(year: number): Date[] {
  return equinox[year].map(dateStr => new Date(`${year} ${dateStr} UTC`))
}

export function getNextEquinox(): Date {
  const currentYear = new Date().getUTCFullYear()

  const currentYearEquinoxes = getEquinoxDatesOfYear(currentYear)
  const nextYearEquinoxes = getEquinoxDatesOfYear(currentYear + 1)
  const candidates = [...currentYearEquinoxes, ...nextYearEquinoxes]

  const nextEquinox = candidates.find(
    candidate => Date.now() < candidate.getTime(),
  )
  invariant(nextEquinox, 'No equinox found')
  return nextEquinox
}
