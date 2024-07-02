<template>
  <div class="main">
    <PageHeader></PageHeader>
    <div class="box">
      <div class="box_left">
        <ul class="left_ul">
          <h1 v-for="(item, index) in ctxlist" :key="index" :class="currentCtxId == item.id ? 'active' : ''"
            @click="changeCtx(item)" :title="item.name">
            <span
              v-if="[14, 16, 19, 21, 35, 39, 44, 45, 50, 51, 57, 62, 68, 69, 83, 91, 92, 93, 94, 104].includes(item.id)">🔥</span>{{
                item.name }}
          </h1>
          <h1 @click="isShow = true"><span>🔥</span>其他平台需求，个人有偿专属定制</h1>
        </ul>
      </div>

      <div class="box_right" v-if="isPublish">
        <div class="text_top">
          <div class="text_top_right">
            <span>
              <a href="">更新日期</a>
            </span>
            <span>🗓️{{ transformT(ctxData.midification) }}</span>
          </div>
        </div>
        <div class="text_box">
          <div class="text_box-1">
            <span class="text_box-1-h3">{{ ctxData.name }}</span>
            <span class="text_box-1-a" @click="scrollpage">点击获取Key</span>
          </div>
          <div class="tags-wrap">
            <div class="item" v-for="(item, index) in ctxData.tags" :key="index">
              {{ item }}</div>
          </div>
        </div>

        <div class="text_box4">
          <div>
            <h2>首次使用？</h2>
          </div>
          <div>第一次使用网站脚本，请点击这个👉<span style="color:blue;cursor: pointer;" @click="target">视频教程</span>👈查看详细使用教程</div>
          <div>
            <h4>现有功能如有不满足的，均可联系客服定制开发升级</h4>
          </div>
        </div>
        <div class="text_box5">
          <div>
            <h2>功能</h2>
          </div>
          <div class="text_box5_2">
            <ul>
              <li>人机检测，无人值守</li>
              <li>自动切换自动续播</li>
              <li>自选倍速</li>
              <li>自动阅读文档</li>
            </ul>
          </div>
        </div>

        <div class="text_box6">
          <div class="text_box6-1">
            <h2>使用说明</h2>
          </div>
          <div class="text_box6-2">
            <h3>脚本启动</h3>
          </div>
          <div class="step">
            <div class="step-title"><span>步骤0</span>：安装油猴（如已安装可跳过）</div>
            <div class="title3 bold">
              <img class="icon" src="@/assets/icon1.png" alt="">
              <img class="icon" src="@/assets/icon1.png" alt="">
              <a style="color: blue;" href="https://microsoftedge.microsoft.com/addons/search/tampermonkey?hl=zh-CN"
                target="_blank">Edge浏览器 点击此处安装</a>👈👈👈👈👈👈，
              <br />
              <img class="icon" src="@/assets/icon1.png" alt="">
              <img class="icon" src="@/assets/icon1.png" alt="">
              <a style="color: blue;"
                href="https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search"
                target="_blank">如果您使用的是 火狐浏览器 点击此处安装</a>👈👈👈👈👈👈，
              其他浏览器咨询客服或搜索tampermonkey插件自行安装
            </div>
            <div class="img-wrap">
              <van-image :src="`${imgbaseUrl}/youhou1.png`" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="100" />
                </template>
              </van-image>
            </div>
          </div>
          <div class="step">
            <div class="step-title"><span>步骤1</span>：安装加速脚本</div>
            <div class="title3 bold">
              <img class="icon" src="@/assets/icon1.png" alt="">
              <img class="icon" src="@/assets/icon1.png" alt="">
              <a style="color: blue;" :href="ctxData.downUrl" target="_blank">点击此处直达安装</a>👈👈👈👈👈👈
            </div>
            <div class="img-wrap">
              <van-image src="http://123.249.118.15:7005/public/image/1710989384200ctxshili.jpg" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="100" />
                </template>
              </van-image>
            </div>
          </div>
          <div class="step">
            <div class="step-title"><span>步骤2</span>：绑定Key 刷新页面稍等5秒</div>
            <div class="step-title2">点击绑定后，等待3-5秒钟之后</div>
            <div class="img-wrap" v-for="(url, index) in ctxData.images" :key="index">
              <!-- <img :alt="ctxData.name" v-lazy="url"> -->
              <van-image :src="url" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="100" />
                </template>
              </van-image>
            </div>
          </div>
        </div>

        <div class="title2" id="mailto1">选择最适合您的计划</div>
        <div class="section2">
          <div class="li" v-if="item.status != '2'"
            :class="{ 'active': currentIndex == index, 'disable': item.status == '0' }" v-for="(item, index) in obj"
            :key="index" @click="selected(index)">
            <div class="tip" v-if="item.ishot == 2">Hot</div>
            <div class="tip" v-if="item.discount">{{ item.discount }}</div>
            <div class="tip" v-if="item.countdown && getcountdown(item.countdown) > 0"><van-count-down
                :time="getcountdown(item.countdown)" millisecond format="HH:mm:ss:SS" /></div>
            <div class="text1">{{ item.text1 }}</div>
            <div class="price-wrap">
              <!-- <div class="left">￥{{ item.originalprice ? item.originalprice : item.price }}</div>
              <div class="right" v-if="item.originalprice"><span>优惠后￥</span><span class="num">{{ item.price }}</span>
              </div> -->
              <div class="left">￥<span class="num">{{ item.price }}</span></div>
              <div class="right" v-if="item.originalprice">原价<span>￥{{ item.originalprice ? item.originalprice :
                item.price }}</span>
              </div>
            </div>
            <div class="text2">{{ item.text2 }}</div>
          </div>
        </div>

        <div class="title2">购买权益 <span>（8大特权）</span></div>
        <div class="section3">
          <div class="li">
            <img src="@/assets/kefu.png" alt="">
            <div class="text">专属客服</div>
          </div>
          <div class="li">
            <img src="@/assets/commonshare.png" alt="">
            <div class="text">多账号使用</div>
          </div>
          <div class="li">
            <img src="@/assets/xubo.png" alt="">
            <div class="text">自动连播</div>
          </div>
          <div class="li">
            <img src="@/assets/kuaijin.png" alt="">
            <div class="text">×5倍速</div>
          </div>
          <div class="li">
            <img src="@/assets/kuaijin.png" alt="">
            <div class="text">×10倍速</div>
          </div>
          <div class="li">
            <img src="@/assets/kuaijin.png" alt="">
            <div class="text">×16倍速</div>
          </div>
          <div class="li">
            <img src="@/assets/wangke.png" alt="">
            <div class="text">不限账号</div>
          </div>
          <div class="li">
            <img src="@/assets/icon8.png" alt="">
            <div class="text">不限时间</div>
          </div>
        </div>

        <div class="section4">
          <div class="left title2">服务保障</div>
          <div class="right"><img src="@/assets/7day.png"> 可享7天无忧退款服务 <van-icon style="cursor: pointer;" name="info"
              @click="showTip" /></div>
        </div>

        <div class="btnpay" @click="showPopup">
          立即购买
          <span v-if="getDiscontMoney()">已优惠 ￥{{ getDiscontMoney() }}元</span>
        </div>

        <Transition>
          <div class="webtip webtip1" v-show="!!ctxData.notice">
            <div class="title">
              <svg t="1717670039119" class="icon" viewBox="0 0 1244 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="15616" width="200" height="200">
                <path
                  d="M1159.859427 864.249095L668.29676 39.28405c-31.500974-52.720096-110.232928-52.720096-141.078485 0L35.000191 864.249095c-31.500974 52.76106 7.865003 118.835275 70.866951 118.835275h983.125334c63.001948-0.655417 102.367925-66.074215 70.866951-118.835275zM560.030083 341.799908c0-20.317924 17.040839-36.211783 37.399726-36.211784 21.014304 0 37.399726 16.508313 37.399726 36.211784v369.900906c0 20.358887-17.040839 36.252747-37.399726 36.252747a36.826236 36.826236 0 0 1-37.399726-36.252747v-369.900906zM597.429809 863.593678c-21.014304 0-38.71056-16.508313-38.71056-37.481653 0-20.358887 17.040839-37.522617 38.71056-37.522617 21.014304 0 38.71056 16.549276 38.71056 37.522617s-17.696256 37.481653-38.71056 37.481653z"
                  fill="#d81e06" p-id="15617"></path>
              </svg>
              <svg t="1717670039119" class="icon" viewBox="0 0 1244 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="15616" width="200" height="200">
                <path
                  d="M1159.859427 864.249095L668.29676 39.28405c-31.500974-52.720096-110.232928-52.720096-141.078485 0L35.000191 864.249095c-31.500974 52.76106 7.865003 118.835275 70.866951 118.835275h983.125334c63.001948-0.655417 102.367925-66.074215 70.866951-118.835275zM560.030083 341.799908c0-20.317924 17.040839-36.211783 37.399726-36.211784 21.014304 0 37.399726 16.508313 37.399726 36.211784v369.900906c0 20.358887-17.040839 36.252747-37.399726 36.252747a36.826236 36.826236 0 0 1-37.399726-36.252747v-369.900906zM597.429809 863.593678c-21.014304 0-38.71056-16.508313-38.71056-37.481653 0-20.358887 17.040839-37.522617 38.71056-37.522617 21.014304 0 38.71056 16.549276 38.71056 37.522617s-17.696256 37.481653-38.71056 37.481653z"
                  fill="#d81e06" p-id="15617"></path>
              </svg>
              <svg t="1717670039119" class="icon" viewBox="0 0 1244 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="15616" width="200" height="200">
                <path
                  d="M1159.859427 864.249095L668.29676 39.28405c-31.500974-52.720096-110.232928-52.720096-141.078485 0L35.000191 864.249095c-31.500974 52.76106 7.865003 118.835275 70.866951 118.835275h983.125334c63.001948-0.655417 102.367925-66.074215 70.866951-118.835275zM560.030083 341.799908c0-20.317924 17.040839-36.211783 37.399726-36.211784 21.014304 0 37.399726 16.508313 37.399726 36.211784v369.900906c0 20.358887-17.040839 36.252747-37.399726 36.252747a36.826236 36.826236 0 0 1-37.399726-36.252747v-369.900906zM597.429809 863.593678c-21.014304 0-38.71056-16.508313-38.71056-37.481653 0-20.358887 17.040839-37.522617 38.71056-37.522617 21.014304 0 38.71056 16.549276 38.71056 37.522617s-17.696256 37.481653-38.71056 37.481653z"
                  fill="#d81e06" p-id="15617"></path>
              </svg>
            </div>
            <div class="li">
              1、{{ ctxData.notice }}
            </div>
          </div>
        </Transition>

        <div class="webtip">
          <div class="title">🎗️提示：</div>
          <div class="li">
            1、光影教育坚持规范运营用户第一原则，7天内使用不满意可随时联系客服退款 (且使用次数小于10次)
          </div>
          <div class="li">
            2、现有功能如有不满足的，均可联系客服定制开发升级
          </div>
        </div>

      </div>
      <div class="box_right" v-if="!isPublish">
        <h1 style="height: 75vh;text-align:center;width: 100%;margin-top: 100px">此平台已下架</h1>
      </div>

    </div>

    <Kefu></Kefu>

    <Footer></Footer>


    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper">
        <div class="content">
          <div class="title">
            微信账号
          </div>
          <div class="desc">
            由于微信联系较多，添加时<b style="font-size: 16px;">（备注 我要定制）</b>
          </div>
          <div class="img-wrap">
            <img src="http://47.115.205.88:7005/public/image/ctx/schoolimg/tousuwx.jpg" alt="">
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { handleGetOrder } from '@/utils/api/order'
import { Toast, Dialog } from 'vant';
import Kefu from "../components/kefu.vue";
import { handleGetProduct } from '@/utils/api/product'
import { saveUserIp, handleGetCtxlist, handleGetCtx } from '@/utils/api/home'
export default {
  name: 'test',
  data() {
    return {
      imgbaseUrl: 'http://47.115.205.88:7005/public/image/ctx/',
      currentCtxId: 7,
      ctxData: {},
      currentIndex: 0,
      ctxlist: [],
      currentObj: {},
      obj: [],
      isShow: false,
      isPublish: true,
    }
  },
  components: {
    Kefu
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
        return `${Y}/${M}/${D}`;
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
    }
  },
  mounted() {
    //     Dialog.alert({
    //       message: `
    //       <h2>🌳五一放假通知</h2>
    // 尊敬的各位用户：

    // 为庆祝即将到来的五一，我们公司决定放假安排如下：

    // 放假时间：<b>【2024年5月1日】</b> 至 <b>【2024年5月5日】</b>
    // 2024年5月6日起正常上班
    // 在此期间，网站人工服务暂时停止，其它服务正常运行不受影响。感谢大家的支持，同舟共济、砥砺前行。

    // 祝大家工作顺利！

    // [光影教育] 敬上`,
    //       theme: 'round-button',
    //       width: '520px',
    //       messageAlign: 'left',
    //       allowHtml: true,
    //     }).then(() => {
    //       // on close
    //     });
    this.$bus.$on('showPoupe1', () => {
      this.isShow = true
    })

    let parentid = this.$route.query.parentid;
    if (parentid) {
      localStorage.setItem('parentid', parentid)
    }
    if (this.$route.query.ctxid) {
      localStorage.setItem('ctxid', this.$route.query.ctxid)
    }
    console.log('ctxid===>>', this.$route.query.ctxid);
    this.getCtxlist()
    saveUserIp()
  },
  methods: {
    getCtxlist() {
      handleGetCtxlist().then(res => {
        if (res.code == 200) {
          this.ctxlist = res.result
          this.currentCtxId = this.$route.query.ctxid ? this.$route.query.ctxid : res.result[0]['id']
          this.getCtx(this.currentCtxId)
        }
      })
    },
    selected(index) {
      if (!this.obj.length) return;
      if (this.obj[index].status == '0') {
        Toast('当前套餐已售罄')
        return;
      }
      this.currentIndex = index
      this.currentObj = this.obj[index]
    },
    getCtx(id) {
      handleGetCtx(id).then(res => {
        if (res.code == 200) {
          console.log('res==>>', res);
          this.ctxData = res.result[0]
          this.ctxData.images = res.result[0].images.split(',')
          this.ctxData.tags = res.result[0].tags ? res.result[0].tags.split(',') : []
          this.isPublish = this.ctxData.status == '0' ? false : true;
          let parentid = localStorage.getItem('parentid')
          this.getProduct({
            id: this.ctxData.id,
            parentid: parentid ? parentid : ''
          })
        } else {
          Toast('加载失败，请联系客服')
        }
      })
    },
    changeCtx(item) {
      if (item.id == this.currentCtxId) return;
      this.currentCtxId = item.id;
      localStorage.setItem('ctxid', this.currentCtxId)
      this.currentIndex = 0;

      this.$router.push({
        path: '/',
        query: {
          ctxid: item.id
        }
      })
      this.getCtx(item.id)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async showPopup() {
      if (this.currentObj.price == 0) {
        this.$router.push({
          name: "ad2",
          params: this.currentObj
        })
        return
      }


      let tooltoken = localStorage.getItem('tooltoken')
      if (!tooltoken) {
        this.$router.replace({
          name: 'login',
          params: this.currentObj
        })
        return
      }

      this.currentObj.canuse = this.ctxData.id;
      let parentid = localStorage.getItem('parentid')
      this.currentObj.parentid = '';
      this.currentObj.type = '0';

      console.log(11111111111)

      // 如果是代理旗下网站，查看用户是否为新用户
      if (parentid) {
        handleGetOrder().then(res => {
          if (!res.data.length) {
            this.currentObj.parentid = parentid ? parentid : '';
            this.currentObj.type = !!parentid ? '1' : '0';
          }

          if (this.currentObj.ctxs_id == 2) {
            Dialog.confirm({
              title: '提示',
              message: `您的网课平台是👉👉👉【${this.currentObj.name}】吗，如果不是，左侧可以滑动更换`,
            })
              .then(() => {
                this.$router.push({
                  name: "pay",
                  params: this.currentObj
                })
              })
              .catch(() => {
                // on cancel
              });
          } else {
            this.$router.push({
              name: "pay",
              params: this.currentObj
            })
          }
        })
      } else {
        this.$router.push({
          name: "pay",
          params: this.currentObj
        })
      }
    },
    showTip() {
      Toast('如果使用不满意可随时联系客服退款 (使用次数小于10次)');
    },
    onSubmit(values) {
      console.log('submit', values);
      this.show = false
      this.popupshow2 = true
    },

    target() {
      this.$router.push('/video')
    },
    getProduct(option) {
      handleGetProduct(option).then(res => {
        // console.log('res====>>', res);
        this.obj = res.data
        res.data.forEach((item, index) => {
          if (item.isDefault == '1') {
            this.currentIndex = index
          }
        });
        this.obj.sort((a, b) => a.order - b.order)
        this.selected(this.currentIndex)
      })
    },
    scrollpage() {
      let h = document.querySelector('#mailto1').offsetTop;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    },
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  position: relative;
  background-color: #f3f2f5;
}

.PageHeader {
  z-index: 999;
}

.bold {
  font-weight: 550;
}




.box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
  padding-bottom: 100px;

  a {
    text-decoration: none;
    color: #000;
  }

  .box_left::-webkit-scrollbar {
    width: 3px;
    background-color: #fff;
  }

  .box_left::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: #c4c3b7;
  }

  .box_left:hover::-webkit-scrollbar {
    display: block;
  }

  .box_left {
    width: 20%;
    max-width: 300px;
    background-color: #fff;
    // background-color: red;
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 1;
    height: calc(100vh-60px);
    box-sizing: border-box;
    height: 80vh;
    overflow: scroll;
    overflow-x: hidden;


    ul {
      width: 100%;

      h1 {
        width: 100%;
        display: flex;
        padding: 13px 0;
        align-items: center;
        font-size: 15.6px;
        font-weight: 700;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        cursor: pointer;
        transition: all 0.5s;
        padding-left: 20px;
        box-sizing: border-box;
      }

      .active {
        color: #fff;
        background-color: #157bae;
      }

      li:hover {
        border-left: 5px solid #157bae;
      }
    }
  }

  .box_right {
    width: 66%;
    position: relative;
    left: 50px;
    background-color: #157bae;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    padding-bottom: 50px;

    .title3 {
      .icon {
        height: 19px;
        width: 19px;
        position: relative;
        top: 3px;
      }
    }

    .img-wrap {
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      background-color: #f7f0f0;
      margin-top: 10px;
      border-radius: 6px;

      img {
        width: 100%;
      }
    }

    .text_top {
      width: 100%;
      overflow: hidden;

      .text_top_right {
        float: right;
      }
    }

    .text_box {
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #bbb;
      padding-bottom: 10px;

      .text_box-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text_box-1-h3 {
          font-size: 25px;
          float: left;
          margin: 2vh 2vh 2vh 0vh;
          font-weight: 700;
        }

        .text_box-1-a {
          background: #ff4757;
          color: #fff;
          padding: 5px 12px;
          cursor: pointer;

          a {
            color: #fff;
          }

        }
      }

      .tags-wrap {
        display: flex;
        flex-wrap: wrap;

        .item {
          padding: 2px 10px;
          background-color: #27a8e8;
          margin-right: 5px;
          color: #f4f4f4;
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
    }

    @bordebottom: 1px solid #bbb;

    .text_box4 {
      width: 100%;
      border-bottom: 1px solid #bbb;

      div {
        margin: 10px 0px;

        a {
          color: blue;
        }
      }
    }

    .text_box5 {
      width: 100%;
      border-bottom: 1px solid #bbb;

      .text_box5_2 {
        ul {
          li {
            margin: 2vh;
            list-style: disc;
          }
        }
      }
    }

    .text_box6 {
      margin-bottom: 30px;
    }

    .ad {
      border-bottom: @bordebottom;
      cursor: pointer;
      padding-bottom: 30px;
      display: flex;

      img {
        width: 100%;
        height: 184px;

      }

      video {
        width: 50%;
        height: 184px;
        margin: 0px 10px;
      }
    }
  }
}

