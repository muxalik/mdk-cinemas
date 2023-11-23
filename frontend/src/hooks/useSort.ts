import { useState } from 'react'

const useSort = () => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setOrder] = useState<'asc' | 'desc'>('asc')

  const setSortOrder = (colName: string) => {
    setOrder(
      colName === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    )
  }

  return {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  }
}

export default useSort
