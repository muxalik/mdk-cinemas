import { useLocation, useNavigate } from 'react-router-dom'
import { option } from '../../components/UI/Select'
import { useState } from 'react'
import { isEqual } from 'lodash'
import api, { baseURL } from '../../utils/api'
import useMoviesList from '../movies/useMoviesList'
import useActorMovies from '../movies/useActorMovies'


const useActor = () => {
  const navigate = useNavigate()

  // const moviesList = useMoviesList()

  
  const {
    sortBy,
    sortOrder,
    actorMovies,
    fakeDelete,
    saveActorMovies,
    toggleSort,
  } = useActorMovies()

  

  

  const canBeSaved =
    !isEqual(defaultData, data) &&
    Object.values(data).every((value) => value !== null && value !== undefined)

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
    // moviesList,
    data,
    setField,
    onCancel,
    onSave,
    onCreate,
    canBeSaved,
  }
}

export default useActor
