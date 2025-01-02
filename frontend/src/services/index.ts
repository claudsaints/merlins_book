import axios,{type AxiosInstance} from 'axios'


const base = import.meta.env.BASE_URL;

export const google_api:AxiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  headers: {
    "Content-Type": "application/json"
  }
})

export const merlins_api:AxiosInstance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json"

  }
})
