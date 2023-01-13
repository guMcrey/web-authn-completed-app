export const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return
  const date = new Date(dateStr)
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  )
}

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0')
}
