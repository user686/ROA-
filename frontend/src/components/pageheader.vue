<template>
  <div class="header-container">
    <div class="page-header" :class="scrollHeight >= 100 ? 'scroll-class' : ''">
      <h1 class="right" @click="reloadhome">
        <img src="../assets/logo.png" alt="">
      </h1>
      <div class="left">
        <div class="item1">
          <van-search v-model="searchval" @input="searchinput" placeholder="请输入搜索关键词" />

          <div class="search-dropdown" v-show="ctxlist.length">
            <div class="li" v-for="(item, index) in ctxlist" @click="changeCtx(item)" :key="index">{{ item.name }}</div>
          </div>
        </div>
        <div class="item1" :class="{ 'active': index == 0 }" @click="$router.replace('/caregory')">
          <span>全部</span>
        </div>
        <div class="item1" :class="{ 'active': index == 1 }" @click="$router.replace('/video')">
          <div class="icon1">👉</div><span>视频教程</span>
        </div>
        <div class="item1" @click="openInpt">
          <span>意见反馈</span>
        </div>
        <div class="item1" :class="{ 'active': index == 3 }" @click="$router.push({ name: 'myorder' })">
          <span>我的订单</span>
        </div>
        <div class="item1" v-if="!userinfo.email" @click="$router.replace('/login')">
          <img src="../assets/home.png" alt="">
          <span>登录注册</span>
        </div>
        <div class="item1 item5" v-if="userinfo.email" @click="openPayConfirm">
          <span>{{ userinfo.email }}</span>
        </div>
      </div>
    </div>

    <van-dialog v-model="show" title="意见建议" show-cancel-button @confirm="submit" @open="open">
      <van-field v-model="message" rows="5" autosize label="留言" type="textarea" maxlength="500"
        placeholder="如：智慧树网课套餐次数设置不合理，建议增加次数、××平台建议增加××功能等等..." show-word-limit />

    </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { handleAddFeedback } from '@/utils/api/pageheader'
import { handleGetCtxlist } from '@/utils/api/home'
import { mapState } from 'vuex';
export default {
  name: 'pageheader',
  props: {

  },
  data() {
    return {
      index: -1,
      scrollHeight: 0,
      token: '',
      // userinfo: '',
      show: false,
      message: '',
      searchval: '',
      ctxlist: [],
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (route.path == '/caregory') {
          this.index = 0
        }
        if (route.path == '/video') {
          this.index = 1
        }
        if (route.path == '/agencydesc') {
          this.index = 2
        }
        if (route.path == '/myorder') {
          this.index = 3
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({ userinfo: 'userinfo' })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    target() {
      window.open(`http://${location.host}/useradmin/adminorder`)
    },
    searchinput(val) {
      console.log(val);
      if (val.trim() == '') {
        this.ctxlist = []
        return;
      }

      handleGetCtxlist(val).then(res => {
        if (res.code == 200) {
          this.ctxlist = res.result;
          if (!res.result.length) {
            this.ctxlist.push({
              name: '🔥个人有偿专属定制',
              id: '-1'
            })
          }
        }
      })
    },
    changeCtx(item) {
      if (item.id == '-1') {
        this.$bus.$emit('showPoupe1')
        return
      }
      window.open('/?ctxid=' + item.id)
    },
    open() {
      let userid = localStorage.getItem('tooltoken')
      if (!userid) {
        Toast.fail('请先登录');
      }
    },
    submit() {
      if (this.message.trim().length <= 0) {
        Toast.fail('建议内容不能为空');
        return;
      }
      // 提交意见
      handleAddFeedback({
        content: this.message
      }).then(res => {
        if (res.code == 200) {
          Toast.success('反馈成功');
        } else {
          Toast.fail('服务器错误，请联系客服');
        }
      })
    },
    openInpt() {
      this.show = true
    },
    reloadhome() {
      this.$router.replace('/')
    },
    openPayConfirm() {
      this.$router.push({
        name: 'user'
      })
    },
    handleScroll() {
      var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.scrollHeight = scrollHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/.van-field__label {
  width: 2.2em !important;
}

/deep/.van-search {
  width: 550px;
  height: 40px;

  .van-search__content {
    border: 1px solid #157bae;
    background-color: #ffffff;
    border-radius: 20px;
  }
}

.header-container {
  height: 60px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 60px;
  // background-color: aqua;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999;
  padding: 0 20px;
  top: 0;
  transition: all 0.6s;

  .right {
    cursor: pointer;

    img {
      width: 7.5rem;
      height: 3.125rem;
      position: relative;
      top: .1875rem;

    }
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;

    .item1 {
      color: rgba(0, 0, 0, 0.8);
      font-size: .875rem;
      cursor: pointer;
      margin-left: 30px;
      transition: all .3s;
      font-family: SF Pro SC, SF Pro Text, SF Pro Icons, PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;
      padding-bottom: 2px;
      position: relative;
      display: flex;
      align-items: center;
      img {
        width: 1.25rem;
        height: 1.25rem;
        position: relative;
        top: .25rem;
        margin-right: 4px;
      }
    }

    .item1:hover {
      color: rgb(0, 113, 227);
    }

    .active {
      border-bottom: 2px solid orange;
    }

    .search-dropdown {
      width: 100%;
      position: absolute;
      top: 100%;
      left: 12px;
      background-color: #fff;
      box-shadow: 0 0 3px rgba(26, 25, 25, 0.5);
      box-sizing: border-box;
      border-radius: 4px;

      .li {
        color: #000;
        padding: 8px 0;
        padding-left: 8px;
        cursor: pointer;
        transition: all .3s;
      }

      .li:hover {
        background-color: #eee;
        color: orange;
      }
    }

    .item5 {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon1 {
      margin-right: 6px;
      animation: scaleAmimate 1s infinite ease-in-out;
    }

    @keyframes scaleAmimate {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.6);
      }

      100% {
        transform: scale(1);
      }

    }

  }
}

.scroll-class {
  box-shadow: 0 0 .625rem rgba(0, 0, 0, 0.5);
  opacity: 0.6;
}
</style>
