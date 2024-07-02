<template>
  <div class="container">
    <div class="page-left">
      <div class="header">
        <div class="title">
          欢迎使用 <span>高智网</span>
        </div>
        <div class="text">欢迎使用高智网</div>
      </div>

      <!-- <div class="login-type">
        <div class="li" :class="{ 'active': loginType == 1 }" @click="changType(1)">邮箱</div>
        <div class="li" :class="{ 'active': loginType == 2 }" @click="changType(2)">手机号</div>
      </div> -->

      <div class="form-wrap">
        <van-form @submit="onSubmit" label-align="top">
          <van-cell-group inset>
            <div v-show="loginType == 1">
              <van-field v-model="username" name="邮箱" label="" type="email" placeholder="邮箱 一键注册登录"
                :rules="[{ required: true, message: '请填写邮箱' }]" />
            </div>
            <div v-show="loginType == 2">
              <van-field v-model="username" name="手机号" label="" type="email" placeholder="手机号 一键注册登录"
                :rules="[{ required: true, message: '请填写手机号' }]" />
            </div>



            <div class="vercode">
              <div class="vercode-ipt">
                <van-field v-model="code" name="验证码" label="" placeholder="验证码"
                  :rules="[{ required: true, message: '请填写验证码' }]" />
              </div>
              <div class="getCode" @click="getCode">{{ time > 0 ? `${time}秒` : '获取验证码' }}</div>
            </div>

          </van-cell-group>

          <div class="radio-wrap">
            <div class="radio" :class="{ 'selected': checked }" @click="adiochange"></div>
            <div class="text" @click="target(1)">已阅读用户隐协议</div>
          </div>

          <div class="submitBtn" @click="onSubmit">
            提交
          </div>
        </van-form>
      </div>

      <div class="login-form-item">
        邮箱一键登录
      </div>
      <div class="text-small">
        Copyright&copy; 2022 高智网
      </div>

    </div>
    <div class="page-right">

    </div>
  </div>
</template>

<script>
const key = "MySecretKeyCtx";
const CryptoJS = require("crypto-js");
import { handleTest, handleGetCode, handleRegister, handleGetPhoneCode } from '../utils/api/login'
import { Toast } from 'vant';
export default {
  name: 'HelloWorld',
  data() {
    return {
      username: "",
      password: '123123@&@',
      code: '',
      checked: true,
      time: 0,
      loginType: 1, // 1 邮箱 2 手机号
      params: {},
    }
  },
  mounted() {
    let $route = this.$route
    this.params = $route.query
    console.log('params===>>>', this.params);
    if (this.params.Invitationcode) {
      this.decrypt()
    }
  },
  methods: {
    getCode() {
      if (this.time > 0) return;

      // Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: '正在获取验证码',
      // });
      if (this.loginType == 1) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(this.username);
        if (!isValidEmail) {
          Toast.fail('输入的邮箱的格式不正确');
          return
        }

        handleGetCode({
          email: this.username
        }).then(res => {
          console.log(res);
          if (res.code == -1) {
            Toast.fail(res.message)
          }
          if (res.code == 200) {
            this.time = 60 * 5
            let timer = setInterval(() => {
              this.time -= 1
              if (this.time <= 0) {
                clearInterval(timer)
              }
            }, 1000)
            Toast.clear()
            Toast.success('验证码发送成功');
          }
        })
      }
      if (this.loginType == 2) {
        const regex = /^1\d{10}$/;
        const isValidEmail = regex.test(this.username);
        if (!isValidEmail) {
          Toast.fail('输入的手机号的格式不正确');
          return
        }

        handleGetPhoneCode({
          phone: this.username
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.time = 60 * 5
            let timer = setInterval(() => {
              this.time -= 1
              if (this.time <= 0) {
                clearInterval(timer)
              }
            }, 1000)
            Toast.clear()
            Toast.success('验证码发送成功');
          }
        })
      }
    },
    adiochange(e) {
      checked.value = checked.value ? false : true;
    },
    onSubmit(values) {
      console.log('submit', values);
      if (!this.checked) return;
      handleRegister({
        "email": this.username,
        "password": this.password,
        "code": this.code
      }).then(res => {
        console.log(res);
        let token = res.headers['x-access-token']
        if (token) {
          localStorage.setItem('tooltoken', token)
          this.getUserInfo()
          this.$router.replace({
            name: 'home',
            query: {
              ctxid: localStorage.getItem('ctxid')
            }
          })
        } else {
          Toast.fail(res.data.message);
        }
      })
    },

    changType(type) {
      this.loginType = type
    },

    // 解密函数
    decrypt() {
      const decryptedBytes = CryptoJS.AES.decrypt(this.params.Invitationcode, key);
      const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
      this.Invitationcode = decryptedMessage

      localStorage.setItem('Invitationcode', this.Invitationcode)
    },
    target(id) {
      window.open(`${location.host}/vhtml?id=${id}`)
    }
  }
}

