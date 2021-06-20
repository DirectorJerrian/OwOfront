import router from '@/router'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {resetRouter} from '@/router'
import {Message} from 'element-ui'

import {
  verifyAccountAPI,
  addAccountAPI,
  sendCodeAPI,
  getUserInfoAPI,
  updateUserInfoAPI,
  updateUserPasswordAPI,
} from '@/api/user'

const getDefaultState = () => {
  return {
    userId: null,
    emailCode: 'tstOly',
    userInfo: {}
  }
};

const user = {
  state: getDefaultState(),

  mutations: {
    resetState: function (state) {
      state.token = '',
        state.userId = 0,
        state.emailCode = 'tstOly',
        state.userInfo = {}
    },
    setToken: function (state, token) {
      state.token = token
    },
    setUserId: (state, data) => {
      state.userId = data
    },
    setCode: (state, code) => {
      state.emailCode = code
    },
    setUserInfo: (state, data) => {
      state.userInfo = {
        ...state.userInfo,
        ...data
      }
    }
  },

  actions: {
    verifyAccount: async ({dispatch, commit}, userData) => {
      const res = await verifyAccountAPI(userData);
      if (res!==undefined) {
        setToken(res.obj.id);
        commit('setToken', res.obj.id);
        dispatch('getUserInfo');
        router.push('/myChart')
      } else {
        Message.error('登录失败，请检查账号密码或重新登录！')
      }
    },
    updateUserName: async ({dispatch, commit}, userData) => {
      const res = await updateUserInfoAPI(userData);
      console.log(res);
      if (res.obj) {

        setToken(res.obj.id);
        commit('setToken', res.obj.id);
        dispatch('getUserInfo');
        Message.success("用户名修改成功！");
      } else {
        Message.error('用户名修改失败！')
      }
    },
    updateUserPassword: async ({dispatch, commit}, userData) => {
      const res = await updateUserPasswordAPI(userData);
      console.log(res);
      if (res.obj) {

        setToken(res.obj.id);
        commit('setToken', res.obj.id);
        dispatch('getUserInfo');
        Message.success("密码修改成功！");
      } else {
        Message.error('密码修改失败！')
      }
    },
    addAccount: async ({dispatch, state, commit}, data) => {
      if (data.code !== state.emailCode) {
        Message.error('验证码不正确！(注意区分大小写！)')
      } else {
        const temp = {
          username: data.username,
          password: data.password,
          email: data.email
        };
        const res = await addAccountAPI(temp);
        // console.log(res);
        if (res) {
          Message.success('注册成功!稍后将自动跳转');
          setToken(res.obj.id);
          commit('setToken', res.obj.id);
          // console.log(state.token);
          dispatch('getUserInfo');
          setTimeout(() => {
            router.push('/ChartEdit')
          }, 2000)
        } else if (res.msg === "Account exist") {
          Message.error('该邮箱已被使用！')
        } else {
          Message.error('注册失败！请检查网络！')
        }
      }
    },
    sendCode: async ({commit}, email) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!mailReg.test(email)) {
        Message.error('请先输入正确的邮箱！')
      } else {
        return new Promise((resolve, reject) => {
          sendCodeAPI(email).then(res => {
            if (!res) {
              Message.error('验证码发送失败，请检查网络情况！');
              reject('验证码生成失败')
            }
            commit('setCode', res.obj.code);
            Message.success('验证码已发送，请检查邮箱！');
            resolve(res)
          }).catch(error => {
            Message.error('验证码发送失败，请检查网络情况！');
            reject(error)
          })
        })
      }
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfoAPI(getToken()).then(res => {
          if (!res) {
            reject('登录已过期，请重新登录')
          }
          commit('setUserInfo', res.obj);
          commit('setUserId', res.obj.id);
          // console.log(state);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout: async ({commit}) => {
      removeToken();
      resetRouter();
      commit('resetState')
    },
    resetToken({commit}) {
      return new Promise(resolve => {
        removeToken();
        commit('resetState');
        resolve()
      })
    }
  }
};

export default user
