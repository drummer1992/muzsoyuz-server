export const trimTime = date => {
  date = new Date(date)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  return date
}

export const isDate = dateAsString => !Number.isNaN(Number(new Date(dateAsString)))
export const isFutureDate = date => new Date(date).getTime() > trimTime(Date.now()).getTime()
