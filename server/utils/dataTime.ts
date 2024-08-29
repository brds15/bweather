import { DateTime } from 'luxon'

export function timestampToHour(timestamp: number): string {
  const dateTime = DateTime.fromSeconds(timestamp)

  return dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)
}

export function timestampToDate(timestamp: number): string {
  const dateTime = DateTime.fromSeconds(timestamp)

  return dateTime.toFormat('DD/MM');
}
