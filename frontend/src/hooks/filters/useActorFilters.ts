import { useState } from 'react'
import { isEqual } from 'lodash'

import { useOutsideClick } from '../useOutsideClick'

type filters = {
  minMovies: number | null
  maxMovies: number | null
  minMainRoles: number | null
  maxMainRoles: number | null
}

const defaultFilters: filters = {
  minMovies: null,
  maxMovies: null,
  minMainRoles: null,
  maxMainRoles: null,
}

const useActorFilters = () => {
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

export default useActorFilters
