<template>
    <div style="font-size: 0" >
      <div class="background">
        <img :src="imgSrc" width="100%" height="100%" alt="cover load failure" />
      </div>
      <div>
        <Header></Header>
        <el-container>

        </el-container>
      </div>
    </div>
</template>

<script>
  import Header from "@/components/header";
  export default {
    name: "register",
    data(){
      return {
        imgSrc:'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/cover.png',
      }
    },
    components: {
      Header,
    },
  }
</script>

<style scoped>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
  }
</style>
