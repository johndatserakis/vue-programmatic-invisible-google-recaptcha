import Vue from 'vue'
import App from './App.vue'

import VueProgrammaticInvisibleGoogleRecaptcha from '../src/index.js'
Vue.component('vue-programmatic-invisible-google-recaptcha', VueProgrammaticInvisibleGoogleRecaptcha)

new Vue({
  el: '#app',
  render: h => h(App)
})