.step {
  .step-title {
    font-weight: 550;
    margin-top: 15px;

    span {
      color: red;
    }
  }
}

.title2 {
  font-weight: 550;
  margin-top: 15px;
  padding-left: 6px;
  border-left: 4px solid orange;

  span {
    font-size: 13px;
    font-weight: normal;
  }
}

.section2 {
  width: 100%;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 215px);
  grid-gap: 20px;

  .li {
    background: #fff3f3;
    padding: 8px 15px;
    border-radius: 9px;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid transparent;
    box-shadow: 0 0 1px rgba(0, 0, 0, .4);
    position: relative;

    .tip {
      position: absolute;
      background: #ff201a;
      color: #ffffff;
      font-size: 12px;
      padding: 1px 5px;
      border-bottom-left-radius: 4px;
      border-top-right-radius: 4px;
      right: -1px;
      top: -8px;

      .van-count-down {
        color: #ffffff;
        font-size: 12px;
        line-height: 16px;
      }
    }

    .text1 {
      text-align: center;
      font-size: 15px;
      font-weight: 550;
      font-family: '微软雅黑';
    }

    .price-wrap {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-top: 5px;

      .left,
      .right {
        font-family: -apple-system, "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "Microsoft JhengHei", SimSun, sans-serif;
      }

      .left {
        margin-top: 0 !important;
        font-weight: 550;
        color: #c7000b;
        font-size: 14px;

        span {
          font-size: 21px;
        }
      }

      .right {
        font-weight: 400;
        position: relative;
        margin-left: 10px;
        font-size: 12px;
        color: #595959;
        box-sizing: border-box;
        padding: 2px 3px;
        border-radius: 3px;
        transition: all 0.3s;
      }
    }

    .text2 {
      text-align: center;
      font-size: 12px;
      margin-top: 3px;
      color: #6c757d;
    }
  }

  .active {
    border: 1px solid #ff201a
  }

  .disable {
    background-color: #f4f4f4;

    .price-wrap {
      .left {
        color: #595959;
        font-size: 19px;
        font-weight: 550;

        .num {
          font-size: 22px;
        }
      }
    }
  }
}

