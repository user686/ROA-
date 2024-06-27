<template>
  <div class="main">
    <div class="wrap" v-html="content"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  handleGet
} from '@/utils/api/argument'
export default {
  name: 'vhtml',
  data() {
    return {
      url: '',
      content: ''
    }
  },
  mounted(){
    document.title = '用户协议'
    console.log(this.$route.query.id);
    
    let id = this.$route.query.id;
    handleGet(id).then(res=>{
      this.content = res.result[0].content
    })
  },
  methods: {

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
  overflow: scroll;
  background-image: linear-gradient(135deg, #9cc3ed 0%, #4c9ee6 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #73b0e9;
  color: #e9f1f9;
  overflow-x: hidden;
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

.wrap{
  width: 80%;
  margin: 0 auto;
}
</style>
