import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import disableDevtool from 'disable-devtool';
 
disableDevtool();

import mixinJS from './mixin'
Vue.mixin(mixinJS)

Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
});

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Footer from './components/pagefooter.vue'
Vue.component('Footer', Footer);

import PageHeader from './components/pageheader.vue'
Vue.component('PageHeader', PageHeader);

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App)
}).$mount('#app')
