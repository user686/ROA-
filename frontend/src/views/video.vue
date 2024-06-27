<template>
  <div class="main">
    <PageHeader></PageHeader>
    <div class="container">
      <div id="mse"></div>
    </div>
  </div>
</template>

<script>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

export default {
  name: "videopage",
  data() {
    return {};
  },
  mounted() {
    let player = new Player({
      id: "mse",
      url: "http://123.249.73.192:7003/image/ctx/schoolimg/jiaocheng_z.mp4",
      height: "100%",
      width: "100%",
    });
  },
};
</script>

<style scoped lang="less">
.container {
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  background-color: #fbfbfb;
  padding: 0 20px;
  padding-bottom: 200px;
  margin-top: 30px;
}

video {
  width: 100%;
}
</style>
