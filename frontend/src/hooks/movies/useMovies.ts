import { useEffect, useState } from 'react'
import api, { baseURL } from '../../utils/api'
import useGenres from '../useGenres'
import { movie, pagination } from '../../types'
import { useNavigate } from 'react-router-dom'
import useSort from '../useSort'
import { MovieStatuses } from '../../enums'
import { option } from '../../components/UI/Select'

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
  const { sortBy, sortOrder, toggleSort } = useSort()
  const genres = useGenres()

  const statuses = Object.keys(MovieStatuses)
    .filter((key) => key !== 'any')
    .map((key): option => {
      return {
        name: MovieStatuses[key as keyof typeof MovieStatuses],
        value: key,
      }
    })

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

  const onSearch = (value: string) => {
    setPagination((prev) => {
      return {
        ...prev,
        current: 1,
      }
    })
    setQuery(value)
  }

  return {
    genres,
    sortBy,
    sortOrder,
    query,
    pagination,
    movies,
    onPageChange,
    editMovie,
    deleteMovie,
    toggleSort,
    onSearch,
    statuses,
  }
}

export default useMovies
