import axios,{type AxiosInstance} from 'axios'


export const google_api:AxiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  headers: {
    "Content-Type": "application/json"
  }


})
