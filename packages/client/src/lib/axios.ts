import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import _Vue from 'vue'

export interface IAxiosResponse<T> extends AxiosResponse {
  code: number
  data: T
  msg: string
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
})

const requestInterceptor = (config: AxiosRequestConfig) => {
  return config
}

const responseInterceptor = (response: AxiosResponse<IAxiosResponse<any>>) => {
  if (
    response.status === 200 &&
    response.data?.code &&
    response.data.code !== 200
  ) {
    throw response.data
  }
  return response
}

instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use(responseInterceptor)

export { instance as axios }
