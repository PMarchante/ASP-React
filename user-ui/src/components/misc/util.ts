//a helper function that combines the date and time properties and returns a new date object with them both
export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00'
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateString = `${year}=${month}-${day}`

  return new Date(dateString + ' ' + timeString)
}
