import { useMask } from '@react-input/mask'
import useGenres from '../useGenres'
import api, { baseURL } from '../../utils/api'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { option } from '../../components/UI/Select'
import { MovieStatuses } from '../../enums'

type data = {
  name: string | null
  producer: string | null
  operator: string | null
  genre: string | null
  production: string | null
  awards: string | null
  duration: string | null
  status: string | null
  price: number | null
}

const useMovie = () => {
  const navigate = useNavigate()

  const movie = useLocation().state?.movie

  const defaultData: data = {
    name: movie?.name,
    producer: movie?.producer,
    operator: movie?.operator,
    genre: movie?.genre,
    production: movie?.production,
    awards: movie?.awards,
    duration: movie?.duration,
    status: movie?.status?.value,
    price: movie?.price?.digital,
  }

  const [data, setData] = useState<data>(defaultData)

  const canBeSaved =
    Object.values(data).every(
      (value) => value !== null && value !== undefined
    ) && !isEqual(data, defaultData)

  const redirectBack = () => navigate('/movies', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/movies/${movie.id}`, {
        ...data,
        duration:
          parseInt(data.duration!.split(' ')[0]) * 60 +
          parseInt(data?.duration!.split(' ')[1]),
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const onCreate = () => {
    api
      .post(baseURL + '/movies', {
        ...data,
        duration:
          parseInt(data.duration!.split(' ')[0]) * 60 +
          parseInt(data?.duration!.split(' ')[1]),
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const durationRef = useMask({
    mask: '0h 00m',
    replacement: { '0': /\d/ },
    showMask: true,
  })

  const setField = (field: string, value: number | string) => {
    setData({
      ...data,
      [field]: value,
    })
  }

  const genresList = useGenres()

  const genres = genresList?.map((genre): option => {
    return {
      value: genre.key,
      name: genre.value,
    }
  })

  const statuses = Object.keys(MovieStatuses)
    .filter((key) => key !== 'any')
    .map((key): option => {
      return {
        name: MovieStatuses[key as keyof typeof MovieStatuses],
        value: key,
      }
    })

  return {
    onCreate,
    data,
    setField,
    durationRef,
    onCancel,
    onSave,
    canBeSaved,
    statuses,
    genres,
  }
}

export default useMovie
