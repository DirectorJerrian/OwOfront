<template>
  <div id="myheader">
    <el-menu
      class="el-menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="0" id="label">
        <img :src="logo_url" class="logo" alt="logo" @click="jumpToHome"/>
      </el-menu-item>
      <el-menu-item index="1" @click="jumpToHome">首页</el-menu-item>
      <el-menu-item index="2" @click="jumpToChartEdit">知识图谱处理</el-menu-item>
      <el-menu-item index="3" @click="jumpToMyChart">我的知识图谱</el-menu-item>
      <el-menu-item index="4" @click="jumpToUserInfo">我的信息</el-menu-item>
      <el-submenu index="1">
        <template slot="title">使用文档</template>
        <el-menu-item index="1-1" @click="jumpToPlatformInstruction">平台使用说明</el-menu-item>
        <el-menu-item index="1-2" @click="jumpToQAndAInstruction">智能问答说明</el-menu-item>
      </el-submenu>
      <el-menu-item index="5" @click="jumpToMoreVersion">探索更多信息</el-menu-item>
      <el-menu-item
        id="loginBox"
        style="float: right; margin-left: 40px; cursor: pointer"
      >
        <template v-if="!userId">
          <el-button @click="jumpToLogin" type="primary" round>登录</el-button>
          <el-button @click="jumpToRegister" round>注册</el-button>
        </template>
        <template v-else>
          <el-dropdown id="user">
            <div>
              <el-avatar
                :size="40"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              <i style="color: white; margin: 5px">{{ userInfo.username }}</i>
              <el-tooltip
                v-if="!isAuthorized"
                class="item"
                effect="light"
                content="审核未通过，请到信息页面提交审核材料"
                placement="left-end"
              >
                <b style="color: #409eff">(待审核)</b>
              </el-tooltip>
              <el-tooltip
                v-if="isRejected"
                class="item"
                effect="light"
                content="审核被拒绝，请到信息页面重新提交材料"
                placement="left-end"
              >
                <b style="color: #F56C6C">(被拒绝)</b>
              </el-tooltip>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="jumpToUserInfo()"
              >我的信息
              </el-dropdown-item
              >
              <el-dropdown-item style="color: red" @click.native="quit()"
              >退出登录
              </el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from "vuex";
  import {getToken} from "../utils/auth";

  export default {
    name: "Header",
    inject: ["reload"],
    data() {
      return {
        logo_url:
          "http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/logo.png",
        isAuthorized: true,
        isRejected: false,
      };
    },
    components: {},
    computed: {
      ...mapGetters(["userId", "userInfo"]),
    },
    async mounted() {
      if (getToken()) {
        await this.getUserInfo();
        console.log(this.userInfo);
      }
    },
    methods: {
      ...mapActions(["logout", "getUserInfo"]),
      selectMenu(v) {
      },
      async quit() {
        await this.$store.dispatch("logout");
        await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      },
      async mounted() {
        await this.getUserInfo();
        const r = this.userInfo.role;
        if (
          r == "UnauthorizedCompany" ||
          r == "UnauthorizedBank" ||
          r == "UnauthorizedDataProvider"
        ) {
          this.isAuthorized = false;
          alert("未授权")
        }
        if (r == "rejected") {
          this.isRejected = true
        }
        console.log(this.userInfo);
      },
      tagClick() {
        alert("click");
      },
      jumpToUserInfo() {
        this.$router.push("/userInfo");
      },
      jumpToHome() {
        this.$router.push("/home");
      },
      jumpToLogin() {
        this.$router.push("/login");
      },
      jumpToRegister() {
        this.$router.push("/register");
      },
      jumpToMyChart() {
        this.$router.push("/myChart");
      },
      jumpToPlatformInstruction(){
        this.$router.push("/platformInstruction");
      },
      jumpToQAndAInstruction(){
        this.$router.push("/QAndAInstruction");
      },
      jumpToChartEdit() {
        this.$router.push("/ChartEdit");
      },
      jumpToMoreVersion(){
        window.open("http://212.129.149.40/users/sign_in");
      }
    },
  };
</script>
<style scoped lang="less">
  .el-menu {
    padding: 0;
    margin: 0;
    border: 0;
  }

  .support {
    display: flex;
    align-items: baseline;

    h2 {
      color: white;
      margin-right: 5px;
    }

    h5 {
      color: rgba(255, 255, 255, 0.808);
    }
  }

  #label {
    vertical-align: middle;
    min-width: 400px;
    text-align: center;

    .logo {
      height: 50px;
      margin-right: 16px;
      border-style: none;
      cursor: pointer;
    }

    .title {
      font-size: 33px;
      color: rgba(255, 255, 255, 0.884);
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
    }
  }
</style>
