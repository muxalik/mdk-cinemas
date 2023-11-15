export const formatNotificationNumber = (value: number): string => {
  if (value <= 99) {
    return value.toString()
  }

  if (value <= 999) {
    return '99+'
  }

  if (value <= 9999) {
    return (value / 1000).toFixed(0).toString() + 'k+'
  }

  return '10k+'
}
