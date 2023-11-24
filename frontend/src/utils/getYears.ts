export const getYears = (startYear?: number) => {
  let years = []

  const currentYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).getFullYear()

  startYear = startYear || currentYear - 1

  while (startYear <= currentYear) {
    years.push(startYear++)
  }

  return years
}
