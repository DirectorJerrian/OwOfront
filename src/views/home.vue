<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <Banner></Banner>
    </el-container>

    <el-container>
      <el-main style="height: 100%; margin-bottom: 3%">
        <el-row type="flex" justify="center" style="margin-top: 5%">
          <el-col :span="20">
            <el-carousel :interval="4000" type="card" height="420px">
              <el-carousel-item v-for="(content,item) in carousel_content" :key="item" style="border-size:30px">
                <el-row type="flex" justify="center" style="margin-top: 20px">
                  <el-col :span="5" style="text-align: center">
                    <el-image :src="logo_url" class="logo"></el-image>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :span="8" style="text-align: center; font-size: 24px">
                    OwO COIN
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center" style="margin: 5px 0">
                  <el-col :span="6" style="text-align: center">
                    <el-rate :value="5" disabled text-color="#ff9900"></el-rate>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col
                    :span="18"
                    style="text-align: center; font-size: 24px"
                  >
                    <div>
                      {{content}}
                    </div>
                  </el-col>
                </el-row>

              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-main>

      <!-- 页脚 -->
      <el-footer style="height: 180px">
        <el-row :gutter="10" class="footer-row">
          <el-col :span="4" :offset="6">
            <span style="font-size: 24px">帮助中心</span>
            <br/>

            <span style="font-size: 16px"
            ><a href="http://212.129.149.40/users/sign_in"> 版本更新 </a><br/>
              <a href="http://212.129.149.40/users/sign_in"> 联系我们</a>
            </span>
          </el-col>
          <el-col :span="4" :offset="6" class="footer-pic">
            <el-image class="logo" :src="logo_url"></el-image>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4" :offset="6">
            <span style="font-size: 16px">©OwO COIN</span>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import Header from "@/components/header";
  import Banner from "@/components/banner";

  export default {
    name: "home",
    data() {
      return {
        logo_url: "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/logo.png",
        colCount: 4,
        projects: [],
        shuffleTime: 0,
        carousel_content: [
          "OwO COIN的产品非常好用！是一款全新的，前所未有的医学相关知识图谱平台，帮助我解决了整理各个疾病相关的问题，" +
          "还帮我整合了不同疾病关联的问题！非常赞！",
          "不得不说，OwO真的太棒了！在遇到多重信息扰乱你的眼球时，你可以很快的理清思路\n使用OwO就能让你拥有火眼金睛，抓清事务的细节，有了它一定能给你带来很大的帮助！",
          "说句掏心窝子的话，在这个互联网信息杂乱的时代，我们很有必要拥有主动掌握准确信息的能力，而图谱可以很好的整合这些信息，帮助我们把握未知的事物。",
          "OwO COIN的产品非常好用！是一款全新的，前所未有的医学相关知识图谱平台，帮助我解决了整理各个疾病相关的问题，" +
          "还帮我整合了不同疾病关联的问题！非常赞！",
          "说句掏心窝子的话，在这个互联网信息杂乱的时代，我们很有必要拥有主动掌握准确信息的能力，而图谱可以很好的整合这些信息，帮助我们把握未知的事物。",
          "OwO COIN的产品非常好用！是一款全新的，前所未有的医学相关知识图谱平台，帮助我解决了整理各个疾病相关的问题，" +
          "还帮我整合了不同疾病关联的问题！非常赞！",
        ]
      };
    },
    mounted() {
    },
    methods: {
    },
    computed: {},
    components: {
      Header,
      Banner,
    },
  };
</script>


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
    margin-bottom: 100px;
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
