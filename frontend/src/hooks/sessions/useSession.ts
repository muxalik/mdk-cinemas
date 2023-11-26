import { useState } from 'react'
import { isEqual } from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'
import api, { baseURL } from '../../utils/api'

type data = {
  cinemaId: number | null
  movieId: number | null
  ticketPrice: number | null
  freePlaces: number | null
  startsAt: string | null
}

const useSession = () => {
  const navigate = useNavigate()
  const { session } = useLocation().state

  const defaultData: data = {
    cinemaId: session?.cinema?.id,
    movieId: session?.movie?.id,
    ticketPrice: session?.ticket_price?.digital,
    freePlaces: session?.free_places,
    startsAt: session?.starts_at,
  }

  const [data, setData] = useState(defaultData)

  const canBeSaved = !isEqual(defaultData, data)

  const redirectBack = () => navigate('/sessions', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/sessions/${session.id}`, {
        cinema: data.cinemaId,
        movie: data.movieId,
        ticket_price: data.ticketPrice,
        free_places: data.freePlaces,
        starts_at: data.startsAt,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const setField = (field: string, value: number | string) => {
    setData({
      ...data,
      [field]: value,
    })
  }

  return {
    data,
    setField,
    onCancel,
    onSave,
    canBeSaved,
  }
}

export default useSession
