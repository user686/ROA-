<template>
  <div class="main">
    <div class="header">
      <h1 class="right">
        <img src="../assets/logo.png" alt="">
      </h1>
      <div class="left">
        <div class="item1">
          <img src="../assets/home.png" alt="">
          <span @click="openPayConfirm">返回首页</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="section section1">
        <div class="title">
          <div class="left">支付金额</div>
          <div class="right" @click="openPayConfirm">退出支付</div>
        </div>
        <div class="num">
          <div class="money">
            ￥ <span>{{ currentObj.price || '' }}</span>
          </div>
          <div class="desc" v-if="currentObj.text2">({{ currentObj.text2 }})</div>
        </div>

        <div class="info">
          <div class="li"><span>支付类型：</span>{{ currentObj.id == -1 ? '分站开通' : '网课加速支付' }}</div>
          <div class="li"><span>用户账号：</span>{{ userinfo.email }}</div>
          <div class="li"><span>支付方式：</span>支付宝</div>
        </div>
      </div>

      <div class="section section2">
        <div class="paylogo">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/bsLuElJnYSyLnSOLjKth.png" alt="">
        </div>

        <div class="code-wrap">
          <div class="tip">
            <div class="text">距离二维码过期还剩</div>
            <div class="time"><van-count-down :time="time" @finish="finish" /></div>
          </div>
          <div class="bottom">
            <div class="zfb-code_info">
              <div class="img-wrap">
                <img :src="currentObj.zfbimg" alt="">
              </div>
              <div class="contxt">
                <div class="left">
                  <img src="https://t16img.yangkeduo.com/mms_static/2019-05-21/7e5db98c-2ed1-47af-a12f-041c8ddb4ac2.png"
                    alt="">
                </div>
                <div class="right">
                  <div class="p">请使用支付宝“扫一扫”</div>
                  <div class="p">扫描二维码支付</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="back">
          <span class="pay" @click="hidepopup2">支付已完成？</span>
          <span class="nopay" @click="handleBack">再考虑考虑</span>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import {
  handleCreateOrder
} from '@/utils/api/order'
import { Dialog, Toast } from 'vant';
export default {
  name: 'pay',
  data() {
    return {
      currentObj: {},
      userinfo: '',
      time: 5 * 60 * 1000
    }
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if (!this.userinfo) {
      this.$router.replace('/login')
    }


    this.currentObj = this.$route.params
    if (JSON.stringify(this.currentObj) != '{}') {
      localStorage.setItem('orderdata', JSON.stringify(this.currentObj))
    }

    this.currentObj.createDate = new Date()

    if (this.currentObj.id) {
      this.getCountTime()
    } else {
      this.currentObj = JSON.parse(localStorage.getItem('orderdata'))
      this.openPayConfirm()
    }

    console.log('this.currentObj===>>', this.currentObj);
  },
  methods: {
    handleBack() {
      let ctxid = localStorage.getItem('ctxid')
      if(!ctxid){
        this.backHome()
        return
      }
      this.$router.replace({
        name: 'home',
        query: {
          ctxid: ctxid
        }
      })
    },
    getCountTime() {
      let date2 = new Date()
      let date1 = this.currentObj.createDate
      var s = Math.round((date2 - date1) / 1000);
      this.time = 5 * 60 * 1000 - s
    },
    openPayConfirm() {
      Dialog.confirm({
        title: '提示',
        confirmButtonText: '已支付',
        cancelButtonText: '未支付',
        confirmButtonColor: '#086de1',
        message: '是否已完成支付？',
      })
        .then(() => {
          // on confirm
          this.hidepopup2()
        })
        .catch(() => {
          // on cancel
          this.handleBack()
        });
    },
    hidepopup2() {
      handleCreateOrder({
        "price": this.currentObj.price.toString(),
        "count": this.currentObj.count,
        "canuse": this.currentObj.canuse,
        "parentid": this.currentObj.parentid,
        "type": this.currentObj.type
      }).then(res => {
        if (res.code == 200) {
          this.$router.replace({
            path: '/myorder'
          })
          localStorage.removeItem('orderdata')
          localStorage.removeItem('parentid')
        } else {
          Toast.fail(res.message ? res.message : '创建创建失败，请稍后重试，或联系下面客服')
          // setTimeout(() => {
          //   this.backHome()
          // }, 3500)
        }
      })
    },
    /**
     * 倒计时结束
     * */
    finish() {
      this.openPayConfirm()
    },
  }

}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100%;
}

.container {
  width: 75rem;
  min-height: 31.25rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 1.25rem;
  padding-bottom: 12.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 3.75rem;
  // background-color: aqua;
  box-shadow: 0 0 .625rem rgba(0, 0, 0, 0.5);
  align-items: center;

  .right {
    margin-left: 12.5rem;

    img {
      width: 7.5rem;
      height: 3.125rem;
      position: relative;
      top: .1875rem;
    }
  }

  .left {
    .item1 {
      color: #8a8a8a;
      font-size: .875rem;
      cursor: pointer;
      margin-right: 12.5rem;

      img {
        width: 1.25rem;
        height: 1.25rem;
        position: relative;
        top: .25rem;
        margin-right: .625rem;
      }
    }

    .item1:hover {
      color: rgba(35, 145, 255, 0.675);
    }
  }
}

.section {
  background-color: #fff;
  box-sizing: border-box;
  padding: 17px 50px;
  border-radius: 3px;
  margin-top: 20px;
}

.section1 {
  .title {
    display: flex;
    justify-content: space-between;

    .left {
      font-weight: 550;
      font-size: 15px;
    }

    .right {
      font-size: 13px;
      cursor: pointer;
      color: rgb(8, 109, 225);
    }
  }

  .num {
    display: flex;
    align-items: flex-end;
    margin: 9px 0;

    .money {
      color: #ff2323;

      span {
        font-size: 30px;
      }
    }

    .desc {
      font-size: 14px;
      margin-left: 12px;
      color: #8a8a8a;
    }
  }

  .info {
    display: flex;
    font-size: 14px;

    .li {
      margin-right: 20px;

      span {
        color: #8a8a8a;
      }
    }
  }
}

.section2 {
  .paylogo {
    img {
      width: 90px;
      height: 30px;
    }
  }

  .code-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tip {
      text-align: center;
      margin-bottom: 15px;

      .text {
        color: #8a8a8a;
        font-size: 12px;
      }

      .time {
        /deep/.van-count-down {
          font-size: 18px;
          color: red;
          margin-top: 10px;
        }
      }
    }

    .bottom {
      border: 1px solid silver;

      .zfb-code_info {
        padding-bottom: 6px;

        .img-wrap {
          width: 178px;
          height: 173px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 355px;
            height: 403px;
            position: relative;
            top: -13px;
          }
        }

        .contxt {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            position: relative;
            top: 2px;
          }

          .right {
            font-size: 12px;
          }
        }
      }

    }
  }

  .back {
    cursor: pointer;
    margin-top: 70px;
    font-size: 13px;

    .pay {
      color: #2266aa;
    }

    .nopay:hover {
      color: #2266aa;
    }

  }
}
</style>