</script>

<style scoped lang="less">
.container {
  display: flex;
  height: 100vh;
}

.page-left {
  width: 30%;
  box-sizing: border-box;
  padding: 0 40px;

  .header {
    margin-top: 170px;

    .title {
      span {
        font-family: '黑体';
        font-weight: 550;
        font-size: 20px;
      }
    }

    .text {
      font-size: 13px;
      margin-top: 10px;
      color: rgba(51, 71, 91, 0.5);
      cursor: pointer;
    }
  }

  .login-type {
    display: flex;
    margin-top: 10px;
    position: relative;
    top: 10px;

    .active {
      color: #007bff;
    }

    .li {
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .form-wrap {
    position: relative;

    /deep/.van-cell-group--inset {
      overflow: unset;
    }

    /deep/.van-field {
      padding: 0;
      margin-top: 20px;
    }

    /deep/.van-cell-group {
      margin: 0;
    }

    /deep/.van-field__label {
      label {
        font-weight: 600;
        color: #34395e;
        font-size: 12px;
        letter-spacing: .5px;
      }
    }

    /deep/.van-field__body {
      background-color: #fdfdff;
      border-color: #e4e6fc;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 10px 15px;
    }

    .submitBtn {
      cursor: pointer;
      font-size: 12px;
      padding: 0 1.5rem;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 2px 6px #acb5f6;
      background-color: #6777ef;
      border-color: #6777ef;
      color: #fff;
      width: 40px;
      text-align: center;
      border-radius: 5px;
      font-weight: 550;
      position: relative;
      left: 78%;
      transition: all .8s;
    }

    .submitBtn:hover {
      background-color: #007bff;
    }

    .radio-wrap {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .radio {
        width: 15px;
        height: 15px;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 50%;
        margin-right: 9px;
        box-sizing: content-box;
        cursor: pointer;
      }

      .selected {
        background-color: #007bff;
      }
    }

    .vercode {
      display: flex;
      align-items: center;

      .vercode-ipt {
        width: 200px;
        margin-right: 10px;
      }

      .getCode {
        font-size: 14px;
        width: 120px;
        background-color: #07c160;
        color: #fff;
        text-align: center;
        height: 45px;
        position: relative;
        top: 10px;
        line-height: 45px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

  }


  .login-form-item {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    font-weight: 400;
    font-family: "Nunito", "Segoe UI", arial;
    color: #6c757d;
    margin-top: 148px;

    a {
      color: #6777ef;
      font-weight: 500;
    }
  }

  .text-small {
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    font-weight: 400;
    font-family: "Nunito", "Segoe UI", arial;
    color: #6c757d;
    text-align: center;
    margin-top: 30px;
  }

}

.page-right {
  width: 70%;
  height: 100%;
  background: url("http://47.115.205.88:7005/public/image/ctx/logobg.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
