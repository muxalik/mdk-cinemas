import { useState } from 'react'

const useSort = () => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setOrder] = useState<'asc' | 'desc'>('asc')

  const setSortOrder = (colName: string) => {
    setOrder(
      colName === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    )
  }

  const toggleSort = (colName: string) => {
    setSortBy(colName)
    setSortOrder(colName)
  }

  return {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    toggleSort,
  }
}

export default useSort
