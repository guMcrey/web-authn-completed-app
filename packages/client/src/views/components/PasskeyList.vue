<template>
  <div class="passkey-list">
    <div class="passkey-list-header">
      <div class="passkey-list-header-title">
        The following devices are configured for your account
      </div>
      <div v-show="authList.length" class="passkey-list-header-count">
        {{ authList.length }}
      </div>
    </div>

    <el-button
      class="add-key-btn"
      type="primary"
      round
      size="large"
      :loading="registerRequestLoading || registerResponseLoading"
      @click="addAuthHandler"
    >
      <template #icon>
        <img class="identify-icon" src="@/assets/images/identify-icon.svg" />
      </template>
      Add WebAuthn Device
    </el-button>
    <template v-if="authList.length">
      <div v-for="item in authList" class="passkey-item">
        <div class="item-detail">
          <div class="item-public-key-device">
            <el-icon><Monitor /></el-icon> 
            <span class="detail-text">
              {{ item.deviceName || '-' }}
            </span>
          </div>
          <div class="item-public-key-id">
            <el-icon><Key /></el-icon>
            <span class="detail-text">{{ item.publicKey || '-' }}</span> 
          </div>
          <div class="item-public-key-create-time">
            <el-icon><Timer /></el-icon>
            <span class="detail-text">
              {{ formatDate(item.createTime) || '-' }}
            </span>
          </div>
        </div>
        <el-button
          circle
          :icon="Delete"
          size="large"
          :loading="deleteAuthLoading"
          @click="deleteAuthHandler(item.credId)"
        />
      </div>
    </template>
    <el-empty
      v-if="!authList.length"
      :image-size="100"
      description="No devices are configured."
    ></el-empty>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'
import {ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {Delete, Monitor, Key, Timer} from '@element-plus/icons-vue'
import {IAuthItem} from '@/interfaces/auth'
import {
  useRegisterRequest,
  useRegisterResponse,
  useDeleteAuth,
} from '@/apis/useAuth'
import {formatDate} from '@/lib/functions'

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
    'Deleting the public key from the server. After deletion, you will not be able to use this passkey to log in. Do you want to continue?',
    'Tips',
    {
      confirmButtonText: 'Confirm',
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
  margin 20px 0
.passkey-list-header
  display flex
  align-items center
  gap 12px
  padding-bottom 15px
  border-bottom 1px solid #e5e5e5
.passkey-list-header-title
  font-size 17px
  font-weight 600
.passkey-list-header-count
  font-size 15px
  font-weight 600
  padding 4px 10px
  border-radius 38%
  border 1px solid #ddd
.passkey-item
  padding 12px 0
  display flex
  align-items flex-start
  justify-content space-between
  gap 20px
  border-bottom 1px dashed #f1f1f1
.item-detail
  flex 1
  width 0
.item-public-key-device
  font-size 15px
  font-weight 600
  display flex
  align-items center
  gap 10px
  color #606060
.item-public-key-id
  margin-top 13px
  font-size 15px
  color #606060
  display flex
  align-items center
  gap 10px
.item-public-key-create-time
  margin-top 8px
  font-size 15px
  color #909090
  display flex
  align-items center
  gap 10px
.add-key-btn
  margin 15px 0
.identify-icon
  width 16px
.detail-text
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
</style>
