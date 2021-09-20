<template>
  <el-row class="cloud-login__wrap">
    <!-- 头部标题 -->
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      class="header-title__wrap"
    >
      <span class="name">{{ title }}</span>
      <el-link type="primary" class="reg" @click="$router.push({ name: 'Reg' })"
        >立即注册</el-link
      >
    </el-row>
    <!-- 动态组件 -->
    <component :is="currItem.component" ref="form">
      <!-- 只是想着一起引入 button 就放这里了 -->
      <ItemButton
        v-if="currItem.component === 'LoginWithMsg'"
        slot="msgCodeButton"
        :disabled="isDisabled"
        @click="sendMsgCode"
      >
        {{ btnText }}
      </ItemButton>
    </component>
    <!-- 权限、协议 -->
    <el-row class="inform-text__wrap">
      <el-row class="inform-text" type="flex" align="middle">
        登录后<el-link type="primary">高睿云官网</el-link>将获得以下权限<i
          class="el-icon-caret-bottom"
          @click="handleCollapse"
        ></i>
      </el-row>
      <!-- 复选框 -->
      <el-collapse ref="collapse" v-model="informCoolapse" accordion>
        <el-collapse-item name="1">
          <div>您的个人资料(昵称、头像)</div>
          <div>您的组织、团队信息</div>
        </el-collapse-item>
      </el-collapse>
      <!-- 协议 -->
      <OauthAgree v-model="isAgree"></OauthAgree>
    </el-row>
    <!-- 忘记密码 -->
    <el-row class="forget-pwd__wrap">
      <el-link class="forget-pwd">忘记密码</el-link>
    </el-row>
    <!-- 登录 -->
    <el-row class="login-btn__wrap">
      <ItemButton :disabled="!isAgree" @click="handleLogin">登录</ItemButton>
    </el-row>
    <!-- 登录方式 -->
    <el-row class="login-ways__wrap">
      <template v-for="(item, i) in loginWays">
        <el-divider
          v-if="i >= 1"
          direction="vertical"
          :key="item.way"
        ></el-divider>
        <el-link :key="item.way" @click="selectedWay(item, i)">
          {{ item.way }}
        </el-link>
      </template>
    </el-row>
  </el-row>
</template>

<script>
import LoginWithPhone from '@/components/cloudAuth/loginWithPhone'
import LoginWithMsg from '@/components/cloudAuth/loginWithMsg'
import OauthAgree from '@/components/cloudAuth/oauthAgree'
import ItemButton from '@/components/form/button'

