import router from '@/router'
import { resetRouter } from '@/router'
import {Message} from 'element-ui'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {
  saveChartAPI,
  getKgAPI
} from "../../api/chart";
import da from "element-ui/src/locale/lang/da";

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
        imgFile: data.imgFile,
        name:data.name
      };
      const res= await saveChartAPI(fileData);
      if(res){
        return true

      }
    },
    getKg: async ({dispatch,commit},data)=>{
      var dataVO={
        dataString:data
      };
      const res= await getKgAPI(dataVO);
      if(res){
        return res.msg;
        // resolve(res.msg);
      }
    },
  }
};

export default chart

