import {ref, reactive} from 'vue'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'
import {useI18n} from 'vue-i18n'

// get user info
export const useGetUser = () => {
  const data: any = reactive({})
  const loading = ref(false)
  const {locale} = useI18n()

  const fetchData = async (userId: string) => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/user?lang=${locale.value}`, {
        params: {userId},
      })
      Object.assign(data, result)
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {data, loading, fetchData}
}

// get all user list
export const useGetLatestUserAndUserCount = () => {
  const data: any = reactive({})
  const loading = ref(false)

  const fetchData = async () => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/user/latest-and-count`)
      Object.assign(data, result)
    } catch (e) {
      handleError(e)
    } finally {
      loading.value = false
    }
  }

  return {data, loading, fetchData}
}