export default {
  data () {
    return {
      isAgree: false,
      title: '高睿云 · 账号登录',
      btnText: '获取验证码',
      isDisabled: false,
      informCoolapse: '',
      // 验证码
      timerMsg: null,
      countMsg: 60,
      // 当前登录模式
      currItem: {
        index: [0],
        way: '手机号登录',
        component: 'LoginWithPhone'
      },
      loginWays: [
        { index: [0, 1], way: '短信登录', component: 'LoginWithMsg' },
        { index: [1, 2], way: '邮箱登录', component: '' },
        { index: [2], way: '用户名登录', component: '' }
      ],
      // 请求所需参数
      params: {
        apiAccount: 'api_web',
        apiToken: '9B66E5B6-05B0-472C-B955-2B897FE730B9',
        timestamp: '1559192325',
        sign: '4abbcdb5dd6a6cf7c1a353b2f17b5edc',
        reqMsg: 'myflag',
        userAccount: '',
        phone: '',
        userPwd: '',
        vcode: '',
        vmark: ''
      }
    }
  },
  computed: {
    wayA: {
      get () {
        return this.loginWays[0]
      },
      set (val) {
        this.loginWays.splice(0, 1, val)
      }
    },
    wayB: {
      get () {
        return this.loginWays[1]
      },
      set (val) {
        this.loginWays.splice(1, 1, val)
      }
    },
    wayC: {
      get () {
        return this.loginWays[2]
      },
      set (val) {
        this.loginWays.splice(2, 1, val)
      }
    }
  },
  methods: {
    // 登录
    handleLogin () {
      // 回调拿到 data 数据（子组件整好了数据结构，直接判断类型，然后发送请求）
      this.$refs.form.submit(res => {
        const { type, data } = res
        // 手机号登录
        if (type === 'loginWithPhone') {
          const { phone, password } = data
          this.params.phone = phone
          this.params.userPwd = password
        } else if (type === 'loginWithMsg') {
          const { phone, msgCode } = data
          this.params.phone = phone
          this.params.vcode = msgCode
        }
        // api 请求（都是同一个请求）
        this.$store.dispatch('user/userLogin', this.params).then(res => {
          console.log('%c [ 登录 ]', 'font-size:13px; background:pink; color:#bf2c9f;', res)
          this.$message.success(`${res.userName}, 登录成功!`)
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    // 触发折叠面板
    handleCollapse () {
      if (this.informCoolapse) {
        this.$refs.collapse.handleItemClick('1')
      } else {
        this.$refs.collapse.setActiveNames('1')
      }
    },
    // 选择登陆模式
    selectedWay (selected, i) {
      // 手机登录 0
      // 短信登录 0 1
      // 邮箱登录   1 2
      // 用户名登录   2
      // const currItem = this.currItem
      // console.log('selected', selected.index.toString())
      // console.log('currItem', currItem.index.toString())
      // // // 手机登录在 0, 用户登录在 2
      // if (currItem.index.length === 1) {
      //   // this.loginWays[currItem.index[0]] = currItem
      // }
      // this.currItem = selected

      // const currItem = this.currItem
      // const isExist = this.loginWays.findIndex(item => item === currItem) > -1
      // if (currItem.index.indexOf(i) > -1 && !isExist) {
      //   this.loginWays[i] = currItem
      // } else {
      //   const j = this.loginWays.findIndex(({ index }) => index.indexOf(i) > -1)
      //   console.log(j)
      //   const k = this.loginWays.findIndex(({ index }) => index.indexOf(j) > -1)
      //   const jItem = this.loginWays[j]
      //   const kItem = this.loginWays[k]
      //   this.loginWays[i] = jItem
      //   this.loginWays[j] = kItem
      //   this.loginWays[k] = currItem
      // }
      // this.currItem = selected
    },
    // 发送验证码
    sendMsgCode () {
      this.$refs.form.validatePhone(phone => {
        if (this.timerMsg) return
        // 按钮开关
        this.timerSendCode()
        this.params.phone = phone
        // api 请求
        this.$api.user.sendCode(this.params).then(res => {
          const { status, data: { eid, data, msg } } = res
          if (status === 200 && eid === 200) {
            const { vcode, vmark } = data
            this.params.vcode = vcode
            this.params.vmark = vmark
            this.$message.success('已发送验证码, 请前往手机查看')
            console.log('%c [ 验证码 ]', 'font-size:13px; background:pink; color:#bf2c9f;', vcode)
          } else {
            this.$message.error(msg)
          }
        })
      })
    },
    // 验证码倒计时
    timerSendCode () {
      // 存储初始值
      const initCount = this.countMsg
      const initBtnText = this.btnText
      this.timerMsg = setInterval(_ => {
        if (this.countMsg > 0) {
          this.btnText = `${this.countMsg}后重新获取`
          this.isDisabled = true
          this.countMsg--
        } else {
          // 重置为初始值
          clearInterval(this.timerMsg)
          this.countMsg = initCount
          this.timerMsg = null
          this.isDisabled = false
          this.btnText = initBtnText
        }
      }, 1000)
    }
  },
  components: {
    LoginWithPhone,
    LoginWithMsg,
    OauthAgree,
    ItemButton
  }
}
</script>

<style lang="scss" scoped>
.cloud-login__wrap {
  padding-top: 45px;
  .header-title__wrap {
    height: 26px;
    .name {
      font-size: 14px;
      font-weight: 500;
      color: #7f7d7d;
    }
    .reg {
      line-height: 14px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  // 权限获取
  .inform-text__wrap {
    margin-top: 15px;
    .inform-text {
      padding: 5px 0;
      font-size: 13px;
      color: #7d7f7f;
      .el-link {
        font-size: 13px;
      }
      i {
        padding: 0 4px;
        font-size: 16px;
        cursor: pointer;
      }
    }
    // 折叠面板
    ::v-deep .el-collapse {
      padding-bottom: 5px;
      border: 0 none;
      .el-collapse-item__header {
        display: none;
      }
      .el-collapse-item__wrap {
        background-color: inherit;
        border-bottom: 0 none;
        .el-collapse-item__content {
          padding-bottom: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  // 忘记密码
  .forget-pwd__wrap {
    margin-top: 10px;
    text-align: right;
    .forget-pwd {
      line-height: 14px;
      font-size: 14px;
    }
  }
  // 登录按钮
  .login-btn__wrap {
    margin-top: 20px;
  }
  // 登录方式
  .login-ways__wrap {
    margin: 24px 0 10px;
    text-align: center;
    .el-link {
      line-height: 14px;
      font-size: 12px;
    }
    .el-divider {
      margin: 0 16px;
    }
  }
}
</style>
