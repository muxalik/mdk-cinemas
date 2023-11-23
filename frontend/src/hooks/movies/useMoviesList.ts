import { useEffect, useState } from 'react'
import { option } from '../../components/UI/Select'
import api, { baseURL } from '../../utils/api'

const useMoviesList = () => {
  const [movies, setMovies] = useState<option[]>([])

  useEffect(() => {
    api
      .get(baseURL + '/movies/list')
      .then((response) =>
        setMovies(
          response.data.data.map((cinema: { id: number; name: string }) => ({
            value: cinema.id,
            name: cinema.name,
          }))
        )
      )
      .catch(console.log)
  }, [])

  return [movies, setMovies] as const
}

export default useMoviesList
