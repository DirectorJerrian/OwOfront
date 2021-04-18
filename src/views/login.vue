<template>
  <div style="font-size: 0">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="cover load failure"/>
    </div>
    <div>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="4">
              <el-row>
                <el-button class="myHome">
                  <img src="http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/home.png" width="60px"
                       height="auto" alt="home加载失败">
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="16">
              <div class="centerArea">
                <div class="centerBox">
                  <el-form label-position="right" class="centerForm" :model="loginForm" :rules="rules" ref="loginForm"
                           label-width="100px">
                    <el-form-item label="账号:" prop="email" class="boxItem" required>
                      <el-input placeholder="请输入邮箱" v-model="loginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password" class="boxItem" required>
                      <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="boxItem">
                      <el-button type="primary" @click="submitForm('loginForm')" class="buttonInLogin">登录</el-button>
                      <el-button @click="goRegister" class="buttonInLogin">注册</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/header";
  import router from '@/router'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "login",
    data() {
      const checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      };
      return {
        loginForm: {
          email: '',
          password: ''
        },
        imgSrc: 'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/cover.png',
        rules: {
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: "blur"},
            {min: 6, max: 20, message: '长度在6至20之间', trigger: 'blur'}
          ]
        },
      }
    },
    components: {
      Header,
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    mounted() {

    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      },
    },
    methods: {
      ...mapActions([
        'verifyAccount'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.verifyAccount(this.loginForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goRegister() {
        router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .background {
    width: 100%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
  }

  .el-header {
    padding: 0;
  }

  .myHome {
    margin: 100px 0;
    background: transparent;
    /*color: transparent;*/
    border: 0;
  }

  .centerArea {
    width: 960px;
    margin: 30px auto;
    padding: 30px 0 30px;
  }

  .centerBox {
    position: center;
    padding-top: 50px;
    padding-bottom: 30px;
    border-bottom: 2px solid #ccc;
    border-radius: 24px;
    box-shadow: 0 0 10px #ccc;
    background: rgba(255, 247, 193, 0.8);
  }

  .centerForm {
    width: 520px;
    margin-left: 180px;
    position: center;
  }

  .centerBox >>> .el-form-item__label {
    font-size: 16px;
    color: steelblue;
  }

  .boxItem {
    padding: 10px 50px 0 50px;
  }

  .buttonInLogin {
    margin: 10px 30px 0 25px;
    padding: 10px 30px 10px 30px;
    font-size: 20px;
  }
</style>
