import { useEffect, useState } from 'react'
import api, { baseURL } from '../utils/api'
import useGenres from './useGenres'
import { movie, pagination } from '../types'

const useMovies = (appliedFilters: any) => {
  const genres = useGenres()
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<movie[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/movies', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          genres: appliedFilters.genres,
          min_price: appliedFilters.minPrice,
          max_price: appliedFilters.maxPrice,
          status: appliedFilters.status,
        },
      })
      .then((response) => {
        setMovies(response.data.data)
        setPagination({
          current:
            response.data.current_page || response.data.meta.current_page,
          total: response.data.total || response.data.meta.total,
          from: response.data.from || response.data.meta.from,
          to: response.data.to || response.data.meta.to,
          perPage: response.data.per_page || response.data.meta.per_page,
        })
      })
      .catch(console.log)
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const rows = movies?.map((movie) => {
    return [
      movie.name,
      movie.producer,
      movie.operator,
      movie.genre,
      movie.production,
      movie.awards,
      movie.duration,
      movie.status,
      movie.price,
    ]
  })

  return {
    genres,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    pagination,
    setPagination,
    onPageChange,
    rows,
  }
}

export default useMovies
