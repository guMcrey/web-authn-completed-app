<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRule"
    class="form-area"
    label-position="top"
    @submit.prevent
  >
    <el-form-item :label="t('login.username')" required prop="username">
      <el-input
        v-model="form.username"
        :placeholder="t('login.usernamePlaceholder')"
        :prefix-icon="User"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item :label="t('login.password')" required prop="password">
      <el-input
        v-model="form.password"
        type="password"
        size="large"
        :placeholder="t('login.passwordPlaceholder')"
        :prefix-icon="Lock"
        show-password
        @keyup.enter.native="signInHandler"
      ></el-input>
    </el-form-item>
    <div class="sign-in-button">
      <el-button
        :loading="loginLoading"
        type="primary"
        round
        size="large"
        @click="signInHandler"
      >
        {{ t('login.signIn') }}
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useLogin} from '@/apis/useLogin'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {loading: loginLoading, fetchData: loginHandler} = useLogin()

const validateUsername = (rule: any, value: any, callback: any) => {
  const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{3,7}$/)
  if (!regex.test(value)) {
    return callback(new Error(t('login.usernameValidate')))
  }
  callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{5,9}$/)
  if (!regex.test(value)) {
    return callback(new Error(t('login.passwordValidate')))
  }
  callback()
}
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: '',
})
const formRule = reactive<FormRules>({
  username: [
    {
      required: true,
      message: t('login.usernameRequired'),
      trigger: ['blur', 'change'],
    },
    {
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      message: t('login.passwordRequired'),
      trigger: ['blur', 'change'],
    },
    {
      validator: validatePassword,
    },
  ],
})

const signInHandler = async () => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return
  const {username, password} = form
  await loginHandler(username, password)
}
</script>

<style lang="stylus" scoped>
.form-area
  width 100%
.sign-in-button
  width 100%
  margin-top 30px
  .el-button
    width 100%
:deep(.el-form-item .el-form-item__label)
  font-weight bold
</style>
