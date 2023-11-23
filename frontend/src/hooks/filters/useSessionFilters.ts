import { useState } from 'react'
import { isEqual } from 'lodash'

import { useOutsideClick } from '../useOutsideClick'

type filters = {
  minTicketPrice: number | null
  maxTicketPrice: number | null
  minFreePlaces: number | null
  maxFreePlaces: number | null
}

const defaultFilters: filters = {
  minTicketPrice: null,
  maxTicketPrice: null,
  minFreePlaces: null,
  maxFreePlaces: null,
}

const useSessionFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState<filters>(defaultFilters)
  const [currentFilters, setCurrentFilters] = useState<filters>(defaultFilters)
  const [showFilters, setShowFilters] = useState(false)
  const filtersRef = useOutsideClick(() => setShowFilters(false))
  const newFiltersAdded = !isEqual(currentFilters, appliedFilters)

  const onFiltersReset = () => {
    setCurrentFilters(defaultFilters)
  }

  const onFiltersApply = () => {
    setShowFilters(false)
    setAppliedFilters(currentFilters)
  }

  const onFiltersCancel = () => {
    setShowFilters(false)
    setCurrentFilters(appliedFilters)
  }

  return {
    appliedFilters,
    setAppliedFilters,
    currentFilters,
    setCurrentFilters,
    showFilters,
    setShowFilters,
    filtersRef,
    onFiltersReset,
    onFiltersApply,
    onFiltersCancel,
    newFiltersAdded,
  }
}

export default useSessionFilters
