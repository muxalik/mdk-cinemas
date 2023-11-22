import { useState } from 'react'
import { isEqual } from 'lodash'

import { useOutsideClick } from '../useOutsideClick'

type filters = {
  genres: string[]
  minPrice: number | null
  maxPrice: number | null
  status: 'available' | 'not_available' | null
  minDuration: string | null
  maxDuration: string | null
}

const defaultFilters: filters = {
  genres: [],
  minPrice: null,
  maxPrice: null,
  status: null,
  minDuration: null,
  maxDuration: null,
}

const useMovieFilters = () => {
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

export default useMovieFilters
