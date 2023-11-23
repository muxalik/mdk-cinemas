export type cinema = {
  id: number
  name: string
  district: string
  address: string
  category: string
  capacity: number
  status: string
}

export type movie = {
  id: number
  name: string
  producer: string
  operator: string
  genre: string
  production: string
  awards: string
  duration: string
  status: string
  price: string
}

export type actor = {
  id: number
  name: string
  total_movies: number
  main_role_movies: number
}

export type session = {
  id: number
  cinema: string
  movie: string
  ticket_price: string
  free_places: number
  starts_at: string
}

export type pagination = {
  current: number | null
  total: number | null
  from: number | null
  to: number | null
  perPage: number | null
}

export type genre = {
  key: string
  value: string
}

// FILTERS

export type cinemaFilters = {
  minCapacity: number | null
  maxCapacity: number | null
  status: 'opened' | 'closed' | 'any'
}

export const cinemaDefaultFilters: cinemaFilters = {
  minCapacity: null,
  maxCapacity: null,
  status: 'any',
}

export type sessionFilters = {
  minTicketPrice: number | null
  maxTicketPrice: number | null
  minFreePlaces: number | null
  maxFreePlaces: number | null
}

export const sessionDefaultFilters: sessionFilters = {
  minTicketPrice: null,
  maxTicketPrice: null,
  minFreePlaces: null,
  maxFreePlaces: null,
}

export type movieFilters = {
  genres: string[]
  minPrice: number | null
  maxPrice: number | null
  status: 'available' | 'not_available' | null
  minDuration: string | null
  maxDuration: string | null
}

export const movieDefaultFilters: movieFilters = {
  genres: [],
  minPrice: null,
  maxPrice: null,
  status: null,
  minDuration: null,
  maxDuration: null,
}

export type actorFilters = {
  minMovies: number | null
  maxMovies: number | null
  minMainRoles: number | null
  maxMainRoles: number | null
}

export const actorDefaultFilters: actorFilters = {
  minMovies: null,
  maxMovies: null,
  minMainRoles: null,
  maxMainRoles: null,
}

export type breadcrumbLink = {
  title: string
  to: string
}
