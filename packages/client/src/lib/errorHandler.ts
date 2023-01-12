import type {AxiosError, AxiosResponse} from 'axios'
import {ElMessage} from 'element-plus'
// unplugin-vue-components el-message bug
import 'element-plus/theme-chalk/el-message.css'

export function isAxiosError(object: any): object is AxiosError {
  return object.config !== undefined
}

export function isCustomError(object: any): object is any {
  return object.code !== undefined
}

const errorTipFunction = (e: any) => {
  ElMessage({
    showClose: true,
    message: e,
    type: 'error',
    grouping: true,
    duration: 3000,
  })
}

export function handleError(error: any) {
  if (isAxiosError(error)) {
    if (error.response) {
      const response = error.response as AxiosResponse<any>
      if (response.data.code === 401) {
        return (location.href = location.origin)
      }
      errorTipFunction(
        `${
          response.data?.message?.code ||
          response.data?.message ||
          response.statusText ||
          response.data ||
          error?.message
        }`
      )
    } else if (error.request) {
      errorTipFunction(`${error?.message}` || `Network error`)
    } else {
      errorTipFunction(`Network error: retry after checking network status`)
    }
  } else if (isCustomError(error)) {
    errorTipFunction(`${error?.message}`)
  } else {
    errorTipFunction(`Frontend logic exception: ${(error as any)?.message}: `)
  }
}
