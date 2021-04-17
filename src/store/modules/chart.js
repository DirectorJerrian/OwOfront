import router from '@/router'
import { resetRouter } from '@/router'
import {Message} from 'element-ui'
import {saveChartAPI} from "../../api/chart";

const getDefaultState=()=>{
  return {
    chartData: null,
    chartList:[],
  }
}

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
    addChart: async ({dispatch,commit},data)=>{
      const res= await saveChartAPI(data);
      if(res){

      }
    },
  }
}

export default chart

