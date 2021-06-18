<template>
  <div class="userInfo">
    <el-container>
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <el-main>
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <div class="centerArea">
            <div class="centerBox">
              <el-form label-position="right" class="centerForm" label-width="100px" ref="highForm" :model="nameForm">
                <el-form-item label="用户名:" prop="username" class="boxItem" required>
                  <el-input placeholder="请输入用户名" v-model="nameForm.username" v-if="modify" :span="4"></el-input>
                  <span v-else>{{ userInfo.username }}</span>
                  <el-form-item v-if="modify" >
                    <el-button type="primary" @click="saveModify('highForm')">
                      保存
                    </el-button>
                    <el-button type="default" style="margin-left: 30px" @click="cancelModify('highForm')">
                      取消
                    </el-button>
                  </el-form-item>
                  <el-form-item  v-else>
                    <el-button type="default" @click="modifyInfo">
                      修改用户名
                    </el-button>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="邮箱:" class="boxItem">
                  <span>{{ userInfo.email }}</span>
                </el-form-item>
                <el-form-item label="图谱数量:" class="boxItem">
                  <span>{{ chartList.length }}</span>
                </el-form-item>
                <el-form :model="infoForm" style="margin-top: 30px;" :rules="rules" ref="lowForm">
                  <el-form-item label="原密码" prop="oldPassword" v-if="modifyPassword">
                    <el-input
                      type="password"
                      placeholder="请输入原密码"
                      v-model="infoForm.oldPassword"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password" v-if="modifyPassword">
                    <el-input
                      type="password"
                      placeholder="请输入新密码"
                      v-model="infoForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="再次输入密码" prop="twicePassword" v-if="modifyPassword">
                    <el-input
                      type="password"
                      placeholder="请再次输入新密码"
                      v-model="infoForm.twicePassword"></el-input>
                  </el-form-item>
                  <el-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modifyPassword">
                    <el-button type="primary" @click="saveModifyPwd('lowForm')">
                      保存
                    </el-button>
                    <el-button type="default" style="margin-left: 30px" @click="cancelModifyPwd('lowForm')">
                      取消
                    </el-button>
                  </el-form-item>
                  <el-form-item :wrapper-col="{ span: 8, offset: 4 }" v-else>
                    <el-button type="default" @click="modifyPwd">
                      修改密码
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="4"></el-col>
      </el-main>
    </el-container>
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
          if (value===this.infoForm.password) {
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
          if (value===this.userInfo.password) {
            callback()
          } else {
            callback(new Error('密码错误！'))
          }
        }, 100)
      };
      return {
        nameForm: {
          username: '',
        },
        infoForm: {
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
          twicePassword:[
            {required: true, message: '请再次输入密码', trigger: "blur"},
            {validator: checkPwd, trigger: 'blur'}
          ],
          oldPassword:[
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
        'getChartList'
      ]),
      saveModify(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.verifyAccount(this.infoForm);
            this.$refs[formName].resetFields();
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
            await this.verifyAccount(this.infoForm);
            this.$refs[formName].resetFields();
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

</style>
