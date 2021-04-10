<template>
  <el-upload
    action=""
    :on-change="uploadFile"
    :auto-upload="false"
    :show-file-list="false">
    <el-button slot="trigger" size="small" type="primary">读入图谱</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="analyzeChart">解析图谱</el-button>
  </el-upload>
</template>

<script>
    export default {
      name: "myChart",
      data(){
        return{
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
            console.log(this.fileInfo);
          }
        },
        analyzeChart(){
          if(this.fileInfo.type=='xml'){

          }else if(this.fileInfo.type=='json'){

          }
        },
      }

    }
</script>

<style scoped>

</style>
