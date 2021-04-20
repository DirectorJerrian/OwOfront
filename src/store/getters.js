const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  emailCode: state => state.user.emailCode,
  userInfo: state => state.user.userInfo,
  chartData: state => state.chart.chartData,
  chartList: state => state.chart.chartList,
};

export default getters
