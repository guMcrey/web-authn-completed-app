import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'

// login user: check session
export const useLoginUser = () => {
  const loading = ref(false)
  const router = useRouter()
  const {locale} = useI18n()

  const fetchData = async () => {
    try {
      loading.value = true
      const {data} = await axios.get(`/is-login?lang=${locale.value}`)
      if (
        data.code === 200 &&
        ['/example/login', '/example/home', '/example'].includes(
          router.options.history.location
        )
      ) {
        window.scrollTo(0, 0)
        router.push('/example/home')
      }
    } catch (err) {
      router.push('/example/login')
    } finally {
      loading.value = false
    }
  }

  return {loading, fetchData}
}

// sign in with username, password
export const useLogin = () => {
  const loading = ref(false)
  const router = useRouter()
  const {t, locale} = useI18n()

  const fetchData = async (username: string, password: string) => {
    try {
      loading.value = true
      await axios.post(`/login?lang=${locale.value}`, {username, password})
      ElMessage.success(t('message.loginSuccess'))
      window.scrollTo(0, 0)
      router.push('/example/home')
      localStorage.setItem('username', username)
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {loading, fetchData}
}

// logout
export const useLogout = () => {
  const loading = ref(false)
  const router = useRouter()
  const {locale} = useI18n()

  const logoutHandler = async () => {
    try {
      loading.value = true
      await axios.get(`/logout?lang=${locale.value}`)
      router.replace('/example')
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {loading, logoutHandler}
}
