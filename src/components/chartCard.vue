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
        getUrl(){
          const preStr="http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/"
          return this.jsonUrl.substring(preStr.length);
        },
        editChart(){
          this.$axios.get("/aliyun/"+this.getUrl()).then((res)=>{
            console.log(res.data);
          })
        }
      }

    }
</script>

<style scoped>

</style>
