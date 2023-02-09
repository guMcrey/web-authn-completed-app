import {ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {useRouter} from 'vue-router'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {startRegistration, startAuthentication} from '@simplewebauthn/browser'
import {IAuthItem, IRegisterOptions} from '@/interfaces/auth'
import {clientType} from '@/lib/functions'
import {useI18n} from 'vue-i18n'

const isAndroid = clientType() === 'Android' ? true : false

// get passkey by username
export const useGetAuthByUsername = () => {
  const data = ref<IAuthItem[]>([])
  const loading = ref(false)
  const {locale} = useI18n()

  const fetchData = async (username: string) => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/auth?lang=${locale.value}`, {
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
  const {t, locale} = useI18n()

  const deleteData = async (credId: string) => {
    try {
      await axios.delete(`/auth/${credId}?lang=${locale.value}`)
      ElMessage({
        type: 'success',
        message: t('message.deleteSuccess'),
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
  const {locale} = useI18n()

  const confirmHandler = async (username: string) => {
    try {
      loading.value = true
      const {data: options} = await axios.post(
        `/auth/registerRequest?lang=${locale.value}`,
        {
          username,
          isAndroid,
        }
      )
      const registerResult = await startRegistration(options)
      Object.assign(data, registerResult)
      localStorage.setItem(`credId`, registerResult.id)
    } catch (e) {
      const errorObj = e as any
      const errorList = isAndroid
        ? ['NotAllowedError']
        : ['InvalidStateError', 'NotAllowedError']
      if (errorList.includes(errorObj.name)) {
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
  const {locale} = useI18n()

  const confirmHandler = async (
    username: string,
    options: IRegisterOptions
  ) => {
    try {
      loading.value = true
      await axios.post(
        `/auth/registerResponse?username=${username}&lang=${locale.value}`,
        options
      )
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
  const {t, locale} = useI18n()

  const confirmHandler = async (username?: string) => {
    try {
      loading.value = true
      const opts = {}
      const credId = localStorage.getItem('credId') || ''
      let postUrl = `/auth/signinRequest?lang=${locale.value}`

      if (isAndroid) {
        if (!credId) {
          ElMessageBox.alert(
            `<p><strong>${t(
              'message.passkeyNotAvailableSubtitle'
            )}</strong></p><p>${t('message.passkeyNotAvailableNoCatch')}</p>`,
            t('message.passkeyNotAvailableTitle'),
            {
              type: 'info',
              confirmButtonText: t('message.confirmData'),
              dangerouslyUseHTMLString: true,
            }
          )
          return
        }
        postUrl = `/auth/signinRequest?credId=${encodeURIComponent(
          credId
        )}&username=${username}&isAndroid=${isAndroid}&lang=${locale.value}`
      }

      const {data: options} = await axios.post(postUrl, opts)
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
  const {t, locale} = useI18n()

  const confirmHandler = async (
    options: IRegisterOptions,
    username?: string
  ) => {
    try {
      loading.value = true
      const {data: resultData} = await axios.post(
        `/auth/signinResponse?lang=${locale.value}`,
        options
      )
      localStorage.setItem('username', resultData.username || username)
      Object.assign(data, resultData)
      window.scrollTo(0, 0)
      router.push('/example/home')
    } catch (e) {
      const errorCode = (e as any)?.code
      if (errorCode === 404) {
        return ElMessageBox.alert(
          t('message.noPublicKeyDescription'),
          t('message.noPublicKey'),
          {
            confirmButtonText: t('message.confirmData'),
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
