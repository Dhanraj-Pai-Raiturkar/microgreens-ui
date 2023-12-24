import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://expresscognito.onrender.com/',
  timeout: 10000
  // headers: { 'X-Custom-Header': 'foobar' }
})

export default axiosInstance
