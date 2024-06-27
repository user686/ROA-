<template>
  <div class="main">
    <PageHeader></PageHeader>

    <div class="container">
      <div class="content">
        <div class="section1">
          <div class="section-title">
            <div class="icon"></div> 服务介绍
          </div>
          <div class="desc">
            无需写代码，专业团队规范运营，自带售后部门，无需熟悉使用教程，开通后就可以拥有自己的网站去推广引流，当一个新副业！
          </div>
        </div>
        <div class="section2 section1">
          <div class="section-title">
            <div class="icon"></div> 功能特性
          </div>
          <div class="items-wrap">
            <div class="li" v-for="(item, index) in obj" :key="index">
              <div class="left">
                <img :src="item.imgurl" alt="">
              </div>
              <div class="right">
                <div class="name">{{ item.name }}</div>
                <div class="context">{{ item.text }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section3">
          <div class="paylogo">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/bsLuElJnYSyLnSOLjKth.png" alt="">
          </div>
          <div class="right">
            <div class="name" v-if="this.userInfo.isagency != '1'">支付金额 <span>￥5.00 <span
                  class="_spen">￥10.00</span></span></div>
            <!-- <div class="btn" @click="hanldBuy"> {{ this.userInfo.isagency == '1' ? '进入后台' : '立即开通' }} </div> -->
            <div class="btn" @click="hanldBuy"> 升级维护中 </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: 'agencydesc',
  data() {
    return {
      userInfo: {},
      obj: [
        {
          imgurl: require('@/assets/chazhao.png'),
          name: '大使推广收益',
          text: '一键分享自己专属长链'
        }, {
          imgurl: require('@/assets/daili.png'),
          name: '专业团队规范运营',
          text: '全程专人帮扶，科学专业运营，可完全放心开通入驻。'
        }, {
          imgurl: require('@/assets/xunzhang.png'),
          name: '自带售后客服',
          text: '无需自己管理，光影提供免费客服团队帮你全新处理售后问题'
        }, {
          imgurl: require('@/assets/zhuanti.png'),
          name: '沟通群',
          text: '开通代理后，可加入内部沟通群，实时了解最新学习动态。'
        },
      ]
    }
  },
  mounted() {
    if (localStorage.getItem('tooltoken')) {
      this.getUserInfo()
    }
  },
  methods: {
    showTip() {
      Toast.success('正在升级，敬请期待')
    },

    hanldBuy() {
      this.$router.push({
        name: 'useradmin'
      })

      // if (this.userInfo.isagency == '1') {
      //   this.$router.push({
      //     name: 'adminorder'
      //   })
      // } else {
      //   this.$router.push({
      //     name: "pay",
      //     params: {
      //       id: -1,
      //       text2: '分站开通',
      //       zfbimg: 'http://123.249.73.192:7003/image/ctx/zfb5.0.jpg',
      //       price: 5,
      //       count: 0,
      //       canuse: '-1',
      //       parentid: '',
      //       type: '3'
      //     }
      //   })
      // }
    },
  }

}
</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  width: 100%;
  height: 100%;
  background: #f5f7f9;

  .content {
    width: 1200px;
    margin: 0 auto;
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;

  .icon {
    margin-right: 5px;
    background: #007bff;
    border-radius: 3px;
    height: 14px;
    width: 3px;
  }
}

.section1 {
  background: #ffffff;
  margin-top: 9px;
  padding: 10px;
  padding-top: 22px;
  box-sizing: border-box;
  border-radius: 3px;

  .desc {
    color: #6c757d;
    font-size: 12px;
    height: 80px;
    line-height: 80px;
    border-top: 1px solid #f0f7fa;
    margin-top: 9px;
    margin-left: 8px;
  }
}

.section2 {
  .items-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    border-top: 1px solid #f0f7fa;
    margin-top: 9px;
    margin-left: 8px;
    padding-top: 24px;

    .li {
      //background: #f01414;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 20px 70px;

      .left {
        margin-right: 8px;

        img {
          width: 60px;
          height: 60px;
        }
      }

      .right {
        .name {
          margin-bottom: 9px;
          font-size: 15px;
          color: #333;
          font-size: 20px;
          line-height: 20px;
          font-weight: 400;
        }

        .context {
          font-size: 12px;
          color: #6c757d;
        }
      }

    }
  }
}

.section3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  margin-top: 9px;
  padding: 20px 30px 20px;
  box-sizing: border-box;
  border-radius: 3px;

  .paylogo {
    img {
      width: 90px;
      height: 30px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    font-size: 12px;

    span {
      color: #f01414;
      font-size: 18px;

      ._spen {
        color: #6c757d;
        text-decoration: line-through;
        font-size: 14px;
      }
    }

    .btn {
      margin-left: 10px;
      padding: 11px 32px;
      vertical-align: middle;
      background: #3D84FF !important;
      border-color: #3D84FF !important;
      color: #fff !important;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>
