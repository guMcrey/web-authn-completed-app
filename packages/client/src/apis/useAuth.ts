import {ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {useRouter} from 'vue-router'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {startRegistration, startAuthentication} from '@simplewebauthn/browser'
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
  const confirmHandler = async (username: string) => {
    try {
      loading.value = true
      const {data: options} = await axios.post(`/auth/registerRequest`, {
        username,
      })
      const registerResult = await startRegistration(options)
      Object.assign(data, registerResult)
    } catch (e) {
      const errorObj = e as any
      if (['InvalidStateError', 'NotAllowedError'].includes(errorObj.name)) {
        return console.warn(errorObj.message)
      }
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

// sign in with passkey request
export const useSignInRequest = () => {
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
  const confirmHandler = async () => {
    try {
      loading.value = true
      const opts = {}

      const {data: options} = await axios.post(`/auth/signinRequest`, opts)
      const signInRequestData = await startAuthentication(options)

      Object.assign(data, signInRequestData)
    } catch (e) {
      const errorObj = e as any
      if (errorObj.name === 'NotAllowedError') {
        return console.warn(errorObj.message)
      }
      handleError(e)
    } finally {
      loading.value = false
    }
  }
  return {data, loading, confirmHandler}
}

// sign in with passkey response
export const useSignInResponse = () => {
  const loading = ref(false)
  const data: IAuthItem = reactive({
    credId: '',
  })
  const router = useRouter()
  const confirmHandler = async (options: IRegisterOptions) => {
    try {
      loading.value = true
      const {data: resultData} = await axios.post(
        '/auth/signinResponse',
        options
      )
      localStorage.setItem('username', resultData.username)
      Object.assign(data, resultData)
      router.push('/home')
    } catch (e) {
      const errorCode = (e as any)?.code
      if (errorCode === 404) {
        return ElMessageBox.alert(
          'The public key associated with the user was not found. Unable to authenticate login now. Please log in with another method and register the passkey and try again.',
          'No valid public key was matched',
          {
            confirmButtonText: 'OK',
          }
        )
      }
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {data, loading, confirmHandler}
}
