export type cinema = {
  id: number
  name: string
  district: string
  address: string
  category: string
  capacity: number
  is_opened: boolean
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
  is_available: boolean
  price: string
}

export type actor = {
  id: number
  name: string
  movies_count: number
}

export type session = {
  id: number
  cinema: string
  movie: string
  ticket_price: string
  free_places: number
  starts_at: string
}
