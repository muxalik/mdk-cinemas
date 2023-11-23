import { useState } from 'react'
import { useOutsideClick } from './useOutsideClick'
import { isEqual } from 'lodash'

const useFilters = <filters>(defaultFilters: filters) => {
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

export default useFilters
