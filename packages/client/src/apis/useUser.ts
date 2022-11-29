import {ref, reactive} from 'vue'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'

// get user info
export const useGetUser = () => {
  const data: any = reactive({})
  const loading = ref(false)
  const fetchData = async (userId: string) => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/user`, {
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
