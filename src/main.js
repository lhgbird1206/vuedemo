import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css' // global css
import './utils/permission' // permission control

// 加入vuex的库
import store from './store/store'
import router from "./router/router";

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
    store,
    router
}).$mount('#app');
