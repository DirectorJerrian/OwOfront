const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  emailCode: state => state.user.emailCode,
  userInfo: state => state.user.userInfo
};

export default getters
