<template>
  <div class="myChart">
    <el-header style="padding: 0">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <el-row >
          <el-button size="max" type="success" @click="createNewChart">新建图谱</el-button>
        </el-row>
        <el-row >
          <el-upload
            action=""
            :on-change="uploadFile"
            :auto-upload="false"
            :show-file-list="false">
            <el-button slot="trigger" size="max" type="warning" v-if="isFileUploaded">重新读入图谱</el-button>
            <el-button slot="trigger" size="max" type="warning" v-else>读入图谱</el-button>
          </el-upload>
        </el-row>
        <el-row >
          <el-button size="max" type="warning" @click="analyzeChart">解析图谱并编辑</el-button>
        </el-row>
        <el-row >
          <el-button size="max" type="danger" @click="analyzeText">解析文本</el-button>
        </el-row>
        <el-row >
          <el-button size="max" type="primary" @click="mergeChartClick">融合图谱</el-button>
        </el-row>
      </el-aside>
      <el-main>
        <div style="color: #409eff">
          <span v-if="isFileUploaded" style="color: #53ff40">文件名:{{fileInfo.file.raw.name}}</span>
          <span v-else style="color: #ff4040">未上传文件</span>
          <el-divider></el-divider>
          <span v-if="isFileUploaded">文件类型:{{fileInfo.file.raw.type}}</span>
          <span v-else>文件类型:无</span>
          <el-divider direction="vertical"></el-divider>
          <span v-if="isFileUploaded">文件大小:{{(fileInfo.file.raw.size/1024).toFixed(2)}}</span>
          <span v-else>文件大小:0KB</span>
        </div>
        <div class="text-area">
          <textarea v-model="textData" placeholder="请输入解析文本..."></textarea>
        </div>
      </el-main>
    </el-container>
    <div id="chartList">
      <div class="card-wrapper">
        <chartCard :chart="item" v-for="item in chartList" :key="item.chartId"  @click.native="" class="chartCard">
        </chartCard>
      </div>
    </div>

<!--    <el-container>-->
<!--      <el-main>-->

<!--      </el-main>-->
<!--      <el-footer style="height: 180px">-->
<!--        <el-row :gutter="10" class="footer-row">-->
<!--          <el-col :span="4" :offset="6">-->
<!--            <span style="font-size: 24px">帮助中心</span>-->
<!--            <br/>-->
<!--            <span style="font-size: 16px"-->
<!--            ><a href="http://212.129.149.40/users/sign_in"> 版本更新 </a><br/>-->
<!--                <a href="http://212.129.149.40/users/sign_in"> 联系我们</a>-->
<!--              </span>-->
<!--          </el-col>-->
<!--          <el-col :span="4" :offset="6" class="footer-pic">-->
<!--            <el-image class="logo" :src="logo_url"></el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row :gutter="10">-->
<!--          <el-col :span="4" :offset="6">-->
<!--            <span style="font-size: 16px">©OwO COIN</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-footer>-->
<!--    </el-container>-->

    <div id="confirmMergeChart">
      <el-button type="success" icon="el-icon-check" circle style="width: 100px;height: 50px;" v-if="isChartMergeVisible" @click="confirmChartMerge()">确认融合</el-button>
      <el-button type="danger" icon="el-icon-close" circle style="width: 100px;height: 50px;left: 10px" v-if="isChartMergeVisible" @click="cancelChartMerge()">取消融合</el-button>
    </div>

  </div>

</template>

