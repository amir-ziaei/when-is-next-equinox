type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
type mmmdd = `Mar ${19 | 20 | 21}` | `Sep ${22 | 23 | 24}`
type hh = `${0 | 1}${d}` | `2${0 | 1 | 2 | 3}`
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${d}`
type EquinoxDateStr = `${mmmdd} ${hh}:${mm}`

const equinox: { [key: number]: [EquinoxDateStr, EquinoxDateStr] } = {
  2001: ['Mar 20 13:31', 'Sep 22 23:05'],
  2002: ['Mar 20 19:16', 'Sep 23 04:56'],
  2003: ['Mar 21 01:00', 'Sep 23 10:47'],
  2004: ['Mar 20 06:49', 'Sep 22 16:30'],
  2005: ['Mar 20 12:34', 'Sep 22 22:23'],
  2006: ['Mar 20 18:25', 'Sep 23 04:04'],
  2007: ['Mar 21 00:07', 'Sep 23 09:51'],
  2008: ['Mar 20 05:49', 'Sep 22 15:45'],
  2009: ['Mar 20 11:44', 'Sep 22 21:18'],
  2010: ['Mar 20 17:32', 'Sep 23 03:09'],
  2011: ['Mar 20 23:21', 'Sep 23 09:05'],
  2012: ['Mar 20 05:15', 'Sep 22 14:49'],
  2013: ['Mar 20 11:02', 'Sep 22 20:44'],
  2014: ['Mar 20 16:57', 'Sep 23 02:30'],
  2015: ['Mar 20 22:45', 'Sep 23 08:20'],
  2016: ['Mar 20 04:31', 'Sep 22 14:21'],
  2017: ['Mar 20 10:29', 'Sep 22 20:02'],
  2018: ['Mar 20 16:15', 'Sep 23 01:54'],
  2019: ['Mar 20 21:58', 'Sep 23 07:50'],
  2020: ['Mar 20 03:50', 'Sep 22 13:31'],
  2021: ['Mar 20 09:37', 'Sep 22 19:21'],
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

function getEquinoxDatesOfYear(year: number): Date[] | undefined {
  return equinox[year]?.map(dateStr => new Date(`${year} ${dateStr} UTC`))
}

export function getNextEquinox(): Date | undefined {
  const currentYear = new Date().getUTCFullYear()

  const currentYearEquinoxes = getEquinoxDatesOfYear(currentYear) ?? []
  const nextYearEquinoxes = getEquinoxDatesOfYear(currentYear + 1) ?? []
  const candidates = [...currentYearEquinoxes, ...nextYearEquinoxes]

  const nextEquinox = candidates.find(
    candidate => Date.now() < candidate.getTime(),
  )
  return nextEquinox
}

export function getPreviousEquinox(): Date | undefined {
  const currentYear = new Date().getUTCFullYear()

  const currentYearEquinoxes = getEquinoxDatesOfYear(currentYear) ?? []
  const previousYearEquinoxes = getEquinoxDatesOfYear(currentYear - 1) ?? []
  const candidates = [...previousYearEquinoxes, ...currentYearEquinoxes]

  const previousEquinox = candidates
    .reverse()
    .find(candidate => Date.now() > candidate.getTime())
  return previousEquinox
}
