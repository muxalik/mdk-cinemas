import { useEffect, useState } from 'react'
import api, { baseURL } from '../../utils/api'
import { actorMovie } from '../../types'
import useSort from '../useSort'
import { useLocation } from 'react-router-dom'

const useActorMovies = () => {
  const [actorMovies, setActorMovies] = useState<actorMovie[]>([])
  const { sortBy, sortOrder, toggleSort } = useSort()

  const state = useLocation().state
  const actor = state?.actor

  const fetchActorMovies = () => {
    api
      .get(baseURL + `/actors/${actor.id}/movies`, {
        params: {
          sort: sortBy,
          order: sortOrder,
        },
      })
      .then((response) => {
        console.log(response.data.data)

        setActorMovies(response.data.data)
      })
      .catch(console.log)
  }

  useEffect(() => {
    fetchActorMovies()
  }, [sortBy, sortOrder])

  const deleteActorMovie = (actorId: number, movieId: number) => {
    api
      .delete(baseURL + `/actors/${actorId}/movies/${movieId}`)
      .then(() => {
        fetchActorMovies()
      })
      .catch(console.log)
  }

  return {
    sortBy,
    sortOrder,
    actorMovies,
    deleteActorMovie,
    toggleSort,
  }
}

export default useActorMovies
