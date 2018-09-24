<template>
  <div class="login-body" :style="{backgroundImage:backgroundImage}">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <!-- <img src="./images/logo-bl.png"/> -->
        <p class="login-title-text">成长云</p>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="userName" class="login-item">
            <el-input v-model="form.userName" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form">登陆</el-button>
          </el-form-item>
        </el-form>
        <span class="errText">{{errText}}</span>
        <a style="float:right;" href="">忘记密码</a>
      </div>
    </div>
    <div class="logoBox">
      <img src="./images/logo.png">
      <div class="text">
        儿童成长智慧健康服务
      </div>
    </div>
    <div class="login-foot">
      <el-col :span="24">
        <!-- <p>Copyright 2018 ©邦龙资本 ICP备12345678号</p> -->
      </el-col>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    components: {},
    data() {
      return {
        errText:'',
        form: {
          userName: null,
          password: null,
          loginType: 'account'
        },
        rules: {
          userName: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false,
        backgroundImage: "url(" + require("./images/banner.png") + ")",
      }
    },
    methods: {
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.load_data = true
          //登录提交
          this.$fetch.api_user.login(this.form)
            .then(({data, msg}) => {

              this.$store.commit('user_infoFn',{
                user: data,
                login: true
              })
              this.$message.success(msg)
              setTimeout(this.$router.push({path: '/'}), 500)
              this.$router.push({
                path: '/home'
              })
            })
            .catch(({code,data}) => {
            this.errText = data
              this.load_data = false
            })
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      position: absolute;
      width: 435px;
      height: 360px;
      padding: 20px;
      // margin: 100px auto;
      left: 60%; /* 定位父级的50% */
      top: 23%;
      // margin-top: -200px;
      // margin-left: 100px;
      background-color: rgb(255, 255, 255);
      border-radius: 5px;
      vertical-align: middle;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      .login-title {
        margin-bottom: 20px;
        text-align: center;
        .login-title-text{
          font-size: 30px;
          font-weight: bold;
          color: #36a3f7;
        }
      }
      .login-item {
        margin-bottom: 45px;
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        background: rgb(0, 158, 224);
        &:active, &:hover {
          background: rgb(2, 134, 190);
        }
      }
    }
  }
  .errText{
    font-size: 14px;
    color: #ff0000;
  }
.logoBox{
  position: absolute;
  left: 200px;
  top: 130px;
  .text{
    font-size: 48px;
    color: #009EE0;
  }
}
  .login-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background: #000;
    opacity: 0.5;
  }
</style>
