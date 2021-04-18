import router from '@/router'
import { resetRouter } from '@/router'
import {Message} from 'element-ui'
import {saveChartAPI} from "../../api/chart";
import {getToken, setToken, removeToken} from '../../utils/auth'

const getDefaultState=()=>{
  return {
    chartData: null,
    chartList:[],
  }
};

const chart={
  state:getDefaultState(),
  mutations:{
    setChartList:function (state,data) {
      state.chartList=data;
    },
    setChartData:function(state,data){
      state.chartData=data;
    }
  },
  actions:{
    addChart: async ({dispatch,state,commit},data)=>{
      const fileData={
        id: getToken(),
        jsonFile: data.jsonFile,
        imgFile: data.imgFile
      };
      const res= await saveChartAPI(fileData);
      if(res){
        return true
      }
    },
  }
};

export default chart

