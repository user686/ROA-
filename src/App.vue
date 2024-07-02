<template>
  <div id="app" v-if="canRender">
    <router-view />
  </div>
</template>

<script>
import { hanldVertifyBlackuser } from "./utils/api/app.js";
export default {
  name: "App",
  data() {
    return {
      canRender: true,
    };
  },
  beforeCreate() {
    // 判断是否是黑名单用户
    hanldVertifyBlackuser().then((res) => {
      if (res) {
        location.replace("https://www.baidu.com/")
      }else{
        this.canRender = true
      }
    });
  },
  mounted() {
    console.log('页面刷新了=====>>>>');
    if (localStorage.getItem('tooltoken')) {
      this.getUserInfo()
    }
    setInterval(() => {
      // console.clear()
    }, 200);
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}
</style>
