import { useLocation, useNavigate } from 'react-router-dom'
import { option } from '../../components/UI/Select'
import { CinemaStatuses } from '../../enums'
import { useState } from 'react'
import { isEqual } from 'lodash'
import api, { baseURL } from '../../utils/api'

type data = {
  name: string | null
  district: string | null
  address: string | null
  category: string | null
  capacity: number | null
  status: string | null
}

const useCinema = () => {
  const navigate = useNavigate()

  const state = useLocation().state
  const cinema = state?.cinema

  const defaultData: data = {
    name: cinema?.name,
    district: cinema?.district,
    address: cinema?.address,
    category: cinema?.category,
    capacity: cinema?.capacity,
    status: cinema?.status?.value,
  }

  const [data, setData] = useState<data>(defaultData)

  const statuses = Object.keys(CinemaStatuses)
    .filter((key) => key !== 'any')
    .map((key): option => {
      return {
        name: CinemaStatuses[key as keyof typeof CinemaStatuses],
        value: key,
      }
    })

  const setField = (field: string, value: string | number) => {
    setData({
      ...data,
      [field]: value,
    })
  }

  const canBeSaved =
    !isEqual(defaultData, data) &&
    Object.values(data).every((value) => value !== null && value !== undefined)

  const redirectBack = () => navigate('/cinemas', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/cinemas/${cinema.id}`, data)
      .then(redirectBack)
      .catch(console.log)
  }

  const onCreate = () => {
    api
      .post(baseURL + '/cinemas', data)
      .then(redirectBack)
      .catch(console.log)
  }

  return {
    data,
    setField,
    statuses,
    onCancel,
    onSave,
    onCreate,
    canBeSaved,
  }
}

export default useCinema
