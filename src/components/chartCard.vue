<template>
  <el-card class="card">
    <img :src="imgUrl" class="image" style="width: 100%;height:200px"/>
    <div style="padding: 5px;">
      <span>{{name}}</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button" @click="editChart()">编辑</el-button>
        <el-button type="text"  style="color: red" class="button" @click="deleteChartClick()">删除</el-button>
        <el-checkbox v-model="isChosen" style="left: 20px" size="medium"  border v-if="$parent.isChartMergeVisible">融合子图谱</el-checkbox>
      </div>
    </div>
  </el-card>
</template>

<script>
  import $ from 'jquery'
  import {mapActions,  mapMutations} from "vuex";
  import router from '@/router'

  export default {
    name: 'chartCard',
    props: {
      chart: {},
    },
    data() {
      return {
        isChosen:false,
        name: "",
        imgUrl: "",
        jsonUrl: "",
        chartId:"",
      }
    },

    mounted() {
      console.log(this.chart);
      this.name = this.chart.imgName;
      this.imgUrl = this.chart.imgURL;
      this.jsonUrl = this.chart.jsonURL;
      this.chartId=this.chart.chartId;
    },
    methods: {
      ...mapActions([
        'deleteChart',
      ]),
      ...mapMutations([
        'setChartData',

      ]),
      getUrl() {
        const preStr = "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/"
        return this.jsonUrl.substring(preStr.length);
      },
      editChart() {
        console.log("/aliyun" + this.getUrl());
        this.$axios.get("/aliyun" + this.getUrl()).then((res) => {
          res.data.isChartAlreadySaved=true;
          if(res.data.isChartAlreadySaved){
            res.data.chartId=this.chartId;
          }
          this.setChartData(res.data);
          //console.log(res);
          router.push('/ChartEdit');
        })
      },
      async deleteChartClick(){
        this.$confirm('此操作将永久删除该图谱, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteChart(this.chartId);
        });
      }
    }

  }
</script>

<style scoped>
.card{
  display: flex;
  float: left;
}
</style>
