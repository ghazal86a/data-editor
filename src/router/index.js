import Vue from 'vue'
import Router from 'vue-router'
import ImportCSV from '@/components/ImportCSV'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImortCSV',
      component: ImportCSV
    }
  ],
  mode: 'history'
})
