import {axios} from '@/utils/request'

const api = {
  chartPre: '/api/chart'
};

export function saveChartAPI(data) {//data里要包含两个文件以及用户id
  let fd = new FormData();
  fd.append("files", data.jsonFile, data.name);
  fd.append("files", data.imgFile, data.name);
  fd.append("isChartAlreadySaved",data.isChartAlreadySaved);
  fd.append("chartId",parseInt(data.chartId));
  console.log(fd.get("chartId"));
  return axios({
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    /*        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            contentType: false,*/
    url: `${api.chartPre}/${data.id}/saveChart`,
    method: 'POST',
    data: fd
  })
}

export function deleteChartAPI(id) {
  return axios({
    url:`${api.chartPre}/${id}/deleteChart`,
    method:'get',
  })
}

export function getKgAPI(data) {
  return axios({
    url: `${api.chartPre}/getKg`,
    method: 'POST',
    data
  })
}

export function getFusionAPI(data) {
  return axios({
    url: `${api.chartPre}/getFusion`,
    method: 'POST',
    data
  })
}

export function getAnswerAPI(data) {
  return axios({
    url: `${api.chartPre}/getAnswer`,
    method: 'POST',
    data
  })
}

export function getUserChartsAPI(id) {
  return axios({
    url: `${api.chartPre}/${id}/getUserCharts`,
    method: 'GET'
  })
}
