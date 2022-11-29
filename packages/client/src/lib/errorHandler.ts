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
      errorTipFunction(
        `${
          response.data.msg ||
          response.data.message ||
          response.statusText ||
          response.data ||
          error.message
        }`
      )
    } else if (error.request) {
      errorTipFunction(`${error.message}` || `Network error`)
    } else {
      errorTipFunction(`Network error: retry after checking network status`)
    }
  } else if (isCustomError(error)) {
    if (error.code === 400001) {
      error.data && (window.location.href = error.data)
      return
    }
    errorTipFunction(`${error.message || error.msg}`)
  } else {
    errorTipFunction(`Frontend logic exception: ${(error as any).message}: `)
  }
}
