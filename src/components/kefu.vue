<template>
  <div class="main">
    <div class="kefu" v-if="!isShow" @click="isShow = !isShow">
      <div class="left"><img src="../assets/kefu2.png" alt="" />联系客服</div>
    </div>

    <div class="container" v-if="isShow">
      <div class="header">
        <span>在线咨询</span>
        <div class="right">
          <span @click="closeHandle">-</span>
          <span @click="closeHandle">×</span>
        </div>
      </div>
      <div class="chat-wrap" ref="chatwrap">
        <div class="items" :class="{ send: item.user.phone != 'sys' }" v-for="(item, index) in listData" :key="index">
          <div class="item-left">
            <img :src="item.user.avatar
                ? item.user.avatar
                : require('../assets/logo_mini.jpg')
              " alt="" />
          </div>
          <div class="content" v-if="item.type == '1'" v-html="item.content"></div>
          <div class="content" v-if="item.type == '2'">
            <img :src="item.content" alt="" />
          </div>
        </div>
      </div>
      <div class="input">
        <textarea v-model="value" @keyup.enter="send('private', '1')"></textarea>
        <div class="sendBtn" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import stringSimilarity from "string-similarity";
export default {
  name: "kefu",
  props: {
    msg: String,
  },
  data() {
    return {
      isShow: false,
      value: "",
      wxAccount: "",
      nofindCount: 0,
      listData: [
        {
          type: "1",
          content: "你好，请问有什么可以帮助到您的吗？",
          user: {
            phone: "sys",
          },
        },
      ],
      targetData: [
        {
          keyWords: ["你好，付款了没有KEY", "什么时候审核通过"],
          result: [
            {
              type: 1,
              content: "这个是系统自动审核的，你稍等5-10分钟刷新一下页面就行",
            },
          ],
        },
        {
          keyWords: ["是否可以后台播放"],
          result: [
            {
              type: 1,
              content: "支持后台播放，但是不建议长时间，现代浏览器会自动睡眠",
            },
          ],
        },
        {
          keyWords: ["你好 这个脚本支持学习xx平台吗"],
          result: [
            {
              type: 1,
              content:
                "你可以看一下官网上传的图片截图一样的就能用，如果没有请联系人工客服，定制开发",
            },
          ],
        },
        {
          keyWords: ["脚本没有作用", "4", "【4】"],
          result: [
            {
              type: 1,
              content: "请确认你使用了几个脚本，多个脚本会导致脚本冲突",
            },
            {
              type: 1,
              content: "请确认你使用的是油猴插件，且没有别的插件同时运行",
            },
            {
              type: 1,
              content: "请确认弹窗是否允许被跳出",
            },
            {
              type: 1,
              content:
                "启动时是否刷新过页面，等待跳出“初始化已完成”字样，如果没跳出那脚本就没有正确运行",
            },
          ],
        },
        {
          keyWords: ["人工客服", "0", "【0】", "2", "【2】", "3", "【3】"],
          result: [
            {
              type: 1,
              content: "人工在线时间，工作日【⏱️<b>10:30-17:30</b>】",
            },
            {
              type: 2,
              content: "http://123.249.118.15:7005/public/image/1718709515948guo-qywxmp_mini.jpg",
            },
            {
              type: 2,
              content: "http://123.249.118.15:7005/public/image/1718709515948guo-qywxmp_mini.jpg",
            },
            {
              type: 1,
              content: "若长时间未回复，请耐心等待一会，咨询人数较多，感谢理解☺️",
            },
            // {
            //   type: 1,
            //   content: '感谢您的支持，由于元旦放假暂时无法提供人工服务，请耐心等待，感谢理解❤'
            // },
            // {
            //   type: 1,
            //   content: '提示：官网顶部视频教程请认真观看'
            // },
          ],
        },
        {
          keyWords: ["教程"],
          result: [
            {
              type: 1,
              content:
                "请你进入脚本主页，脚本主页有功能介绍，也有教程视频你可以先观看一下，再决定是否购买",
            },
          ],
        },
        {
          keyWords: ["付款了没有订单", "付款了没有key"],
          result: [
            {
              type: 1,
              content:
                "您还选择刚才哪个套餐，进入付款页面，点击左下角的支付已完成，订单就出来了",
            },
          ],
        },
        {
          keyWords: ["此key不适用在该网课平台", "1", "【1】"],
          result: [
            {
              type: 1,
              content:
                '请您在脚本主页的右上角"我的订单"中查看你的购买平台，是否与使用平台是否一致',
            },
          ],
        },
      ],
    };
  },
  mounted() {
    // console.log("isWeekend()==", this.isWeekend());
    if (this.isWeekend()) {
      this.targetData.push({
        keyWords: ["退款", "申请退款"],
        result: [
          {
            type: 1,
            content:
              "退款查询：<a style='color: #0084e5;' target='_blank' href='https://k16kfjgxwbn.feishu.cn/share/base/query/shrcnR7a78MRJtujQ4BvQ2aETjg'>点击前往</a>",
          },
          {
            type: 1,
            content:
              "退款申请表：<a style='color: #0084e5;' target='_blank' href='https://k16kfjgxwbn.feishu.cn/share/base/form/shrcneg70W5wHYaNEfbBUBk9vGh'>点击前往</a>",
          },
        ],
      });
    }
  },
  methods: {
    isWeekend() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0代表周日，1代表周一，以此类推
      return dayOfWeek === 0 || dayOfWeek === 6;
    },
    async send() {
      let resultObj;
      let compareNum = 0;
      for (var i = 0; i <= this.targetData.length - 1; i++) {
        let item = this.targetData[i];

        for (var j = 0; j <= item.keyWords.length - 1; j++) {
          let content = item.keyWords[j];
          let _compareNum = stringSimilarity.compareTwoStrings(
            this.value,
            content
          );
          if (_compareNum > compareNum) {
            compareNum = _compareNum;
            resultObj = item;
          }
        }
      }

      console.log("compareNum=====>>>", compareNum);
      console.log("resultObj=====>>>", resultObj);
      this.listData.push({
        type: "1",
        content: this.value,
        user: {
          phone: "user",
          avatar: require("../assets/usercolor.png"),
        },
      });
      this.value = "";
      await this.sleep();
      if (this.nofindCount == 0) {
        this.nofindCount += 1;
      }
      this.reply(resultObj);
    },
    async reply(resultObj) {
      if (this.nofindCount >= 3 || !resultObj) {
        this.listData.push({
          type: 1,
          content:
            "回复：<br>【0】人工<br>【1】key不适合该平台<br>【2】定制开发<br>【3】支持学习xx平台吗<br>【4】脚本没有作用",
          user: {
            phone: "sys",
          },
        });
        return;
      }
      if (resultObj) {
        for (let item of resultObj.result) {
          this.listData.push({
            type: item.type,
            content: item.content,
            user: {
              phone: "sys",
            },
          });
          await this.sleep(500);
          let $chatWrap = this.$refs.chatwrap;
          $chatWrap.scrollTop = $chatWrap.scrollHeight;
        }
      }
    },
    sleep(s = 1000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, s);
      });
    },
    closeHandle() {
      this.isShow = false;
    },
  },
};
</script>


