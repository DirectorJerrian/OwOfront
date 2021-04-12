<template>
  <el-card>
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    <div style="padding: 14px;">
      <span>{{name}}</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button">编辑</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
      name:'chartCard',
      props: {
        chart: {},
      },
      nodes(){
        return{
          name: "",
          imgUrl:"",
        }
      },
      mounted() {
        this.name=this.chart.name;
        this.imgUrl=this.chart.imgUrl;
      }

    }
</script>

<style scoped>

</style>
