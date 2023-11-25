import { option } from '../components/UI/Select'
import { cinemaFilters, movieFilters } from '../types'

export const cinemaDefaultFilters: cinemaFilters = {
  minCapacity: null,
  maxCapacity: null,
  status: 'any',
}

export const cinemaStatuses: option[] = [
  {
    value: 'opened',
    name: 'Only opened',
  },
  {
    value: 'closed',
    name: 'Only Closed',
  },
  {
    value: 'any',
    name: 'Any',
  },
]

export const movieDefaultFilters: movieFilters = {
  genres: [],
  minPrice: null,
  maxPrice: null,
  status: 'any',
  minDuration: null,
  maxDuration: null,
}

export const movieStatuses: option[] = [
  {
    value: 'available',
    name: 'Available',
  },
  {
    value: 'closed',
    name: 'Closed',
  },
  {
    value: 'any',
    name: 'Any',
  },
]
