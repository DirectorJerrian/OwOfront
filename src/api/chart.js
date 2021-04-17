import { axios } from '@/utils/request'

const api = {
  chartPre: '/api/chart'
};

export function saveChartAPI(data) {//data里要包含两个文件以及用户id
  let fd = new FormData(); //通过form数据格式来传\
  fd.append("jsonFile", data.jsonFile);
  fd.append('xmlFile',data.xmlFile);
  return axios({
    withCredentials: true,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    /*        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            contentType: false,*/
    url: `${api.chartPre}/${data.id}/saveChart`,
    method: 'POST',
    data: fd
  })
}

export function getKgAPI(data){
  return axios({
    url:`${api.kgPre}/${data}/getKg`,
    method: 'GET'
  })
}
