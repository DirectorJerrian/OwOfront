<template>
  <div class="myChart">
    <div id="headMenu">
      <el-menu
        :default-active="headActiveIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select=""
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">知识图谱处理</el-menu-item>
        <el-menu-item index="2">我的知识图谱</el-menu-item>
        <el-menu-item index="3" disabled>我的信息</el-menu-item>
      </el-menu>
    </div>
    <div id="operation">
      <el-upload
        action=""
        :on-change="uploadFile"
        :auto-upload="false"
        :show-file-list="false">
        <el-button slot="trigger" size="max" type="primary">读入图谱</el-button>
        <el-button style="margin-left: 10px;" size="max" type="success" @click="analyzeChart">解析图谱并编辑</el-button>
      </el-upload>
    </div>
    <div id="chartList">

        <div class="card-wrapper">
          <chartCard :chart="item" v-for="(item,index) in chartList" :key="index" @click.native="" class="chartCard">

          </chartCard>
        </div>


    </div>

  </div>

</template>

<script>
  import chartCard from '../components/chartCard'
  import {mapActions, mapGetters,mapMutations} from "vuex";
  import router from '@/router'
    export default {
      name: "myChart",
      components:{
        chartCard,
      },
      data(){
        return{
          chartList:[{
            name:'chart01',
            imgUrl:'12345678',
            jsonUrl:'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/chartJson/chart%20with%20positon.json',
          },
          {
            name:'chart02',
            imgUrl:''
          },{
              name:'chart01',
              imgUrl:''
            },
            {
              name:'chart02',
              imgUrl:''
            },{
              name:'chart01',
              imgUrl:''
            },
            {
              name:'chart02',
              imgUrl:''
            },{
              name:'chart01',
              imgUrl:''
            },
            {
              name:'chart02',
              imgUrl:''
            },],
          headActiveIndex:'2',
            fileInfo:{
              file:'',
              type:'',
            },

          }
      },
      computed:{
        ...mapGetters([
          'chartData',
        ]),

      },
      mounted() {
      },
      methods:{
        ...mapActions([

        ]),
        ...mapMutations([
          'setChartData',
        ]),
        setFileInfo(file,type){
          this.fileInfo.file=file;
          this.fileInfo.type=type;
        },
        isFileMatchAndSetFileType(filename){
          var target='.xml';
          var start = filename.length-target.length;
          var arr = filename.substr(start,target.length);
          if(arr == target){
            this.fileInfo.type='xml';
            return true;
          }
          target='.json';
          start = filename.length-target.length;
          arr = filename.substr(start,target.length);
          if(arr == target){
            this.fileInfo.type='json';
            return true;
          }
          return false;
        },
        beforeFileUpload(file){
          const isFileTypeCorrect = this.isFileMatchAndSetFileType(file.name);
          const isFileSizeCorrect = file.size / 1024 / 1024 < 2;
          if (!isFileTypeCorrect) {
            this.$message.error('上传文件只能是XML或JSON格式!');
          }
          if (!isFileSizeCorrect) {
            this.$message.error('上传文件大小不能超过 2MB!');
          }
          return isFileTypeCorrect&&isFileSizeCorrect;

        },
        uploadFile(file){
          if(this.beforeFileUpload(file)){
            this.fileInfo.file=file;
          }
          this.$message.success(this.fileInfo.file.name+'上传成功!');
        },
        getSimpleDataByNode(node){
          var result = {};
          for(var i = 0 ; i < node.childNodes.length ; ++i){
            if(node.childNodes[i].nodeType==1){
              result[node.childNodes[i].nodeName] = this.getSimpleDataByNode(node.childNodes[i]);
            }else if(node.childNodes[i].nodeType==3){
              return node.childNodes[i].nodeValue;
            }
          }
          return result;
        } ,
        chartDataFormatFilter(data){
          for(var i=0;i<data.nodes.length;i++){
            data.nodes[i].symbolSize=parseInt(data.nodes[i].symbolSize);
            data.nodes[i].label.fontSize=parseInt(data.nodes[i].label.fontSize);
          }
          if(data.isChartFixed){
            for(var i=0;i<data.positions.length;i++){
              data.positions[i].x=parseFloat(data.positions[i].x);
              data.positions[i].y=parseFloat(data.positions[i].y);
            }
          }
          return data;
        },
        getDataByNodeName(name,nodeList,isArray){
          if(isArray){
            var res=[];
            for(var i=0;i<nodeList.length;i++){
              if(nodeList[i].nodeName==name){
                const sonList=nodeList[i].childNodes;
                for(var j=0;j<sonList.length;j++){
                  res.push(this.getSimpleDataByNode(sonList[j]));
                }
                return res;
              }
            }
            return res;
          }else{
            for(var i=0;i<nodeList.length;i++){
              if(nodeList[i].nodeName==name){
                return nodeList[i].textContent;
              }
            }
          }
        },
        xmlToObject(node){
          var nodeList=node.childNodes[0].childNodes;
          console.log(nodeList);
          var chartData={
            title:'',
            nodes:[],
            links:[],
            isChartFixed:false,
            positions:[],
          }
          chartData.title=this.getDataByNodeName('title',nodeList,false);
          if(this.getDataByNodeName('isChartFixed',nodeList,false)){
            chartData.isChartFixed=true;
          }
          chartData.nodes=this.getDataByNodeName('nodes',nodeList,true);
          chartData.links=this.getDataByNodeName('links',nodeList,true);
          if(chartData.isChartFixed){
            chartData.positions=this.getDataByNodeName('positions',nodeList,true);
          }
          return this.chartDataFormatFilter(chartData);
        } ,
        getXMLObject(file) {
          let area=this;
          return new Promise(function (resolve, reject) {
            file = file.raw;
            var xmlStr = '';
            const promise=new Promise(function (res, rej) {
              var reader = new FileReader();
              reader.onload = function (evt) {
                if (reader.result) {
                  res(evt.target.result);
                }
              }
              reader.readAsText(file, 'UTF-8');
            })
            promise.then((xmlStr)=>{
              var xmlObj = {};
              if (document.all) {
                var xmlDom = new ActiveXObject("Microsoft.XmlDom");
                xmlDom.loadXML(xmlStr);
                xmlObj = xmlDom;
              } else {
                xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
              }
              var chartData=area.xmlToObject(xmlObj);
              resolve(chartData);
            })
          })

        },
        getJSONObject(file) {
          return new Promise(function (resolve, reject) {
            file = file.raw;
            var xmlStr = '';
            const promise=new Promise(function (res, rej) {
              var reader = new FileReader();
              reader.onload = function (evt) {
                if (reader.result) {
                  res(evt.target.result);
                }
              }
              reader.readAsText(file, 'UTF-8');
            })
            promise.then((jsonStr)=>{
              var jsonObj=JSON.parse(jsonStr);
              resolve(jsonObj);
            })
          })

        },
        analyzeChart(){
          if(this.fileInfo.type=='xml'){
            this.getXMLObject(this.fileInfo.file).then((XMLObject)=>{
              this.setChartData(XMLObject);
              router.push('/ChartEdit');
            });

          }else if(this.fileInfo.type=='json'){
            this.getJSONObject(this.fileInfo.file).then((JSONObject)=>{
              this.setChartData(JSONObject)
              router.push('/ChartEdit');
            });
          }
        },
      }

    }
</script>

<style scoped>
  .chartCard{
    display: flex;
    float: left;
    width: 20%;
    margin: 2%;
  }

</style>
