<template>
  <div class="main">
    <PageHeader></PageHeader>
    <div class="container">
      <div class="box" v-for="(item,index) in ctxlist" :key="index" @click="target(item)"> 
        <div class="left">
          <van-image lazy-load :src="item.logo"
            alt=""/>
        </div>
        <div class="right">
          <p class="p1">{{ item.name }}</p>
          <p class="p4">{{ transformT(item.createtime )}}</p>
        </div>
      </div>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { handleGetCtxlist } from '@/utils/api/home'
export default {

  name: 'caregory',
  data() {
    return {
      ctxlist: []

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
    this.getCtxlist()
  },
  methods: {
    getCtxlist() {
      handleGetCtxlist().then(res => {
        if (res.code == 200) {
          this.ctxlist = res.result
        }
      })
    },
    target(item){
      this.$router.replace({
        name: 'home',
        query: { 'ctxid': item.id }
      })
    }

  }

}
</script>

<style scoped lang="less">

.main{
  background-color: #f3f2f5;
}
*{margin: 0;padding: 0;}
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 200px;
}

.box {
  width: 200px;
  height: 80px;
  border: 1px solid #eee;
  margin: 20px auto;
  border-radius: 5.28px;
  display: flex;
  margin-bottom: 5px;
  padding: 5px 15px 10px;
  box-shadow: 0 0 10px #dedede;
  background-color: #fff;
  cursor: pointer;
}

.left {
  width: 20%;
  height: 100%;
  line-height: 24px;
  max-width: 25%;
  min-height: 1px;
  margin: 10px 10%;

}

.left>img {
  width: 36.575px;
}

.right {
  width: 80%;
  height: 100%;
  text-align: center;

}

.p1 {
  font-size: 13px;
  font-weight: 700;
  color: rgb(136, 136, 136);
  line-height: 16px;
  margin-bottom: 8px;
  margin-top: 10px;
}

.p2,
.p3,
.p4 {
  font-size: 12px;
  color: rgb(173, 173, 173);
  font-weight: 500;
  line-height: 20px;


}

.box:hover {
  box-shadow: 0 0 15px #999;
}</style>
