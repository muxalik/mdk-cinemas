import { useEffect, useState } from 'react'
import { genre } from '../types'
import api, { baseURL } from '../utils/api'

const useGenres = () => {
  const [genres, setGenres] = useState<genre[] | null>()

  useEffect(() => {
    api
      .get(baseURL + '/genres')
      .then((response) => {
        setGenres(response.data)
      })
      .catch(console.log)
  }, [])

  return genres
}

export default useGenres
