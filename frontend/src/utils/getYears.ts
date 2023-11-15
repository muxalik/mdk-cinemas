export const getYears = (startYear?: number) => {
  let years = []
  const currentYear = new Date().getFullYear()
  startYear = startYear || 1980

  while (startYear <= currentYear) {
    years.push(startYear++)
  }

  return years
}
