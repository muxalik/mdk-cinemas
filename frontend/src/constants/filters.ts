import { CinemaStatuses } from '../enums'
import { cinemaFilters } from '../types'

type cinemaStatus = {
  key: CinemaStatuses
  name: string
}

export const cinemaDefaultFilters: cinemaFilters = {
  minCapacity: null,
  maxCapacity: null,
  status: CinemaStatuses.any,
}

export const cinemaStatuses: cinemaStatus[] = [
  {
    key: CinemaStatuses.opened,
    name: 'Only opened',
  },
  {
    key: CinemaStatuses.closed,
    name: 'Only Closed',
  },
  {
    key: CinemaStatuses.any,
    name: 'Any',
  },
]
