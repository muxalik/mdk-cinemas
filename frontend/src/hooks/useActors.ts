import { useEffect, useState } from 'react'
import { actor, pagination } from '../types'
import api, { baseURL } from '../utils/api'

const useActors = (appliedFilters: any) => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [actors, setActors] = useState<actor[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
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
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  return {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    actors,
    pagination,
    setPagination,
    onPageChange,
  }
}

export default useActors