<style scoped lang="less">
.kefu {
  position: fixed;
  bottom: 100px;
  right: 30px;
  background-color: #0eb55f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  padding: 4px 9px;
  padding-bottom: 9px;
  color: #fff;
  cursor: pointer;
  z-index: 2;

  img {
    width: 22px;
    height: 22px;
    margin-right: 5px;
    position: relative;
    top: 6px;
  }
}

.container {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999;
  width: 430px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;

  .header {
    width: 100%;
    height: 46px;
    line-height: 46px;
    background-color: orange;
    box-sizing: border-box;
    padding-left: 20px;
    color: #030303;
    font-weight: 550;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      color: #fff;
      font-size: 20px;
      font-weight: 550;
      font-family: "宋体";

      span {
        margin-right: 20px;
        cursor: pointer;
      }

      span:first-child {
        font-size: 30px;
        position: relative;
        top: 4px;
      }
    }
  }

  .chat-wrap {
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
    font-size: 14px;

    .items {
      width: 100%;
      margin-bottom: 10px;
      overflow: hidden;
      zoom: 1;

      .item-left {
        margin-right: 5px;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        overflow: hidden;
        float: left;

        img {
          width: 40px;
          height: 40px;
        }
      }

      .content {
        float: left;
        color: #000;
        max-width: 65%;
        margin-bottom: 9px;
        padding: 9px;
        background-color: #eff1f7;
        border-radius: 0 0.5rem 0.5rem 0.5rem;

        img {
          width: 157px;
          height: 100%;
        }
      }
    }

    .send {
      .item-left {
        margin-right: 0px;
        margin-left: 5px;
        float: right;
      }

      .content {
        background-color: rgba(100, 147, 252, 0.16);
        border-radius: 0.5rem 0 0.5rem 0.5rem;
        float: right;
      }
    }
  }

  .input {
    width: 100%;
    box-sizing: border-box;
    // border: 1px solid #0f0;
    position: relative;
    border-top: 0.0625rem solid #ebeef5;

    textarea {
      width: 100%;
      height: 100px;
      border: 1px solid #520d0d;
      border: none;
      outline: none;
      padding: 0 10px;
      font-size: 18px;
      background: transparent;
      box-sizing: border-box;
      padding: 10px;
    }

    textarea::-webkit-scrollbar {
      display: none;
    }

    .sendBtn {
      padding: 3px 19px;
      background-color: orange;
      color: #fff;
      position: absolute;
      right: 20px;
      bottom: 9px;
      border-radius: 3px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