.section3 {
  display: flex;
  margin-top: 10px;
  margin-bottom: 30px;

  .li {
    text-align: center;
    margin-right: 12px;

    img {
      width: 25px;
      height: 25px;
    }

    .text {
      font-size: 12px;
      color: #6c757d;
    }
  }
}

.section4 {
  width: 350px;
  display: flex;
  justify-content: space-between;

  .left {
    font-weight: 550;
    color: #2c3e50;
    margin-top: 0;
  }

  .right {
    font-size: 13px;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }
}

.btnpay {
  font-size: 13px;
  padding: 11px 15px;
  width: 180px;
  text-align: center;
  border-radius: 18px;
  color: #1e1f22;
  background: orange;
  cursor: pointer;
  font-family: "微软雅黑";
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;

  span {
    position: absolute;
    right: 0;
    top: -9px;
    z-index: 10;
    background: #ff201a;
    font-size: 12px;
    padding: 1px 5px;
    border-radius: 3px;
    color: #eceefb;
  }
}

.webtip {
  margin-top: 20px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #0099ff0e;
  border-left: 4px solid skyblue;
  padding: 8px;
  border-radius: 5px;

  .title {
    font-weight: 550;
  }

  .li {
    line-height: 25px;
  }
}

.webtip1 {
  border-left: 4px solid rgb(255, 55, 0);
  background-color: #ff00001e;

  svg {
    width: 20px;
    height: 20px;
    position: relative;
    top: 3px;
    margin-right: 8px;
    animation: scaleAmimate 1s infinite ease-in-out;
  }

  @keyframes scaleAmimate {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }

  }
}



.kefu-wrap {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999;
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
}
</style>
