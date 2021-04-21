<template>
  <el-card>
    <img :src="imgUrl" class="image" style="width: 400px;height: 200px"/>
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
  import {mapActions, mapGetters, mapMutations} from "vuex";
  import router from '@/router'

  export default {
    name: 'chartCard',
    props: {
      chart: {},
    },
    data() {
      return {
        name: "",
        imgUrl: "",
        jsonUrl: "",
      }
    },

    mounted() {
      console.log(this.chart);
      this.name = this.chart.imgName;
      this.imgUrl = this.chart.imgURL;
      this.jsonUrl = this.chart.jsonURL;
    },
    methods: {
      ...mapMutations([
        'setChartData',
      ]),
      getUrl() {
        const preStr = "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/"
        return this.jsonUrl.substring(preStr.length);
      },
      editChart() {
        this.$axios.get("http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/" + this.getUrl()).then((res) => {
          this.setChartData(res.data);
          console.log(res);
          console.log("http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/" + this.getUrl());
          router.push('/ChartEdit');
        })
      }
    }

  }
</script>

<style scoped>

</style>
