export type EventDateParts = {
  weekday?: string
  day: string
  month: string
  year: string
}

export function getEventDateParts(value: string, includeWeekday = true): EventDateParts {
  const date = new Date(value)

  const compact = (part: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString('pt-BR', part).replace('.', '')

  return {
    weekday: includeWeekday ? compact({ weekday: 'short' }) : undefined,
    day: compact({ day: '2-digit' }),
    month: compact({ month: 'short' }),
    year: compact({ year: 'numeric' }),
  }
}
