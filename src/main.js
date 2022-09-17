import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";

// create custome style.css and import
import './assets/css/style.css'

// Bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, fas, faR } from '@fortawesome/free-solid-svg-icons'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// font awesome stuff
library.add(faUserSecret, fas, faR)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
