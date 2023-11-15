import { useMemo } from 'react'
import { range } from '../utils/range'

interface props {
  total: number
  siblings: number
  current: number
}

export const DOTS = '...'

export const usePagination = ({
  total,
  siblings,
  current,
}: props): (number | typeof DOTS)[] => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblings + first + last + current + 2 * dots
    const totalNumbers = siblings + 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..total]
    */
    if (totalNumbers >= total) {
      return range(1, total)
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and total
    */
    const leftSiblingIndex = Math.max(current - siblings, 1)
    const rightSiblingIndex = Math.min(current + siblings, total)

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and total. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < total - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < total - 2

    const firstPageIndex = 1
    const lastPageIndex = total

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblings
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, total]
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings
      let rightRange = range(total - rightItemCount + 1, total)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [total, siblings, current])

  return paginationRange as []
}
