<template>
  <div class="main">
    <PageHeader></PageHeader>

    <div class="container">
      <div class="section2">
        <div class="top">
          <div class="title">
            <div class="left">我的专属邀请链接</div>
            <div class="right" @click="setClipdata(userurl)">一键复制</div>
          </div>
          <div class="userurl">{{ userurl }}</div>
        </div>

        <div class="table">
          <div class="title">
            <div class="name">我的邀请</div>
            <div class="right" @click="getMoney">立即提现</div>
          </div>
          <div class="wrap">
            <div class="li thead">
              <div class="td td1">邀请用户账号</div>
              <div class="td">购买金额</div>
              <div class="td">奖励金额</div>
              <div class="td">奖励加速次数</div>
            </div>
            <div class="nodata">
              暂无邀请记录
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="name">邀请规则</div>
          <div class="wrap">
            <div class="li">1、将你的专属链接分享至好友，好友通过你的链接购买后，即可立即获取奖励;</div>
            <div class="li">2、每推荐1位新用户，联系客服后赠送50%加速次数或人民币订单金额的25%，两者选一;</div>
            <div class="li">3、若好友通过链接购买后无法显示，将购买记录发给客服即可</div>
          </div>
        </div>
      </div>



    </div>



  </div>
</template>

<script>
const key = "MySecretKeyCtx";
const CryptoJS = require("crypto-js");
// console.log('CryptoJS==>>', CryptoJS);
import { Toast, Dialog } from 'vant';
export default {
  name: 'user',
  data() {
    return {
      userinfo: '',
      userurl: '',
      Invitationcode: ''
    }
  },
  computed: {
    transformT() {
      return function (time) {
        let times = new Date(time)
        // return times[0];
        let Y = times.getFullYear()
        let M = times.getMonth() + 1
        let D = times.getDate()
        let h = times.getHours().toString().padStart(2, '0')
        let m = times.getMinutes().toString().padStart(2, '0')
        let s = times.getSeconds().toString().padStart(2, '0')
        return `${Y}/${M}/${D} ${h}:${m}:${s}`;
      }
    },
  },
  mounted() {
    let userinfo = localStorage.getItem('userinfo');

    if (!userinfo) {
      this.$router.push('/login');
      return;
    }
    this.userinfo = JSON.parse(userinfo)
    this.generateRandomString()
  },
  methods: {
    getMoney() {
      Toast.fail('暂无邀请记录');
    },
    generateRandomString() {
      this.Invitationcode = this.encrypt(this.userinfo.email,key)
      this.userurl = `${location.host}/login?Invitationcode=${this.Invitationcode}`

      // 解密
      let result = this.decrypt(this.Invitationcode, key)
      console.log('result', result);
    },
    // 加密函数
    encrypt(message, key) {
      const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
      return encryptedMessage;
    },
    // 解密函数
    decrypt(encryptedMessage, key) {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedMessage;
    },
    openPayConfirm() {
      Dialog.confirm({
        title: '提示',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonColor: '#086de1',
        message: '确认要退出登录吗？',
      })
        .then(() => {
          // on confirm
          localStorage.clear()
          location.reload()
        })
        .catch(() => {
          // on cancel

        });
    },
    setClipdata(data) {
      try {
        navigator.clipboard.writeText(data);
        Toast.success('复制成功')
      } catch (e) {
        const textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', 'readonly');
        textarea.value = data;
        document.body.appendChild(textarea);
        textarea.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          Toast.success('复制成功')
        }
        document.body.removeChild(textarea);
      }
    },
  }
}
</script>

<style scoped lang="less">
.main {
  height: 100vh;
  width: 100%;
}

.container {
  width: 1200px;
  min-height: 500px;
  margin: 0 auto;
  background-color: #fbfbfb;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 200px;
  margin-top: 20px;
  padding-top: 10px;
}

.section2 {
  width: 70%;

  .top {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    padding: 20px;
    border-radius: 10px;

    .title {
      display: flex;
      align-items: center;

      .left {
        font-size: 15px;
      }

      .right {
        margin-left: 65px;
        padding: 5px 15px;
        background: linear-gradient(135deg, #a4f0db, #0ba79c);
        font-size: 12px;
        border-radius: 8px;
        cursor: pointer;
        color: #fbfbfbea;
      }
    }

    .userurl {
      color: #000;
      font-family: '微软雅黑';
      font-size: 14px;
      font-weight: 550;
    }
  }

  @borderColor: #c8c8c8;

  .table {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .name {
        // font-size: 15px;
        color: #4c4c4c;
      }

      .right {
        padding: 6px 15px;
        background: linear-gradient(135deg, #a4f0db, #0ba79c);
        font-size: 12px;
        border-radius: 8px;
        cursor: pointer;
        color: #fbfbfbea;
      }
    }

    .thead {
      font-weight: 550;
    }

    .wrap {
      width: 630px;
      box-sizing: border-box;
      border-left: 1px solid @borderColor;
      border-bottom: 1px solid @borderColor;
      border-right: 1px solid @borderColor;
      border-top: 1px solid @borderColor;

      .li {
        display: flex;

        .td {
          width: 150px;
          text-align: center;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-right: 1px solid @borderColor;
          border-bottom: 1px solid @borderColor;
          height: 30px;
          line-height: 30px;
        }

        .td:last-child {
          border-right: none;
        }

        .td1 {
          width: 180px;
        }
      }

      .nodata {
        text-align: center;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
      }
    }
  }

  .bottom {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;

    .name {
      margin-bottom: 10px;
    }

    .wrap {
      .li {
        font-size: 13px;
        line-height: 23px;
      }
    }
  }
}
</style>
