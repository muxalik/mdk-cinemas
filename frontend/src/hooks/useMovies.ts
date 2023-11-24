import { useEffect, useState } from 'react'
import api, { baseURL } from '../utils/api'
import useGenres from './useGenres'
import { movie, pagination } from '../types'
import { useNavigate } from 'react-router-dom'
import useSort from './useSort'

const useMovies = (appliedFilters: any) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<movie[]>([])
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSort()
  const genres = useGenres()

  const fetchMovies = () => {
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
  }

  useEffect(() => {
    fetchMovies()
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const deleteMovie = (id: number) => {
    api
      .delete(baseURL + `/movies/${id}`)
      .then(() => {
        fetchMovies()
      })
      .catch(console.log)
  }

  const editMovie = (id: number) => {
    navigate(`/movies/${id}/edit`, {
      state: { movie: movies.find((movie) => movie.id === id) },
    })
  }

  const onColumnClick = (colName: string) => {
    setSortBy(colName)
    setSortOrder(colName)
  }

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
    movies,
    editMovie,
    deleteMovie,
    onColumnClick,
  }
}

export default useMovies
