import { useEffect, useState } from 'react'
import { option } from '../../components/UI/Select'
import api, { baseURL } from '../../utils/api'

const useCinemaList = () => {
  const [cinemas, setCinemas] = useState<option[]>([])

  useEffect(() => {
    api
      .get(baseURL + '/cinemas/list')
      .then((response) =>
        setCinemas(
          response.data.data.map((cinema: { id: number; name: string }) => ({
            value: cinema.id,
            name: cinema.name,
          }))
        )
      )
      .catch(console.log)
  }, [])

  return [cinemas, setCinemas] as const
}

export default useCinemaList
