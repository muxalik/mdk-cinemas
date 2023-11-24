const onlyDigits = (string: string): string => {
  return string.replace(/\D/g, '')
}

export default onlyDigits