<script>
  import Header from "@/components/header";
  import chartCard from '../components/chartCard';
  import {mapActions, mapGetters, mapMutations} from "vuex";
  import router from '@/router';

  export default {
    name: "myChart",
    components: {
      chartCard,
      Header,
    },
    data() {
      return {
        logo_url: "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/logo.png",
        textData: '',
        newJson:{"title":"新建知识图谱","nodes":[],"links":[],"isChartFixed":false,"potions":[]},
        // chartList:[{
        //   name:'chart01',
        //   imgUrl:'12345678',
        //   jsonUrl:'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/chartJson/chart%20with%20positon.json',
        // },
        // {
        //   name:'chart02',
        //   imgUrl:''
        // },{
        //     name:'chart01',
        //     imgUrl:''
        //   },
        //   {
        //     name:'chart02',
        //     imgUrl:''
        //   },{
        //     name:'chart01',
        //     imgUrl:''
        //   },
        //   {
        //     name:'chart02',
        //     imgUrl:''
        //   },{
        //     name:'chart01',
        //     imgUrl:''
        //   },
        //   {
        //     name:'chart02',
        //     imgUrl:''
        //   },],
        headActiveIndex: '2',
        fileInfo: {
          file: '',
          type: '',
          size: 0,
        },
        isFileUploaded: false,
        isChartMergeVisible:false,
      }
    },
    computed: {
      ...mapGetters([
        'chartData',
        'chartList'
      ]),
    },
    mounted() {
      this.getChartList();
    },
    methods: {
      ...mapActions([
        'getKg',
        'getChartList',
        'getFusion',
      ]),
      ...mapMutations([
        'setChartData',
      ]),
      createNewChart(){
        this.setChartData(this.newJson)
        router.push('/ChartEdit');
      },
      setFileInfo(file, type) {
        this.fileInfo.file = file;
        this.fileInfo.type = type;
      },
      isFileMatchAndSetFileType(filename) {
        var target = '.xml';
        var start = filename.length - target.length;
        var arr = filename.substr(start, target.length);
        if (arr == target) {
          this.fileInfo.type = 'xml';
          return true;
        }
        target = '.json';
        start = filename.length - target.length;
        arr = filename.substr(start, target.length);
        if (arr == target) {
          this.fileInfo.type = 'json';
          return true;
        }
        return false;
      },
      beforeFileUpload(file) {
        const isFileTypeCorrect = this.isFileMatchAndSetFileType(file.name);
        const isFileSizeCorrect = file.size / 1024 / 1024 < 2;
        if (!isFileTypeCorrect) {
          this.$message.error('上传文件只能是XML或JSON格式!');
          return false;
        }
        if (!isFileSizeCorrect) {
          this.$message.error('上传文件大小不能超过 2MB!');
          return false;
        }
        return isFileTypeCorrect && isFileSizeCorrect;

      },
      uploadFile(file) {
        if (this.beforeFileUpload(file)) {
          this.fileInfo.file = file;
          this.isFileUploaded = true;
          // this.fileInfo.size=
          this.$message.success(this.fileInfo.file.name + '上传成功!');
        }

      },
      getSimpleDataByNode(node) {
        var result = {};
        for (var i = 0; i < node.childNodes.length; ++i) {
          if (node.childNodes[i].nodeType == 1) {
            result[node.childNodes[i].nodeName] = this.getSimpleDataByNode(node.childNodes[i]);
          } else if (node.childNodes[i].nodeType == 3) {
            return node.childNodes[i].nodeValue;
          }
        }
        return result;
      },
      chartDataFormatFilter(data) {
        for (var i = 0; i < data.nodes.length; i++) {
          data.nodes[i].symbolSize = parseInt(data.nodes[i].symbolSize);
          data.nodes[i].label.fontSize = parseInt(data.nodes[i].label.fontSize);
          data.nodes[i].category = parseInt(data.nodes[i].category);
        }
        if (data.isChartFixed) {
          for (var i = 0; i < data.positions.length; i++) {
            data.positions[i].x = parseFloat(data.positions[i].x);
            data.positions[i].y = parseFloat(data.positions[i].y);
          }
        }
        return data;
      },
      getDataByNodeName(name, nodeList, isArray) {
        if (isArray) {
          var res = [];
          for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeName == name) {
              const sonList = nodeList[i].childNodes;
              for (var j = 0; j < sonList.length; j++) {
                res.push(this.getSimpleDataByNode(sonList[j]));
              }
              return res;
            }
          }
          return res;
        } else {
          for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeName == name) {
              return nodeList[i].textContent;
            }
          }
        }
      },
      xmlToObject(node) {
        var nodeList = node.childNodes[0].childNodes;
        console.log(nodeList);
        var chartData = {
          title: '',
          nodes: [],
          links: [],
          isChartFixed: false,
          positions: [],
        }
        chartData.title = this.getDataByNodeName('title', nodeList, false);
        if (this.getDataByNodeName('isChartFixed', nodeList, false)) {
          chartData.isChartFixed = true;
        }
        chartData.nodes = this.getDataByNodeName('nodes', nodeList, true);
        chartData.links = this.getDataByNodeName('links', nodeList, true);
        if (chartData.isChartFixed) {
          chartData.positions = this.getDataByNodeName('positions', nodeList, true);
        }
        return this.chartDataFormatFilter(chartData);
      },
      getXMLObject(file) {
        let area = this;
        return new Promise(function (resolve, reject) {
          file = file.raw;
          var xmlStr = '';
          const promise = new Promise(function (res, rej) {
            var reader = new FileReader();
            reader.onload = function (evt) {
              if (reader.result) {
                res(evt.target.result);
              }
            }
            reader.readAsText(file, 'UTF-8');
          })
          promise.then((xmlStr) => {
            var xmlObj = {};
            if (document.all) {
              var xmlDom = new ActiveXObject("Microsoft.XmlDom");
              xmlDom.loadXML(xmlStr);
              xmlObj = xmlDom;
            } else {
              xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
            }
            var chartData = area.xmlToObject(xmlObj);
            resolve(chartData);
          })
        })

      },
      getJSONObject(file) {
        return new Promise(function (resolve, reject) {
          file = file.raw;
          var xmlStr = '';
          const promise = new Promise(function (res, rej) {
            var reader = new FileReader();
            reader.onload = function (evt) {
              if (reader.result) {
                res(evt.target.result);
              }
            }
            reader.readAsText(file, 'UTF-8');
          })
          promise.then((jsonStr) => {
            var jsonObj = JSON.parse(jsonStr);
            resolve(jsonObj);
          })
        })
      },
      analyzeChart() {
        if (this.fileInfo.type == 'xml') {
          this.getXMLObject(this.fileInfo.file).then((XMLObject) => {
            this.setChartData(XMLObject);
            router.push('/ChartEdit');
          });

        } else if (this.fileInfo.type == 'json') {
          this.getJSONObject(this.fileInfo.file).then((JSONObject) => {
            this.setChartData(JSONObject)
            router.push('/ChartEdit');
          });
        }
      },
      analyzeText() {
        if (this.textData==''){
          this.$message.error('解析的文本不能为空！');
        }
        else{
          this.getKg(this.textData).then((jsonStr) => {
            // console.log(jsonStr);
            var jsonObj = JSON.parse(jsonStr);
            // console.log(jsonObj);
            this.setChartData(jsonObj);
            router.push('/ChartEdit');
          });
        }
      },
      mergeChartClick(){
        this.isChartMergeVisible=true;
      },
      confirmChartMerge(){
        var components=this.$children;
        console.log(components);
        var chosenNum=0;
        var urlList=[];
        for(var i=0;i<components.length;i++){
          if(components[i].chartId!=undefined){
            if(components[i].isChosen){
              chosenNum++;
              urlList.push(components[i].jsonUrl);
            }
          }
        }
        console.log(chosenNum);
        if(chosenNum!=2){
          this.$message({
            message: '当前只支持两个图谱进行融合！',
            type: 'warning'
          });
          this.clearChartChosen();
          return;
        }
        if(chosenNum==2){
          this.mergeChart(urlList);
          console.log(urlList);
        }
      },
      getUrl(str) {
        const preStr = "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/"
        return str.substring(preStr.length);
      },
      async mergeChart(urlList) {
        const chart1 = await this.$axios.get("/aliyun"+this.getUrl(urlList[0]))
        const chart2 = await this.$axios.get("/aliyun"+this.getUrl(urlList[1]))
        const data={
          dataString:JSON.stringify(chart1.data),
          nextData:JSON.stringify(chart2.data),
        }
        var chartString= await this.getFusion(data);
        var chartData=JSON.parse(chartString);
        chartData.isChartAlreadySaved=false;
        this.setChartData(chartData);
        router.push('/ChartEdit');
      },
      cancelChartMerge(){
        this.clearChartChosen();
        this.isChartMergeVisible=false;

      },
      clearChartChosen(){
        var components=this.$children;
        for(var i=0;i<components.length;i++){
          if(components[i].chartId!=undefined){
            components[i].isChosen=false;
          }
        }
      }
    }

  }
