import { getDatesDiffInDays } from './date'

test('getDatesDiffInDays returns 0 when dates are the same', () => {
  let date1 = new Date('2022-01-01')
  let date2 = new Date('2022-01-01')
  expect(getDatesDiffInDays(date1, date2)).toBe(0)

  date1 = new Date()
  date2 = new Date()
  expect(getDatesDiffInDays(date1, date2)).toBe(0)
})

test('getDatesDiffInDays returns correct diff when date2 is bigger than date1', () => {
  const date1 = new Date('2022-01-02')
  const date2 = new Date('2022-01-05')
  expect(getDatesDiffInDays(date1, date2)).toBe(3)
})

test('getDatesDiffInDays returns correct diff when date1 is bigger than date2', () => {
  const date1 = new Date('2022-01-04')
  const date2 = new Date('2022-01-03')
  expect(getDatesDiffInDays(date1, date2)).toBe(1)
})
