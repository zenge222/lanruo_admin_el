<template>
  <div class="login_page">
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <img src="@/assets/icon_logo.png" alt="" />
          <h3 class="title">蓝若职业技能培训学校管理系统</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <div class="code_item">
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              tabindex="3"
              maxlength="4"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <img :src="codeImg" @click="getCodeImg" alt />
        </div>
        <el-button
          class="login_btn"
          :loading="loading"
          style="width: 100%; margin-bottom: 30px,background:#7E1770"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { mapActions, mapState } from "vuex";
import api from "@/api/apiConfig";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value);
      if (value == "") {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      codeImg: "",
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  computed: {
    ...mapState({
      routes: (state) => state.user.routes,
    }),
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCodeImg();
  },
  methods: {
    ...mapActions([""]), // resetRouter
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    getCodeImg() {
      this.codeImg = `${api.baseURL}common/code?` + Math.random();
      console.log(this.codeImg);
    },
    handleLogin() {
      console.log(this.loginForm);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {})
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #7e1770;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.code_item {
  display: flex;
  align-items: center;
  .el-form-item {
    flex: 1;
  }
  img {
    margin: 0 0 20px 20px;
    display: block;
    width: 120px;
    height: 35px;
  }
}

/* reset element-ui css */
.login-container {
  position: fixed;
  right: 200px;
  top: 0;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  // min-height: 100%;
  // width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    > img {
      display: block;
      width: 100px;
      margin: 0 auto 36px auto;
    }
    .title {
      font-size: 28px;
      color: #7e1770;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login_page {
  height: 100%;
  background: url("~@/assets/images/login_bg.png") no-repeat #ffffff 0 0;
  background-size: 1100px;
  .login_btn {
    background: #7e1770;
    color: #ffffff;
  }
}
</style>
