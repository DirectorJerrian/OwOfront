import router from '@/router'
import {getToken, setToken, removeToken} from '@/utils/auth'
import { resetRouter } from '@/router'
import {Message} from 'element-ui'
import { axios } from '@/utils/request'

import {
  verifyAccountAPI,
  addAccountAPI,
  sendCodeAPI,
  getUserInfoAPI
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
      // console.log(res)
      // console.log(1)
      if (res.obj) {
        setToken(res.obj.id);
        commit('setUserId', res.obj.id);
        dispatch('getUserInfo');
        router.push('/ChartEdit')
      } else {
        Message.error('登录失败，请检查账号密码或重新登录！')
      }
    },
    addAccount: async ({dispatch, commit}, data) => {
      const res = await addAccountAPI(data);
      if (res) {
        setToken(res.id);
        commit('setUserId', res.id);
        dispatch('getUserInfo');
        router.push('/ChartEdit')
      } else if (res.msg === "Account exist") {
        Message.error('该邮箱已被使用！')
      } else {
        Message.error('注册失败！请检查网络！')
      }
    },
    sendCode: async ({commit}, email) => {
      return new Promise((resolve, reject) => {
        sendCodeAPI(email).then(res => {
          if (!res) {
            Message.error('验证码发送失败，请检查网络情况！');
            reject('验证码生成失败')
          }
          commit('setCode', res.code);
          Message.success('验证码已发送，请检查邮箱！');
          resolve(res)
        }).catch(error => {
          Message.error('验证码发送失败，请检查网络情况！');
          reject(error)
        })
      })
    },
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfoAPI(state.userId).then(res => {
          if (!res) {
            reject('登录已过期，请重新登录')
          }
          commit('setUserInfo', res);
          commit('setUserId', res.id);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout: async({ commit }) => {
      removeToken();
      resetRouter();
      commit('resetState')
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        removeToken() ;
        commit('resetState');
        resolve()
      })
    }
  }
};

export default user
