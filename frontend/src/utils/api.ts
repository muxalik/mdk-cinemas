import axios from 'axios'

export const baseURL = 'https://my-magic-art.online:8000/api'

const api = axios.create()

;(async function () {
  try {
    const response = await axios.get('/sanctum/csrf-cookie', {
      baseURL: 'https://my-magic-art.online:8000',
    })

    api.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token
  } catch (error) {
    console.error('Error fetching CSRF token', error)
  }
})()

export default api
