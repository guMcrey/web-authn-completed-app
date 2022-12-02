<template>
  <div class="passkey-list">
    <div class="passkey-list-title">
      Your registered credentials:
      <el-button
        class="add-key-btn"
        type="primary"
        circle
        :icon="Plus"
        :loading="registerRequestLoading || registerResponseLoading"
        @click="addAuthHandler"
      ></el-button>
    </div>
    <template v-if="authList.length">
      <div v-for="item in authList" class="passkey-item">
        <div class="item-detail">
          <div class="item-public-key-device">
            {{ item.deviceName || '-' }}
          </div>
          <div class="item-public-key-id">
            {{ item.publicKey || '-' }}
          </div>
        </div>
        <el-button
          type="danger"
          circle
          :icon="Delete"
          :loading="deleteAuthLoading"
          @click="deleteAuthHandler(item.credId)"
        />
      </div>
    </template>
    <el-empty v-if="!authList.length" :image-size="100"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'
import {ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {Delete, Plus} from '@element-plus/icons-vue'
import {IAuthItem} from '@/interfaces/auth'
import {
  useRegisterRequest,
  useRegisterResponse,
  useDeleteAuth,
} from '@/apis/useAuth'

const {
  data: registerRequestData,
  loading: registerRequestLoading,
  confirmHandler: registerRequestHandler,
} = useRegisterRequest()

const {
  loading: registerResponseLoading,
  confirmHandler: registerResponseHandler,
} = useRegisterResponse()

const {
  loading: deleteAuthLoading,
  deleteData: deleteAuthByIdHandler,
} = useDeleteAuth()

const props = defineProps({
  username: {
    type: String,
    default: '',
  },
  authList: {
    type: Array as PropType<IAuthItem[]>,
    default: () => [],
  },
})
const emits = defineEmits(['change'])

const addAuthHandler = async () => {
  if (!props.username) return
  await registerRequestHandler(props.username)
  if (!registerRequestData.id) return
  await registerResponseHandler(props.username, registerRequestData)
  resetHandler()
  emits('change')
}

const deleteAuthHandler = (credId: string) => {
  ElMessageBox.confirm(
    'After removal, the device cannot log in using passkey. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    await deleteAuthByIdHandler(credId)
    emits('change')
  })
}

const resetHandler = () => {
  Object.assign(registerRequestData, {
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
}
</script>

<style lang="stylus" scoped>
.passkey-list
  margin 10px 0
.passkey-list-title
  font-size 16px
  font-weight 500
.passkey-item
  padding 15px 0
  display flex
  align-items center
  justify-content space-between
  gap 20px
  border-bottom 1px solid #f1f1f1
.item-detail
  overflow hidden
  flex 1
  width 0
.item-public-key-device
  font-size 15px
  font-weight bold
.item-public-key-id
  margin-top 5px
  font-size 15px
  color #888
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
</style>
