import {ref, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {startRegistration} from '@simplewebauthn/browser'
import {IAuthItem, IRegisterOptions} from '@/interfaces/auth'

// get passkey by username
export const useGetAuthByUsername = () => {
  const data = ref<IAuthItem[]>([])
  const loading = ref(false)
  const fetchData = async (username: string) => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/auth`, {
        params: {username},
      })
      data.value = result
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {data, loading, fetchData}
}

// delete auth by id
export const useDeleteAuth = () => {
  const loading = ref(false)
  const deleteData = async (credId: string) => {
    try {
      await axios.delete(`/auth/${credId}`)
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {loading, deleteData}
}

// register auth request
export const useRegisterRequest = () => {
  const data: IRegisterOptions = reactive({
    id: '',
    rawId: '',
    authenticatorAttachment: 'platform',
    clientExtensionResults: {},
    response: {
      attestationObject: '',
      clientDataJSON: '',
    },
    transports: 'internal',
    type: 'public-key',
  })
  const loading = ref(false)
  const confirmHandler = async (username: any) => {
    try {
      loading.value = true
      const {data: options} = await axios.post(`/auth/registerRequest`, {
        username,
      })
      const registerResult = await startRegistration(options)
      Object.assign(data, registerResult)
      localStorage.setItem(`credId`, registerResult.id)
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {data, loading, confirmHandler}
}

// register auth response
export const useRegisterResponse = () => {
  const loading = ref(false)
  const confirmHandler = async (
    username: string,
    options: IRegisterOptions
  ) => {
    try {
      loading.value = true
      await axios.post(`/auth/registerResponse?username=${username}`, options)
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {loading, confirmHandler}
}
