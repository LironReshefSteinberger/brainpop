
import Vue from 'vue'
import Vuex from 'vuex'
import SchoolClassModule from './SchoolClassModule.js'
import StudentModule from './StudentModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    SchoolClassModule,
    StudentModule,
  }
})
