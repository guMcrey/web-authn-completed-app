import {ref, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {axios} from '@/lib/axios'
import {handleError} from '@/lib/errorHandler'

// get passkey by username
export const useGetAuthByUsername = () => {
  const data = ref([])
  const loading = ref(false)
  const fetchData = async (username: string) => {
    try {
      loading.value = true
      const {data: result} = await axios.get(`/auth`, {
        params: {username},
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
