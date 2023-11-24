import { useEffect, useState } from 'react'
import { cinema, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import useSort from '../useSort'

const useCinemas = (appliedFilters: any) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [cinemas, setCinemas] = useState<cinema[]>([])
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })
  const { sortBy, sortOrder, toggleSort } = useSort()

  const fetchCinemas = () => {
    api
      .get(baseURL + '/cinemas', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          min_capacity: appliedFilters.minCapacity,
          max_capacity: appliedFilters.maxCapacity,
          status: appliedFilters.status,
        },
      })
      .then((response) => {
        setCinemas(response.data.data)
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
    fetchCinemas()
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const deleteCinema = (id: number) => {
    api
      .delete(baseURL + `/cinemas/${id}`)
      .then(() => {
        fetchCinemas()
      })
      .catch(console.log)
  }

  const editCinema = (id: number) => {
    navigate(`/cinemas/${id}/edit`, {
      state: { cinema: cinemas.find((cinema) => cinema.id === id) },
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
    sortBy,
    sortOrder,
    query,
    pagination,
    cinemas,
    onPageChange,
    editCinema,
    deleteCinema,
    toggleSort,
    onSearch,
  }
}

export default useCinemas
