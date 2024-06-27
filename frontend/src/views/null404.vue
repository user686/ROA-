<template>
  <div class="main">
    <li class="suggest">
      <strong class="suggest_title">不好！你好像迷路了，请检查以下域名是否正确：</strong>
      <p class="url" id="url">{{ url }}</p>
    </li>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'null404',
  data() {
    return {
      url: ''

    }
  },
  mounted(){
    this.url = window.location.host;
  }

}
</script>

<style scoped lang="less">
.main {
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: linear-gradient(135deg, #9cc3ed 0%, #4c9ee6 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #73b0e9;
  color: #e9f1f9;
}

li {
  list-style: none;
  position: relative;
  top: 50px;
  left: 30px;
}
.suggest_title {
  position: relative;
  display: block;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: normal;
  color: #e9f1f9;
}
</style>
