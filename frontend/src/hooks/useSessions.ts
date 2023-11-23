import { useEffect, useState } from 'react'
import { pagination, session } from '../types'
import api, { baseURL } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import useSort from './useSort'

const useSessions = (appliedFilters: any) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sessions, setSessions] = useState<session[]>([])
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSort()

  const fetchSessions = () => {
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
  }

  useEffect(() => {
    fetchSessions()
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const deleteSession = (id: number) => {
    api
      .delete(baseURL + `/sessions/${id}`)
      .then(() => {
        fetchSessions()
      })
      .catch(console.log)
  }

  const editSession = (id: number) => {
    navigate(`/sessions/${id}/edit`, {
      state: { session: sessions.find((session) => session.id === id) },
    })
  }

  const onColumnClick = (colName: string) => {
    setSortBy(colName)
    setSortOrder(colName)
  }

  return {
    sortBy,
    sortOrder,
    query,
    setQuery,
    pagination,
    setPagination,
    onPageChange,
    sessions,
    editSession,
    deleteSession,
    onColumnClick,
  }
}

export default useSessions
