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
                  <el-form label-position="right" class="centerForm" :model="registerForm" :rules="rules"
                           ref="registerForm" label-width="100px">
                    <el-form-item label="用户名:" prop="username" class="boxItem" required>
                      <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email" class="boxItem" required>
                      <el-input placeholder="请输入邮箱" v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证:" prop="code" class="boxItem" required>
                      <el-col :span="15">
                        <el-input placeholder="请输入验证码" v-model="registerForm.code"></el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="primary" @click="getCode" class="getCode">获取验证码</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password" class="boxItem" required>
                      <el-input placeholder="请输入密码" v-model="registerForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="secondPassword" class="boxItem" required>
                      <el-input placeholder="请再次输入密码" v-model="registerForm.secondPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="boxItem">
                      <el-button type="primary" @click="submitForm('registerForm')" class="buttonInRegister"> 注册
                      </el-button>
                      <el-link class="loginDirectly" @click="goLogin"><span>已有账号？直接登录</span></el-link>
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
    name: "register",
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
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码'))
        }
        setTimeout(() => {
          if (this.registerForm.password === value) {
            callback()
          } else {
            console.log(this.registerForm.password);
            console.log(value);
            callback(new Error('两次密码不一致！'))
          }
        }, 100)
      };
      return {
        registerForm: {
          username: '',
          email: '',
          code: '',
          password: '',
          secondPassword: ''
        },
        imgSrc: 'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/cover.png',
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: "blur"},
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: "blur"}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: "blur"},
            {min: 6, max: 20, message: '长度在6至20之间', trigger: 'blur'}
          ],
          secondPassword: [
            {validator: checkPassword, trigger: 'blur'}
          ],
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
        'addAccount',
        'sendCode'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.addAccount(this.registerForm)
          } else {
            console.log(valid);
            return false;
          }
        });
      },
      async getCode() {
        await this.sendCode(this.registerForm.email)
      },
      async goLogin() {
        await this.$store.dispatch("logout");
        await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    }
  }
</script>


<style scoped>
  .background {
    width: 100%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: fixed;
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
    width: 600px;
    margin-left: 160px;
    position: center;
  }

  .centerBox >>> .el-form-item__label {
    font-size: 16px;
    color: steelblue;
  }

  .boxItem {
    padding: 0 50px 0 50px;
  }

  .buttonInRegister {
    margin: 10px 50px 0 40px;
    padding: 10px 30px 10px 30px;
    font-size: 20px;
  }

  .loginDirectly {
    margin-left: 20px;
    color: blue;
  }

  .getCode {
    margin-left: 30px;
  }
</style>

