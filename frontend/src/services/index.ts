import axios,{type AxiosInstance} from 'axios'


const base = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem('token')

export const google_api:AxiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  headers: {
    "Content-Type": "application/json"
  }
})

export const merlins_api:AxiosInstance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
})
