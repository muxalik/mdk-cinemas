import { useLocation, useNavigate } from 'react-router-dom'
import { option } from '../../components/UI/Select'
import { useState } from 'react'
import { isEqual } from 'lodash'
import api, { baseURL } from '../../utils/api'
import useMoviesList from '../movies/useMoviesList'

type data = {
  name: string | null
  movies: option[]
  total_movies: number | null
  main_role_movies: number | null
}

const useActor = () => {
  const navigate = useNavigate()

  const moviesList = useMoviesList()

  const state = useLocation().state
  const actor = state?.actor

  const defaultData: data = {
    name: actor?.name,
    movies: [],
    total_movies: actor?.total_movies,
    main_role_movies: actor?.main_role_movies,
  }

  const [data, setData] = useState<data>(defaultData)

  const setField = (field: string, value: string | number) => {
    setData({
      ...data,
      [field]: value,
    })
  }

  const canBeSaved =
    !isEqual(defaultData, data) &&
    Object.values(data).every((value) => value !== null && value !== undefined)

  const redirectBack = () => navigate('/actors', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/actors/${actor.id}`, data)
      .then(redirectBack)
      .catch(console.log)
  }

  const onCreate = () => {
    api
      .post(baseURL + '/actors', data)
      .then(redirectBack)
      .catch(console.log)
  }

  return {
    actor,
    moviesList,
    data,
    setField,
    onCancel,
    onSave,
    onCreate,
    canBeSaved,
  }
}

export default useActor
