import { DateTime } from 'luxon'

function timestampToHour(timestamp: number): string {
  const dateTime = DateTime.fromSeconds(timestamp)

  return dateTime.toLocaleString(DateTime.TIME_SIMPLE)
}

export default timestampToHour
