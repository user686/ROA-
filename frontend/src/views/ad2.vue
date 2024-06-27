<template>
  <div class="main">
    <div class="container">
      <p class="title2 title1"><strong>PS: 最新更新时间: 2024年5月{{ new Date().getDate() }}日~</strong></p>
      <div class="post_hide_box">
        <div class="post_hide_box_content">
          <div>初次访问：反爬虫，激活码已被保护</div>
          <img src="../assets//ceshi/qrcode_for_gh_045eb6cd2644_344.jpg" alt="">
          <div class="tip">微信扫一扫，回复“<span>验证码</span>”，获取网页验证码</div>
        </div>
      </div>
      <p class="title2 title3"><strong>输入验证码，点击获取Key</strong></p>
      <div class="section2">
        <input type="text" placeholder="输入验证码" v-model="iptVal">
        <div class="btn" @click="handleCreateOrder">获取Key</div>
      </div>
      
      <div class="section3" v-if="keyCode">
        <p class="title2 title3"><strong>您的Key是：(24小时有效，过期请重新获取)</strong></p>
        <div class="keyCode">{{ keyCode }}</div>
        <br>
        <div class="tip2">当前购买适用平台：<span>{{ ctxname }}</span></div>
      </div>

    </div>
  </div>
</template>

<script>
import {createorderspecial} from '../utils/api/ad2.js'
export default {
  name: 'ad2',
  data() {
    return {
      iptVal: '',
      keyCode: '',
      status: 1,
      ctxname: '优学院'
    }
  },
  mounted() {
    console.log(this.$route.params);
    let specialKey = localStorage.getItem('specialKey')
    let ctxname = localStorage.getItem('ctxname')
    if(specialKey){
      this.keyCode = specialKey
      this.ctxname = ctxname
    }
  },
  methods: {
    handleCreateOrder(){
      if(this.status == 2) return; 
      if(this.iptVal !== '63230'){
        this.$message.error('验证码错误')
        return
      }
      
      this.status = 2;
      let preTime = localStorage.getItem('createKeyTime')
      if(preTime && new Date().getTime() - preTime < 1000 * 60 * 60 * 24){
        this.$message.error('一天只能获取一次')
        this.status = 1
        return
      }

      createorderspecial({
        "canuse": this.$route.params.ctxs_id || 2
      }).then(res=>{
        console.log(res)
        this.iptVal = ''
        localStorage.setItem('specialKey',res.orderid)
        localStorage.setItem('ctxname',this.$route.params.name)
        localStorage.setItem('createKeyTime', new Date().getTime())
        this.keyCode = res.orderid
        this.ctxname = this.$route.params.name
        this.status = 1
      })
    }
  }

}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  background: #f5f5f5;
  box-sizing: border-box;

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

.container {
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  min-height: 100vh;


  .post_hide_box_content {
    padding-top: 10px;
    color: #353535;
    font-weight: 300;
    text-align: center;

    img {
      margin: 10px 0;
      width: 200px;
    }
  }
  .tip{
    span{
      color: orange;
      font-weight: 550;
    }
  }
  .title3{
    margin-top: 20px;
  }
  .section2{
    display: flex;
    margin-top: 20px;
    input{
      outline: none;
      width: 150px;
      border: 1px solid #ccc;
      padding: 4px 15px;
      border-radius: 2px;
      margin-right: 10px;
    }
    .btn{
      width: 80px;
      height: 30px;
      line-height: 30px;
      background: orange;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
    }
  }
  .section3{
    .keyCode{
      margin-top: 20px;
      font-size: 18px;
      font-weight: 550;
      border-bottom: 2px dashed #000;
      display: inline-block;
    }
    .tip2{
      font-size: 15px;
      margin-top: 8px;
      color: #000;
      span {
        font-weight: 550;
      }
    }
  }
}
</style>
