// format new Date().toISOString() to YYYY-MM-DD hh:mm:ss
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

// get system type from userAgent
export const clientType = () => {
  let client = ''
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    client = 'iOS'
  } else if (/(Android)/i.test(navigator.userAgent)) {
    client = 'Android'
  } else {
    client = 'PC'
  }
  return client
}
