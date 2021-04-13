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
    export default {
      name: "myChart",
      components:{
        chartCard,
      },
      data(){
        return{
          emptyBox: [{ name: 'box1' }, { name: 'box2'}, {name: 'box3'}],
          chartList:[{
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

      },
      mounted() {
      },
      methods:{
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
            console.log('success');
            console.log(this.fileInfo.file);
          }
        },
        getXMLObject(file) {
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
              reader.readAsText(file, 'gbk');
            })
            promise.then((xmlStr)=>{
              console.log(xmlStr);
              var xmlObj = {};
              if (document.all) {
                var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
                xmlDom.loadXML(xmlStr);
                xmlObj = xmlDom;
              } else {
                xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
              }
              resolve(xmlObj);
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
              reader.readAsText(file, 'gbk');
            })
            promise.then((xmlStr)=>{
              console.log(xmlStr);
              var xmlObj = {};
              if (document.all) {
                var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
                xmlDom.loadXML(xmlStr);
                xmlObj = xmlDom;
              } else {
                xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
              }
              resolve(xmlObj);
            })
          })

        },
        analyzeChart(){
          if(this.fileInfo.type=='xml'){
            this.getXMLObject(this.fileInfo.file).then((XMLObject)=>{
              console.log(XMLObject);
            });

          }else if(this.fileInfo.type=='json'){
            this.getJSONObject(this.fileInfo.file).then((JSONObject)=>{
              console.log(JSONObject);
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
