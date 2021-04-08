<template>
  <div class="chartEdit">
    <div id="headMenu">
      <el-menu
        :default-active="headActiveIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">知识图谱处理</el-menu-item>
        <el-menu-item index="2" disabled>我的知识图谱</el-menu-item>
        <el-menu-item index="3" disabled>我的信息</el-menu-item>
      </el-menu>
    </div>
    <div id="sideMenu">
      <el-menu default-active="1" class="el-menu-vertical-demo" >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">实体</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="createNodeClick()">增加实体</el-menu-item>
            <el-menu-item index="1-2" @click="">实体信息搜索</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">关系</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="createLinkClick()">增加关系</el-menu-item>
            <el-menu-item index="2-2" @click="">关系信息搜索</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">图谱</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="">信息统计</el-menu-item>
            <el-menu-item index="3-2" @click="">排版模式</el-menu-item>
            <el-menu-item index="3-3" @click="">力导图模式</el-menu-item>
            <el-menu-item index="3-4" @click="fixChartClick()">图谱固定</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">保存</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="saveChartClick()">保存到我的图谱</el-menu-item>
            <el-menu-item index="4-2" @click="chartXMLDownloadClick()">图谱XML导出</el-menu-item>
            <el-menu-item index="4-3" @click="chartImgDownloadClick()">图谱图片导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">拓展功能</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="chart"></div>
<!--    图谱编辑-->
    <div id="chartInfoEdit" style="width: 0;background-color: #82fff5"></div>
<!--    图谱信息搜索-->
    <div id="chartSearch"></div>
  </div>

</template>

<script>
  import $ from 'jquery'
    export default {
      name: "ChartEdit",
      data () {
        return {
          headActiveIndex: '1',
          nodes:[{
            name: 'node01',
            des: 'nodedes01',
            symbolSize: 70,
            category: 0,
          }, {
            name: ' ',
            des: '',
            symbolSize: 0,
            category: 0,
          },{
            name: 'node02',
            des: 'nodedes02',
            symbolSize: 50,
            category: 1,
          }, {
            name: 'node03',
            des: 'nodedes3',
            symbolSize: 50,
            category: 1,
          }, {
            name: 'node04',
            des: 'nodedes04',
            symbolSize: 50,
            category: 1,
          }, {
            name: 'node05',
            des: 'nodedes05',
            symbolSize: 50,
            category: 1,
          }],
          links:[{
            source: 'node01',
            target: 'node02',
            name: 'link01',
            des: 'link01des',
          },{source: 'node02',
            target: 'node01',
            name: 'link00',
            des: 'reverse',},{
            source: 'node01',
            target: ' ',
            name: 'link02',
            des: 'myself',
          },{
            source: ' ',
            target: 'node01',
            name: '',
            des: 'myself',
          },{
            source: 'node01',
            target: 'node03',
            name: 'link02',
            des: 'link02des'
          }, {
            source: 'node01',
            target: 'node04',
            name: 'link03',
            des: 'link03des'
          }, {
            source: 'node01',
            target: 'node05',
            name: 'link04',
            des: 'link05des'
          }],
          categories: [{name:'01 class'},{name:'02 class'}],
          option :{
          // 图的标题
          title: {
            text: '知识图谱'
          },
          // 提示框的配置
          tooltip: {
            formatter: function (x) {
              return x.data.des;
            }
          },
          // 工具箱
          toolbox: {
            // 显示工具箱
            show: true,
            feature: {
              mark: {
                show: true
              },
              // 还原
              restore: {
                show: false
              },
              // 保存为图片
              saveAsImage: {
                show: false
              }
            }
          },
          legend: [{
            // selectedMode: 'single',
            data:[]
          }],
          series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2,10],
            force: {
              repulsion: 100,
              gravity:0.01,
              edgeLength:200
            },
            autoCurveness: 0.1,
            draggable: true,
            lineStyle: {
              width: 2,
              color: '#4b565b',
            },
            edgeLabel: {
              position: "middle",
              fontSize: 20,
              show: true,
              formatter: function (x) {
                return x.data.name;
              }
            },
            label: {
              show:true,
            },

            // 数据
            nodes: [],
            links: [],
            categories: [],
          }]
        },
          chart:{},
          isChartSearchVisible:false,
          isChartInfoEditVisible:false,
          isNodeEdit:false,
          isLinkEdit:false,
          isNodeCreate:false,
          isLinkCreate:false,
        }
      },
      computed:{

      },
      mounted() {
        this.drawChart();
      },
      methods:{
        drawChart(){
          this.chart = this.$echarts.init(document.getElementById('chart'));
          this.showChart();

        },
        setChart(){
          this.option.series[0].nodes=this.nodes;
          this.option.series[0].links=this.links;
          this.option.series[0].categories=this.categories;
          this.option.legend[0].data=this.categories.map(function (a) {
            return a.name;
          });
        },
        showChart(){
          this.setChart();
          this.chart.setOption(this.option)
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        tableAnimation(isOpen){
          if(isOpen){
            $("#chart").animate({"width":"1000px"});
            $("#chartInfoEdit").animate({"width":"300px"});
          }else{
            $("#chart").animate({"width":"1300px"});
            $("#chartInfoEdit").animate({"width":"0"});
          }
        },
        createNodeClick(){
          if(this.isChartInfoEditVisible) {
            this.isChartInfoEditVisible=false;
            this.tableAnimation(false);
            return;
          }
          this.isNodeCreate=true;
          this.isChartInfoEditVisible=true;
          this.tableAnimation(true)

        },
        createLinkClick(){

        },
        saveChartClick(){

        },
        chartXMLDownloadClick(){

        },
        chartImgDownloadClick(){

        },
        fixChartClick(){

        },
        failureNotice(info) {
          this.$notify({
            title: '警告',
            message: info,
            type: 'warning'
          });
        },
        successNotice(info) {
          this.$notify({
            title: '成功',
            message: info,
            type: 'success'
          });
        },
        messageNotice(info) {
          this.$notify.info({
            title: '消息',
            message: info,
          });
        },


      }
    }
</script>

<style scoped>
  #headMenu{
    width: 1500px;
  }
  #sideMenu{
    width: 200px;
    height:650px;
    float:left;
    display:flex;
  }
  #chart{
    float:left;
    display: flex;
    width:1300px;
    height:650px;
    overflow: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #chartInfoEdit{
    float: left;
    display: flex;
    width: 300px;
    height: 650px;
    overflow: hidden;
  }

</style>
