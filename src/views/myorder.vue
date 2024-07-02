<template>
  <div class="main">
    <PageHeader></PageHeader>
    <div class="container">

      <div class="title2">我的订单</div>

      <div class="keyWrap">
        <div class="items-wrap">
          <div class="table-wrap">
            <div class="li header">
              <div class="td" style="width: 40px;">序号</div>
              <div class="td" style="width: 100px;">订单号</div>
              <div class="td" style="width: 220px;">Key</div>
              <div class="td" style="width: 100px;">视频加速次数</div>
              <div class="td" style="width: 100px;">实付金额/元</div>
              <div class="td" style="width: 100px;">剩余加速次数</div>
              <div class="td" style="width: 120px;">适用平台</div>
              <div class="td" style="width: 170px;">订单时间</div>
              <div class="td" style="width: 190px;" v-if="isShowSpecialTd">其它</div>
            </div>
            <div class="noData" v-show="!orderList.length">
              您还没订单
            </div>
            <div class="li" v-for="(item, index) in orderList" :key="index" v-if="orderList.length && canShow(item)">
              <div class="td" style="width: 40px;">{{ index + 1 }}</div>
              <div class="td" style="width: 100px;">{{ item.orderid }}</div>
              <div class="td" style="width: 220px;"
                :style="{ 'font-weight': item.toolkey ? 550 : 400, 'color': item.toolkey ? '#006eff' : '#606266' }">

                <span v-if="item.status == 2">
                  <span v-if="item.canuse == -1">分站开通成功</span>
                  <span v-else>{{ item.toolkey == '-' ? '审核通过' : item.toolkey }}</span>
                </span>

                <span v-if="item.status == 1">{{ '审核中' }}</span>

                <span v-if="item.status == 2 && item.canuse != -1 && item.toolkey != '-'" class="copy"
                  @click="setClipdata(item.toolkey)">复制</span>
              </div>


              <div class="td" style="width: 100px;">{{ item.count }}</div>
              <div class="td" style="width: 100px;">{{ item.balance == 0 ? '-' : item.price }}</div>
              <div class="td" style="width: 100px;">{{ item.status == 1 ? '-' : item.balance }}</div>
              <div class="td special" style="width: 120px;">{{ transCanuse(item.canuse) }}</div>
              <div class="td" style="width: 170px;">{{ transformT(item.createtime) }}</div>
              <div class="td specail2" style="width: 190px;" v-if="isShowSpecialTd">
                <div v-show="item.canShowOtherTd"><a
                    href="https://k16kfjgxwbn.feishu.cn/share/base/form/shrcneg70W5wHYaNEfbBUBk9vGh"
                    target="_blank">申请退款</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                    href="https://k16kfjgxwbn.feishu.cn/share/base/query/shrcnR7a78MRJtujQ4BvQ2aETjg"
                    target="_blank">退款查询</a></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="payTip" v-if="orderList.length">订单为系统自动审核，最慢5-10分钟审核完成后刷新一下页面</div>

      <!--      <div class="section2">-->
      <!--        <div class="text1 title2">投诉建议 客服服务态度差，等其它问题</div>-->
      <!--        <div class="img-wrap">-->
      <!--          <img src="http://47.115.205.88:7005/public/image/ctx/tousuwx.jpg" alt="">-->
      <!--        </div>-->
      <!--      </div>-->
    </div>



    <div class="kefu-wrap">
      <Kefu></Kefu>
    </div>
  </div>
</template>

