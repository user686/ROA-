<template>
  <div class="main">
    <PageHeader></PageHeader>

    <div class="container">

      <div class="section">

        <div class="li" @click="$navTo({ name: 'myorder' })">
          <div class="name">
            <img src="@/assets/icon7.png" alt="">
            我的订单
          </div>
          <div class="desc">可查询个人订单，剩余加速次数</div>
        </div>
        <!-- <div class="li" @click="target({ name: 'myshare' })">
          <div class="name">
            <img src="@/assets/icon4.png" alt="">
            我的邀请
          </div>
          <div class="desc">邀请好友使用，可获得奖励</div>
        </div> -->
        <!-- <div class="li" @click="target({ name: 'agencydesc' })">
          <div class="name">
            <img src="@/assets/icon5.png" alt="">
            {{ userinfo.isagency == '1' ? '分站管理' : '开通分站' }}
          </div>
          <div class="desc">发布自己的脚本无需代码成为代理，成为副业</div>
        </div> -->
        <!-- <div class="li" @click="isShow = true">
          <div class="name">
            <img src="@/assets/tousu.png" alt="">
            投诉
          </div>
          <div class="desc">投诉代理不退款，无法购买，代理服务态度恶劣等</div>
        </div> -->
        <div class="li" @click="openPayConfirm">
          <div class="name">
            <img src="@/assets/icon6.png" alt="">
            退出登录
          </div>
          <div class="desc">点击退出登录，可切换账号</div>
        </div>

      </div>


      <van-overlay :show="isShow" @click="isShow = false">
        <div class="wrapper">
          <div class="content">
            <div class="title">
              微信账号
            </div>
            <div class="desc">
              由于微信联系较多，添加时（备注 我要投诉）
            </div>
            <div class="img-wrap">
              <img src="http://123.249.73.192:7003/image/ctx/schoolimg/tousuwx.jpg" alt="">
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Toast, Dialog } from 'vant';
export default {
  name: 'user',
  data() {
    return {
      userinfo: '',
      isShow: false,
    }
  },
  mounted() {
    this.userinfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : {};
  },
  methods: {
    showTip() {
      Toast.success('正在完善，敬请期待')
    },
    target(option) {
      this.$router.push(option)
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
          this.$store.commit('SetUserInfo', {})
          this.$router.replace('/')
          setTimeout(() => {
            location.reload()
          }, 1500);
        })
        .catch(() => {
          // on cancel

        });
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

.section {
  width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .li {
    background: linear-gradient(135deg, #234785, #465cccd8);
    box-sizing: border-box;
    padding: 13px 13px;
    border-radius: 13px;
    cursor: pointer;
    color: #fbfbfb;
    transition: all .5s;

    .name {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      font-size: 15px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }

    .desc {
      font-size: 13px;
      height: 40px;
    }
  }

  .li:hover {
    box-shadow: 0 0 9px rgba(0, 0, 0, .7);
    transform: scale(1.01);
  }
}


.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .content {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    padding: 40px 76px;
    width: 664px;
    max-width: 816px;
    font-family: SF Pro SC, SF Pro Display, SF Pro Icons, AOS Icons, PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #1d1d1f;

    .title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .desc {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    img {
      width: 250px;
      height: 250px;
    }
  }
}</style>
