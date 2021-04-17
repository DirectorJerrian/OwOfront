<template>
  <el-card>
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    <div style="padding: 14px;">
      <span>{{name}}</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button" @click="editChart()">编辑</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  import $ from 'jquery'
  import {mapActions, mapGetters,mapMutations} from "vuex";
  import router from '@/router'
    export default {
      name:'chartCard',
      props: {
        chart: {},
      },
      data(){
        return{
          name: "",
          imgUrl:"",
          jsonUrl:"",
        }
      },

      mounted() {
        this.name=this.chart.name;
        this.imgUrl=this.chart.imgUrl;
        this.jsonUrl=this.chart.jsonUrl;
      },
      methods:{
        ...mapMutations([
          'setChartData',
        ]),
        getUrl(){
          const preStr="http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/"
          return this.jsonUrl.substring(preStr.length);
        },
        editChart(){
          this.$axios.get("/aliyun/"+this.getUrl()).then((res)=>{
            this.setChartData(res.data);
            router.push('/ChartEdit');
          })
        }
      }

    }
</script>

<style scoped>

</style>
