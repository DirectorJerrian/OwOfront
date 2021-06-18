import {axios} from '@/utils/request'

const api = {
  userPre: '/api/user'
};

export function verifyAccountAPI(data) {
  console.log(data);
  return axios({
    url: `${api.userPre}/login`,
    method: 'POST',
    data
  })
}

export function addAccountAPI(data) {
  return axios({
    url: `${api.userPre}/register`,
    method: 'POST',
    data
  })
}

export function sendCodeAPI(data) {
  return axios({
    url: `${api.userPre}/${data}/code`,
    method: 'GET'
  })
}

export function getUserInfoAPI(id) {
  return axios({
    url: `${api.userPre}/${id}/getUserInfo`,
    method: 'GET'
  })
}

export function updateUserInfoAPI(data) {
  return axios({
    url: `${api.userPre}/modifyName`,
    method: 'POST',
    data
  })
}

export function updateUserPasswordAPI(data) {
  return axios({
    url: `${api.userPre}/updatePassword`,
    method: 'POST',
    data
  })
}

export function updateUserAvatarAPI(data, id) {
  let fd = new FormData(); //通过form数据格式来传\
  fd.append("file", data.myAvatar);
  console.log(fd.get('file'));
  return axios({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    /*        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            contentType: false,*/
    url: `${api.userPre}/${id}/userInfo/updateAvatar`,
    method: 'POST',
    data: fd
  })
}

