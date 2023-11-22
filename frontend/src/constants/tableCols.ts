export type tableCol = {
  key: string
  value: string
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

export const movieCols: string[] = [
  'Name',
  'Producer',
  'Operator',
  'Genre',
  'Production',
  'Awards',
  'Duration',
  'Status',
  'Price',
]

export const sessionCols: string[] = [
  'Cinema',
  'Movie',
  'Ticket price',
  'Free places',
  'Starts',
]
