import { axios } from '@/utils/request'

const api = {
  kgPre: '/api/kg'
};

export function saveChartAPI(data){
  return axios({
    url:'',
    method:'POST',
    data
  })
}

export function getKgAPI(data){
  return axios({
    url:`${api.kgPre}/${data}/getKg`,
    method: 'GET'
  })
}