</script>

<style scoped>
  .card-wrapper{
    width: 100%;
  }
  .chartCard {
    display: flex;
    width: 24%;
    margin: 2px;
  }

  .el-row {
    margin-left: 20px;
    margin-bottom:20px;margin-top: 15px
  }

  .text-area {

    width: 100%;
    padding-bottom: 10px;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    margin-bottom:20px;
    padding-top: 20px;
    margin-top: 20px

  }

  .text-area textarea {
    background-color: rgba(241, 241, 241, .98);
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    height: 6.5rem;
  }

  .text-area textarea::-webkit-input-placeholder {
    color: #9E9E9E;

  }

  #confirmMergeChart{
    position: fixed;
    right: 0;
    top: 45%;
  }

</style>
<style scoped>
  .logo {
    height: 50px;
    margin-right: 16px;
    border-style: none;
    cursor: pointer;
  }

  .mask {
    width: 75px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.54);
    border-radius: 30px;
    position: absolute;
    margin-top: -60px;
    margin-left: 199px;
    font-weight: bold;
  }

  .el-header {
    /* background-color: #a191fc; */
    color: rgb(255, 255, 255);
    text-align: right;
    /* line-height: 60px; */
  }

  .el-footer {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.575);
    color: rgb(255, 255, 255);
  }

  .el-container {
    padding-bottom: 1px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #606266;

  }

  #header {
    text-align: right;
  }

  .footer-row {
    margin-top: 20px;
    line-height: 30px;
  }
