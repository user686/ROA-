<template>
  <div>
    <div class="header">
      <div class="logo">
        <img class="z_logo" src="../assets/ceshi/ttlogo.png" alt="华财会计" />
      </div>

      <div class="item">
        <div class="li">首页</div>
        <div class="li">服务</div>
        <div class="li">姚会计</div>
        <div class="li">关于姚慧</div>
        <div class="li">联系我们</div>
      </div>
    </div>

    <div class="container">
      <div class="box">
        <img
          src="http://123.249.118.15:7005/public/image/1712040405567微信图片_20240402144634.jpg"
          alt=""
        />
      </div>

      <div class="section1">
        <div class="layui-col-md12 tit1">注册公司 <b>到手资料</b></div>
        <div>
          <img src="https://www.huacai.com.cn/images/ds1.jpg" />
        </div>
      </div>

      <div class="section2">
        <div class="layui-col-md12 tit1">常见问题</div>
        <div class="layui-col-md12 q-list">
          <p class="t">公司名称起什么样的结构？</p>
          <p class="c">
            构成企业名称的四项基本要素是行政区划名称、字号、行业或经营特点、组织形式。
          </p>
          <p class="t">公司注册地址该怎么选择？</p>
          <p class="c">
            一般是两种方式，第一种就是自己提供租赁地址或者购买的商业房产，第二种就是虚拟注册地址只能作为工商注册地址但是不可以作为办公地址，地址在工商局是有备案的，属于正规合法的地址。
          </p>
          <p class="t">公司注册需要多长时间？</p>
          <p class="c">
            从核名到国地税终了，一个星期多一点。最快7个工作日就能办理成功。
          </p>
          <p class="t">公司注册哪些环节需要法人到场？</p>
          <p class="c">
            因区域政策的不同，不同地区对公司注册各环节的要求也不同；有的地区所有环节都不需要法人到场，只需提供法人身份证原件和委托书等材料；但有些地区在某些环节是需要法人亲自到场，如篆刻公章、银行开户等。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ad1",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.box {
  text-align: center;
  img {
    width: 300px;
  }
}
.header {
  width: 1200px;
  height: 102px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .logo img {
    display: inline-block;
    vertical-align: middle;
    width: 180px;
    height: 70px;
  }

  .item {
    display: flex;
    align-items: center;
    .li {
      padding: 0 2px;
      display: block;
      font-size: 16px;
      color: #333;
      margin-left: 17px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .li:hover {
      color: #5c91dd;
    }
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.section1 {
  text-align: center;
  .tit1 {
    color: #4a4a4a;
    font-size: 40px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 30px;
    letter-spacing: 5px;
    font: "Microsoft Yahei", "微软雅黑", sans-serif;
    b {
      color: #fbaf1d;
      font-weight: bold;
      outline: 0 !important;
    }
  }
}

.section2 {
  .tit1 {
    color: #5c91dd;
    font-size: 40px;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 30px;
    letter-spacing: 5px;
  }
  .q-list {
    color: #3d4c63;
    font: "Microsoft Yahei", "微软雅黑", sans-serif;
    .t {
      color: #ffffff;
      font-size: 24px;
      background: url(https://www.huacai.com.cn/images/tbg.jpg) no-repeat left
        top #ffffff;
      height: 48px;
      line-height: 48px;
      padding-left: 18px;
      margin: 18px auto;
    }
    .c {
      font-size: 20px;
      line-height: 30px;
      color: #565656;
    }
  }
}
</style>
