<template>
  <!-- 注册表单 -->
  <AunthForm
    ref="form"
    :formData="formData"
    :formLabel="formLabel"
    :formRules="formRules"
  >
    <!-- 中间层，连接父插槽与子组件 -->
    <!-- 本身是插槽填充也是插槽位置 -->
    <slot name="msgCodeButton" slot="msgCodeButton"></slot>
  </AunthForm>
</template>

<script>
import AunthForm from '@/components/cloudAuth/form'

export default {
  data () {
    // 检验第二次密码
    const validatorComfirm = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        countryCode: 86,
        phone: '',
        msgCode: '',
        password: '',
        passwordComfirm: ''
      },
      formLabel: [
        { model: 'phone', placeholder: '请输入手机号码', type: 'phone', subModel: 'countryCode' },
        { model: 'msgCode', placeholder: '请输入验证码', type: 'msgCode' },
        { model: 'password', placeholder: '请输入登录密码', type: 'password' },
        { model: 'passwordComfirm', placeholder: '请再次输入密码', type: 'passwordComfirm' }
      ],
      formRules: {
        phone: [
          { required: true, message: '当前手机号码为空', trigger: 'change' },
          { pattern: /^\d{11,11}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        msgCode: [
          { required: true, message: '请输入短信验证码', trigger: 'change' },
          { pattern: /^\d{6,6}$/, message: '验证码长度不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '当前密码为空', trigger: 'change' },
          { pattern: /^[^\s]*$/, message: '请勿输入空格', trigger: 'blur' },
          { pattern: /^[^\s]{6,18}$/, message: '密码长度不正确', trigger: 'blur' }
        ],
        passwordComfirm: [
          { required: true, message: '请再次输入密码', trigger: 'change' },
          { validator: validatorComfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 检验表单，暴露给父级
    submit (callback) {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const data = {
          // type 最好与组件名一致
          type: 'regForm',
          data: this.formData
        }
        callback(data)
      })
    },
    // 检验手机号，暴露给父级
    validatePhone (callback) {
      this.$refs.form.validateField('phone', errMsg => {
        if (errMsg) return
        // 将检测字段的数据，返回给父层
        const phone = this.formData.phone
        callback(phone)
      })
    }
  },
  components: {
    AunthForm
  }
}
</script>

<style lang="scss" scoped>
</style>