</style>
<style scoped>
  .threeCard {
    height: 250px;
  }

  .threeCard div {
    text-align: left;
  }

  .bottom {
    line-height: 12px;
    bottom: 18px;
    position: absolute;
  }

  .button {
    padding: 0;
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
<style lang="less" scoped>
  .section1 {
    /* background-image: url(https://finclaw.oss-cn-shenzhen.aliyuncs.com/img/section02.png); */
    /* background-repeat: no-repeat;*/
    /* background-position: center center; */
    /*background-size: 100% auto;*/
  }

  .header-button {
    margin-left: 3%;
    background-color: transparent;
    color: white;
    border: 0;
    font-size: 180%;
  }

  .header-button:hover {
    background-color: white;
    color: #a191fc;
  }

  .button2 {
    /* height:40%; */
    font-size: 222%;
    background-color: #a191fc;
    border: 0;
    color: white;
  }

  .button2:hover {
    background-color: white;
    color: #a191fc;
  }

  /****** */

  #components-grid-demo-playground .projects {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  #components-grid-demo-playground [class~="ant-col"] {
    background: transparent;
    border: 0;
  }

  #components-grid-demo-playground [class~="ant-col"] > div {
    /*background: #00a0e9;*/
    line-height: 300px;
    font-size: 13px;
  }

  h1 {
    font-size: 52px;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 8px;
  }

  h2 {
    font-size: 30px;
    color: #333333;
    line-height: 40px;
    font-weight: bold;

    em {
      color: #409eff;
    }
  }

  .meta-info {
    margin: 10px auto -10px auto;
  }

  #components-grid-demo-playground pre {
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 13px;
    padding: 8px 16px;
  }
</style>
