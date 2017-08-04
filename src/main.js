import Vue from 'vue'
import App from './App.vue'

//引入配置好的axios
import axios from './mainConfig/axiosConfig.js'

//把axios挂载到Vue原型链上
Vue.prototype.$http = axios

//引入vueFilter
require('./mainConfig/vueFilter.js')

require('./mainConfig/elementUI.js')

require('./assets/css/cssReset.css'); //引入全局样式表
require('./assets/css/flex.css'); //引入全局样式表
require('./assets/css/font-awesome.min.css');

//引入路由
import router from './mainConfig/vueRouter.js'



new Vue({
	data: {

	},
	methods: {
		
	},
	el: '#app',
	router,
	render: h => h(App)
})