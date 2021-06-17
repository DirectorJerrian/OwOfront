import router from '@/router'
import {resetRouter} from '@/router'
import {Message} from 'element-ui'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {
  saveChartAPI,
  getKgAPI, getUserChartsAPI, deleteChartAPI, getAnswerAPI, getFusionAPI
} from "../../api/chart";
import da from "element-ui/src/locale/lang/da";

const getDefaultState = () => {
  return {
    chartData: null,
    chartList: [],
  }
};

const chart = {
  state: getDefaultState(),
  mutations: {
    setChartList: function (state, data) {
      state.chartList=[]
      state.chartList = data;
    },
    setChartData: function (state, data) {
      state.chartData = data;
    }
  },
  actions: {
    addChart: async ({dispatch, state, commit}, data) => {
      const fileData = {
        chartId:data.chartId,
        isChartAlreadySaved:data.isChartAlreadySaved,
        id: getToken(),
        jsonFile: data.jsonFile,
        imgFile: data.imgFile,
        name: data.name
      };
      const res = await saveChartAPI(fileData);
      if (res) {
        return true

      }
    },
    deleteChart:async ({dispatch},id)=>{
      console.log(id);
      const res=await deleteChartAPI(id);
      if(res){
        console.log(res);
        await dispatch(`getChartList`);
        Message.success("删除成功！");
      }
    },
    getKg: async ({dispatch, commit}, data) => {
      var dataVO = {
        dataString: data,
        nextData:""
      };
      const res = await getKgAPI(dataVO);
      if (res) {
        return res.msg;
        // resolve(res.msg);
      }
    },
    getFusion: async ({dispatch, commit}, data) => {
      var dataVO = {
        dataString: data.dataString,
        nextData: data.nextData
      };
      const res = await getFusionAPI(dataVO);
      if (res) {
        return res.msg;
        // resolve(res.msg);
      }
    },
    getAnswer: async ({dispatch, commit}, data) => {
      var dataVO = {
        dataString: data.dataString,  //知识图谱
        nextData: data.nextData       //问题
      };
      const res = await getAnswerAPI(dataVO);
      if (res) {
        return res.msg;
      }
    },
    getChartList: async ({dispatch, commit}) => {
      var id = getToken();
      const res = await getUserChartsAPI(id);
      if (res) {
        console.log(res);
        commit('setChartList', res.obj);
      }
    }
  }
};

export default chart

