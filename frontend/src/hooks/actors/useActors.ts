import { useEffect, useState } from 'react'
import { actor, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import useSort from '../useSort'

const useActors = (appliedFilters: any) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [actors, setActors] = useState<actor[]>([])
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })
  const { sortBy, sortOrder, toggleSort } = useSort()

  const fetchActors = () => {
    api
      .get(baseURL + '/actors', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          min_movies: appliedFilters.minMovies,
          max_movies: appliedFilters.maxMovies,
          min_main_roles: appliedFilters.minMainRoles,
          max_main_roles: appliedFilters.maxMainRoles,
        },
      })
      .then((response) => {
        setActors(response.data.data)
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
    fetchActors()
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const deleteActor = (id: number) => {
    api
      .delete(baseURL + `/actors/${id}`)
      .then(() => {
        fetchActors()
      })
      .catch(console.log)
  }

  const editActor = (id: number) => {
    navigate(`/actors/${id}/edit`, {
      state: { actor: actors.find((actor) => actor.id === id) },
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
    setQuery,
    actors,
    pagination,
    setPagination,
    onPageChange,
    editActor,
    deleteActor,
    toggleSort,
    onSearch,
  }
}

export default useActors