<script>
import Kefu from "../components/kefu.vue";
import { Toast } from 'vant';
import { handleGetCtxlist } from '@/utils/api/home'
import {
  handleGetOrder, handleGetOrderConfig
} from '@/utils/api/order'
export default {
  name: 'myorder',
  data() {
    return {
      orderList: [],
      token: '',
      userinfo: '',
      Internetcourse: [],
      isShowSpecialTd: false,
      // 展示7天退款
      isShowAfterSalesService: false
    }
  },
  components: {
    Kefu
  },
  computed: {
    transCanuse() {
      return function (id) {
        let result = ''
        if (id == '2037') {
          result = '全平台'
          return result
        }
        if (id == '-1') {
          result = '开通分站'
          return result
        }

        for (var k in this.Internetcourse) {
          if (this.Internetcourse[k].id == id) {
            result = this.Internetcourse[k].name
            return result
          }
        }
      }
    },
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
    getDiscontMoney() {
      return function () {
        let m1 = this.currentObj.originalprice
        let m2 = this.currentObj.price
        let result = m1 ? (m1 - m2).toFixed(1) : ''
        return result
      }
    },
    getcountdown() {
      return function (date) {
        let date2 = new Date(date)
        let date1 = new Date()
        var s = Math.round(date2 - date1);
        let result = s
        return result
      }
    },
    canShow() {
      return function (item) {
        let result = true;
        let today = new Date().getTime();
        let orderT = new Date(item.createtime).getTime();
        if (((today - orderT) / 1000 / 60 / 60 / 24) > 7 && item.canuse == 2) {
          result = false
        }
        if (((today - orderT) / 1000 / 60 / 60 / 24) > 7 && item.status != 2) {
          result = false
        }
        if (parseInt(item.balance) < 1) {
          result = false
        }
        return result
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem('tooltoken')
    if (this.token) {
      this.getCtxlist()
      this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
    }
  },
  methods: {
    getCtxlist() {
      handleGetCtxlist().then(async res => {
        if (res.code == 200) {
          this.Internetcourse = res.result
        }

        let result = await handleGetOrderConfig(1)
        this.isShowAfterSalesService = result.data;
        this.getOrder()
      })
    },
    getOrder() {
      handleGetOrder().then(res => {
        if (res.code == 200) {
          let today = new Date().getTime();
          this.orderList = res.data

          if (this.isShowAfterSalesService) {
            this.orderList = this.orderList.map(item => {
              let obj = Object.assign({}, item);
              let orderT = new Date(item.createtime).getTime();
              if (((today - orderT) / 1000 / 60 / 60 / 24) < 7 && item.status == 2 && item.balance > (item.count - 11)) {
                obj.canShowOtherTd = true
                this.isShowSpecialTd = true
              }
              return obj
            })
          }
        }
        if (res.code == 403) {
          Toast.fail('登录已过期，请点击立即购买重新登录')
          localStorage.removeItem('tooltoken')
        }
      })
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
  width: 100%;
  height: 100vh;
  background-color: #fbfbfb;
}

.container {
  width: 1200px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 200px;
  margin-top: 30px;
  padding-top: 10px;
}

.title2 {
  font-weight: 550;
  margin-top: 0px;
  padding-left: 6px;
  border-left: 4px solid orange;

  span {
    font-size: 13px;
    font-weight: normal;
  }
}

.keyWrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #006eff;
  font-weight: 550;

  .copy {
    border: 1px solid rgba(0, 0, 0, .7);
    font-weight: 500;
    font-size: 14px;
    padding: 2px 5px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 7px;
  }

  .copy:hover {
    background-color: #006eff;
    color: #fff;
  }



  .items-wrap {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    background-color: #fff;
    font-size: 14px;
    color: #606266;
    padding: 24px;
    width: 1200px;
    box-shadow: 0 0 9px rgba(0, 0, 0, .1);

    .table-wrap {
      border: 1px solid #ebebeb;

      .li.header {
        background-color: #f5f7fa;
        height: 40px;
      }

      .li {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 35px;
        border-bottom: 1px solid #ebebeb;

        .td {
          text-align: center;
        }

        .td.special {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 13px;
        }

        .td.specail2 {
          a {
            color: #006eff;
            font-weight: 550;
          }
        }
      }
    }

  }
}

.kefu {
  margin-top: 10px;

  .kefu-li {
    font-size: 15px;
    margin-top: 5px;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }

    span {
      color: #1d1818;
    }
  }
}

.noData {
  margin-top: 10px;
  text-align: center;
  line-height: 40px;
}

.payTip {
  color: #000;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 14px;
  box-sizing: border-box;
  border-left: 4px solid rgb(255, 55, 0);
  background-color: #ff00001e;
  padding: 8px;
  border-radius: 5px;
}

.kefu-wrap {
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 999;
}

.section2 {
  .text1 {
    margin-bottom: 7px;
  }

  .img-wrap {
    border: 1px solid #a7a3a3;
    border-radius: 4px;
    width: 150px;
    box-shadow: 0 0 3px rgba(0, 0, 0, .1);

    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
