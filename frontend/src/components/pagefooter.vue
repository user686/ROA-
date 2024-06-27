<template>
  <div class="main">
    <div class="container">
      <div class="left">
        <span>阿里云</span>
        <span>华为云</span>
        <span>字节跳动</span>
        <span>飞书</span>
        <span>微软VS Code</span>
        <span>WebStorm</span>
      </div>
      <div class="right">
        <div class="icon"><img src="../assets/icon1_footer.png" alt=""></div>
      </div>
    </div>
    <div class="copy">
      <span>光影自动化办OA</span>
      <span>皖ICP备2023012621号-1</span>
      <div class="line"></div>
      <span>友情链接</span>
      <span>法律声明</span>
      <span>隐私政策</span>
      <span>除名查询</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagefooter',
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main {
  background-color: #f2f2f2;
  .container{
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    span{
      margin-right: 10px;
    }
  }
}

.copy {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 14px;
  color: #999;

  span {
    margin: 0 10px;
  }

  .line {
    width: 1px;
    height: 14px;
    background: #c2c3c3;
    display: inline-block;
    margin: 0 8px 0 8px;
  }
}
</style>
