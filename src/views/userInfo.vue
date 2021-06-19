<template>
  <div style="font-size: 0">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="cover load failure"/>
    </div>
    <div class="userInfo">
      <el-container>
        <el-header style="padding: 0">
          <Header></Header>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="4"></el-col>
            <el-col :span="16">
              <div class="centerArea">
                <div class="centerBox">
                  <el-form label-position="right" class="centerForm" label-width="200px" ref="highForm"
                           :model="infoForm">
                    <el-form-item label="用户名:" prop="username" class="boxItem" required>
                      <el-input placeholder="请输入用户名" v-model="infoForm.username" v-if="modify"
                                style="width: 200px"></el-input>
                      <span v-else>{{ userInfo.username }}</span>
                      <span v-if="modify" style="margin-top: 20px">
                      <el-button type="primary" style="margin-left: 60px" @click="saveModify('highForm')">
                        保存
                      </el-button>
                      <el-button type="default" style="margin-left: 30px" @click="cancelModify('highForm')">
                        取消
                      </el-button>
                    </span>
                      <span v-else style="margin-top: 20px">
                      <el-button type="default" @click="modifyInfo" style="margin-left: 30px">
                        修改用户名
                      </el-button>
                    </span>
                    </el-form-item>
                    <el-form-item label="邮箱:" class="boxItem">
                      <span>{{ userInfo.email }}</span>
                    </el-form-item>
                    <el-form-item label="图谱数量:" class="boxItem">
                      <span>{{ chartList.length }}</span>
                    </el-form-item>
                  </el-form>
                  <el-form class="centerForm" :model="infoForm" label-position="right" label-width="200px"
                           style="margin-top: 30px;" :rules="rules" ref="lowForm">
                    <el-form-item label="原密码" prop="oldPassword" v-if="modifyPassword">
                      <el-input style="width: 200px"
                                type="password"
                                placeholder="请输入原密码"
                                v-model="infoForm.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password" v-if="modifyPassword">
                      <el-input style="width: 200px"
                                type="password"
                                placeholder="请输入新密码"
                                v-model="infoForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="twicePassword" v-if="modifyPassword">
                      <el-input style="width: 200px"
                                type="password"
                                placeholder="请再次输入新密码"
                                v-model="infoForm.twicePassword"></el-input>
                    </el-form-item>
                    <el-form-item v-if="modifyPassword">
                      <el-button type="primary" @click="saveModifyPwd('lowForm')">
                        保存
                      </el-button>
                      <el-button type="default" style="margin-left: 30px" @click="cancelModifyPwd('lowForm')">
                        取消
                      </el-button>
                    </el-form-item>
                    <el-form-item v-else>
                      <el-button type="default" @click="modifyPwd">
                        修改密码
                      </el-button>
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
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "personalInfo",
    data() {
      const checkPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码'))
        }
        setTimeout(() => {
          if (value === this.infoForm.password) {
            callback()
          } else {
            callback(new Error('两次密码不一致！'))
          }
        }, 100)
      };
      const checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入原密码'))
        }
        setTimeout(() => {
          console.log(this.userInfo.password);
          if (value === this.userInfo.password) {
            callback()
          } else {
            callback(new Error('密码错误！'))
          }
        }, 100)
      };
      return {
        imgSrc: 'http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/cover.png',
        infoForm: {
          username: '',
          oldPassword: '',
          password: '',
          twicePassword: ''
        },
        modify: false,
        modifyPassword: false,
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: "blur"},
            {min: 6, max: 20, message: '长度在6至20之间', trigger: 'blur'}
          ],
          twicePassword: [
            {required: true, message: '请再次输入密码', trigger: "blur"},
            {validator: checkPwd, trigger: 'blur'}
          ],
          oldPassword: [
            {required: true, message: '请输入原密码', trigger: "blur"},
            {validator: checkOldPwd, trigger: 'blur'}
          ]
        },
      }
    },
    components: {
      Header,
    },
    computed: {
      ...mapGetters([
        'token',
        'userId',
        'userInfo',
        'chartList'
      ])
    },
    async mounted() {
      await this.getUserInfo();
      await this.getChartList();
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'verifyAccount',
        'getChartList',
        'updateUserName',
        'updateUserPassword',
      ]),
      saveModify(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const userData = {
              username: this.infoForm.username,
              password: this.userInfo.password,
              email: this.userInfo.email,
            }
            await this.updateUserName(userData);
            this.$refs[formName].resetFields();
            this.modify = false;
            return true;
          } else {
            console.log('error submit!!');
            this.$refs[formName].resetFields();
            return false;
          }
        });
      },
      saveModifyPwd(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const userData = {
              username: this.userInfo.username,
              password: this.infoForm.password,
              email: this.userInfo.email,
            }
            await this.updateUserPassword(userData);
            this.$refs[formName].resetFields();
            this.modifyPassword = false;
            return true;
          } else {
            console.log('error submit!!');
            this.$refs[formName].resetFields();
            return false;
          }
        });
      },
      modifyInfo() {
        this.modify = true
      },
      modifyPwd() {
        this.modifyPassword = true
      },
      cancelModify(formName) {
        this.modify = false;
        this.$refs[formName].resetFields();
      },
      cancelModifyPwd(formName) {
        this.modifyPassword = false;
        this.$refs[formName].resetFields();
      },
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
  .centerArea {
    position: center;
    width: 960px;
    margin: 30px 0 0 300px;
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
</style>
