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
