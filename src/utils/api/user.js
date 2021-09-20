import request from '../request'

export default {
  // 发送验证码
  sendCode (params) {
    return request.post('/api/website/verifyCode/sendCode', params)
  },
  // 注册
  register (params) {
    return request.post('/api/webSite/webUser/webRegister', params)
  },
  // 登录（登录都同一个接口啊）
  login (params) {
    return request.post('/api/webSite/webUser/webLogin', params)
  }
}
