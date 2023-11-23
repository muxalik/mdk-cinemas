export type tableCol = {
  key: string
  value: string
  oneLine?: true
}

export const actorCols: tableCol[] = [
  {
    key: 'name',
    value: 'Name',
  },
  {
    key: 'total_movies',
    value: 'Total movies',
  },
  {
    key: 'main_role_movies',
    value: 'Main role movies',
  },
]

export const cinemaCols: tableCol[] = [
  {
    key: 'cinema',
    value: 'Cinema',
  },
  {
    key: 'district',
    value: 'District',
  },
  {
    key: 'address',
    value: 'Address',
  },
  {
    key: 'capacity',
    value: 'Capacity',
  },
  {
    key: 'status',
    value: 'Status',
  },
]

export const movieCols: tableCol[] = [
  {
    key: 'name',
    value: 'Name',
  },
  {
    key: 'producer',
    value: 'Producer',
  },
  {
    key: 'operator',
    value: 'Operator',
  },
  {
    key: 'genre',
    value: 'Genre',
  },
  {
    key: 'production',
    value: 'Production',
  },
  {
    key: 'awards',
    value: 'Awards',
  },
  {
    key: 'duration',
    value: 'Duration',
    oneLine: true,
  },
  {
    key: 'status',
    value: 'Status',
    oneLine: true,
  },
  {
    key: 'price',
    value: 'Price',
    oneLine: true,
  },
]

export const sessionCols: tableCol[] = [
  {
    key: 'cinema',
    value: 'Cinema',
  },
  {
    key: 'movie',
    value: 'Movie',
  },
  {
    key: 'ticket_price',
    value: 'Ticket price',
  },
  {
    key: 'free_places',
    value: 'Free places',
  },
  {
    key: 'starts',
    value: 'Starts',
  },
]
