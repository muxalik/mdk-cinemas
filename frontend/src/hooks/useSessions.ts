import { useEffect, useState } from 'react'
import { pagination, session } from '../types'
import api, { baseURL } from '../utils/api'

const useSessions = (appliedFilters: any) => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [sessions, setSessions] = useState<session[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/sessions', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          min_ticket_price: appliedFilters.minTicketPrice,
          max_ticket_price: appliedFilters.maxTicketPrice,
          min_free_places: appliedFilters.minFreePlaces,
          max_free_places: appliedFilters.maxFreePlaces,
        },
      })
      .then((response) => {
        setSessions(response.data.data)
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
    pagination,
    setPagination,
    onPageChange,
    sessions,
  }
}

export default useSessions
