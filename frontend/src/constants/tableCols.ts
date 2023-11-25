export type tableCol = {
  key: string
  sort: string
  value: string
  oneLine?: true
}

export const actorCols: tableCol[] = [
  {
    key: 'name',
    sort: 'name',
    value: 'Name',
  },
  {
    key: 'total_movies',
    sort: 'total_movies',
    value: 'Total movies',
  },
  {
    key: 'main_role_movies',
    sort: 'main_role_movies',
    value: 'Main role movies',
  },
]

export const cinemaCols: tableCol[] = [
  {
    key: 'name',
    sort: 'name',
    value: 'Cinema',
  },
  {
    key: 'district',
    sort: 'district',
    value: 'District',
  },
  {
    key: 'address',
    sort: 'address',
    value: 'Address',
  },
  {
    key: 'capacity',
    sort: 'capacity',
    value: 'Capacity',
  },
  {
    key: 'status.locale',
    sort: 'status',
    value: 'Status',
  },
]

export const movieCols: tableCol[] = [
  {
    key: 'name',
    sort: 'name',
    value: 'Movie',
  },
  {
    key: 'producer',
    sort: 'producer',
    value: 'Producer',
  },
  {
    key: 'operator',
    sort: 'operator',
    value: 'Operator',
  },
  {
    key: 'genre',
    sort: 'genre',
    value: 'Genre',
  },
  {
    key: 'production',
    sort: 'production',
    value: 'Production',
  },
  {
    key: 'awards',
    sort: 'awards',
    value: 'Awards',
  },
  {
    key: 'duration',
    sort: 'duration',
    value: 'Duration',
    oneLine: true,
  },
  {
    key: 'status.locale',
    sort: 'status',
    value: 'Status',
    oneLine: true,
  },
  {
    key: 'price.formatted',
    sort: 'price',
    value: 'Price',
    oneLine: true,
  },
]

export const sessionCols: tableCol[] = [
  {
    key: 'cinema.name',
    sort: 'cinema',
    value: 'Cinema',
  },
  {
    key: 'movie.name',
    sort: 'movie',
    value: 'Movie',
  },
  {
    key: 'ticket_price.formatted',
    sort: 'ticket_price',
    value: 'Ticket price',
  },
  {
    key: 'free_places',
    sort: 'free_places',
    value: 'Free places',
  },
  {
    key: 'starts_at',
    sort: 'starts',
    value: 'Starts',
  },
]
