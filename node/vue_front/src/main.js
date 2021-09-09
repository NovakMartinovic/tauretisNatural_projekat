import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount('#app')

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
