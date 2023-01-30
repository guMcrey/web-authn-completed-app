import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {useRouter} from 'vue-router'

// login user: check session
export const useLoginUser = () => {
  const loading = ref(false)
  const router = useRouter()

  const fetchData = async () => {
    try {
      loading.value = true
      const {data} = await axios.get(`/is-login`)
      if (data.code === 200 && ['/home', '/'].includes(router.options.history.location)) {
        router.push('/home')
      }
    } catch (err) {
      router.push('/')
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

  const fetchData = async (username: string, password: string) => {
    try {
      loading.value = true
      await axios.post(`/login`, {username, password})
      ElMessage.success('Login successful.')
      router.push('/home')
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

  const logoutHandler = async () => {
    try {
      loading.value = true
      await axios.get(`/logout`)
      router.replace('/')
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {loading, logoutHandler}
}
