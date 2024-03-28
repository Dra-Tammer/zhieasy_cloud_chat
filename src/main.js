import Vue from 'vue'
import Vuesax from '@brugarolas/vuesax'
import '@brugarolas/vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import App from './App.vue'
import router from './router'

Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
