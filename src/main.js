import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch , faFilter , faPen , faInfo , faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VeeValidate from "vee-validate";
import './assets/scss/style.scss'
import VTooltip from 'v-tooltip'
 

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VeeValidate);
Vue.use(VTooltip)


library.add(faSearch);
library.add(faFilter); 
library.add(faPen);
library.add(faInfo);
library.add(faDownload);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
