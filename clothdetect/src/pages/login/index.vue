<template>
  <div class="loginOut">
    <div class="loginBlack"></div>
    <div class="loginDiv">
      <div class="loginLogo"></div>
      <p class="loginTitle">臂上眼-布匹瑕疵检测系统</p>
      <div class="login">
        <div class="rightLogin">
          <div class="loginInner">
            <el-form :model="ruleForm" ref="ruleForm">
              <el-form-item prop="username">
                <el-input class="textarea" v-model.number="ruleForm.username" placeholder="请输入账号" type="text">
                  <template slot="prepend">
                    <div class="prepend_input"><span></span></div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码">
                  <template slot="prepend">
                    <div class="prepend_input"><span></span></div>
                  </template>
                </el-input>
              </el-form-item>
              <p class="loginInner_forget">
                <span @click="$router.push({ name: 'forget' })" class="forget_span"
                  style="float: left; cursor: pointer">忘记密码</span>
                <span @click="$router.push({ name: 'register' })" class="register_span" style="float: right">立即注册</span>
              </p>
              <el-form-item>
                <el-button type="primary" @click="login('ruleForm')" class="login_btn"><span
                    class="loginspan">登录</span></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from '../../api/types'
import { messageTips } from '../../assets/js/minx'
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        password: '',
        username: '',
      },
    }
  },
  methods: {
    //登录
    async login() {
      var username = String(this.ruleForm.username)
      var password = String(this.ruleForm.password)
      if (password && username) {
        var result = await LOGIN({ username, password })
        console.log(result, 'result')
        if (result.status == 0) {
          messageTips('登陆成功', 1000, 'success')
          //清空表单
          this.resetForm('ruleForm')
          this.$router.push('/home')
        } else {
          messageTips(result.msg, 1500, 'error')
        }
      } else {
        messageTips('账号或密码不能为空', 1500, 'warning')
      }
    },
    // 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="less">
.loginOut {
  height: 100vh;
  background-image: url('../../assets/imgs/login/login.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .loginDiv {
    height: 100vh;
    width: 40rem;
    background: #d4e8f5;
    opacity: 0.6;
    margin: 0 auto;
    padding-top: 10rem;
    text-align: center;

    .loginLogo {
      width: 6rem;
      height: 6rem;
      background: #f9fcff;
      border: 4px solid #81b4da;
      border-radius: 50%;
      background-image: url('../../assets/imgs/logo/logo.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0px auto;
    }

    .loginTitle {
      width: 14rem;
      height: 1.7rem;
      font-size: 0.9rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #1d5d8d;
      margin: 0.9rem auto 2.4rem auto;
      cursor: pointer;
    }

    .login {
      .rightLogin {
        .loginInner {
          margin: 0 auto;

          .el-input {
            width: 70%;

            .el-input-group__append,
            .el-input-group__prepend {
              background-color: #1d5d8d;
              padding: 10px;

              .prepend_input {
                span {
                  width: 1rem;
                  height: 1rem;
                  display: block;
                  background-image: url('../../assets/imgs/logo/admin.png');
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                }
              }
            }
          }

          .login_btn {
            width: 70%;
            height: 3.1rem;
            font-size: 1.2rem;
            letter-spacing: 0.15rem;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            background: #04528d;
            border: 1px solid #8bbadd;
            border-radius: 0.75rem;
          }

          .loginInner_forget {
            width: 70%;
            margin: 0 auto;
            padding: 0px 0 3rem 0;
            height: 1.15rem;
            font-size: 1.2rem;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #3a709a;

            .forget_span,
            .register_span {
              color: #022846;
            }
          }
        }
      }
    }
  }
}
</style>
