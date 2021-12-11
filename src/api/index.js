import axios from 'axios'
import { STORAGE_KEY } from './consts'

export const url = 'http://127.0.0.1:8000'

const Api = axios.create({
  baseURL: url + '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      JSON.parse(atob(localStorage?.getItem(STORAGE_KEY) ?? '') || '{}')?.token,
  },
})

export default Api
