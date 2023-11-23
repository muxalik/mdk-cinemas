const dateToDateTime = (date: Date) => {
  return date.toISOString().split('.')[0].split('T').join(' ')
}

export default dateToDateTime
