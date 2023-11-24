import { cinemaFilters } from '../types'

type cinemaStatus = {
  key: string
  name: string
}

export const cinemaDefaultFilters: cinemaFilters = {
  minCapacity: null,
  maxCapacity: null,
  status: 'any',
}

export const cinemaStatuses: cinemaStatus[] = [
  {
    key: 'opened',
    name: 'Only opened',
  },
  {
    key: 'closed',
    name: 'Only Closed',
  },
  {
    key: 'any',
    name: 'Any',
  },
]
