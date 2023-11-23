import { Variants } from '../enums'

const getVariantByPercentage = (percentage: number): Variants => {
  if (percentage <= 0) {
    return Variants.danger
  }

  if (percentage <= 33) {
    return Variants.warning
  }

  if (percentage <= 67) {
    return Variants.info
  }

  if (percentage <= 99) {
    return Variants.primary
  }

  if (percentage >= 100) {
    return Variants.success
  }

  return Variants.danger
}

export default getVariantByPercentage
