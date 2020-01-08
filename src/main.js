import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import {Button, Table, Form, FormItem,Input,Dialog,TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(TableColumn);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
