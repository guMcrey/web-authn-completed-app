<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRule"
    class="form-area"
    label-position="top"
    @submit.prevent
  >
    <el-form-item label="Username" required prop="username">
      <el-input
        v-model="form.username"
        placeholder="Enter your username"
        :prefix-icon="User"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item label="Password" required prop="password">
      <el-input
        v-model="form.password"
        type="password"
        size="large"
        placeholder="Enter your password"
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
        Sign in
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useLogin} from '@/apis/useLogin'

const {loading: loginLoading, fetchData: loginHandler} = useLogin()

const validateUsername = (rule: any, value: any, callback: any) => {
  const regex = new RegExp(/^[0-9a-zA-Z_]{4,8}$/)
  if (!regex.test(value)) {
    return callback(
      new Error(
        'Please enter a 4-8 characters consisting of letter, number and underscore.'
      )
    )
  }
  callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  const regex = new RegExp(/^[0-9a-zA-Z_]{6,10}$/)
  if (!regex.test(value)) {
    return callback(
      new Error(
        'Please enter a 6-10 characters consisting of letter, number and underscore.'
      )
    )
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
      message: 'Username is required',
      trigger: ['blur', 'change'],
    },
    {
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
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
