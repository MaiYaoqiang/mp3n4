import Vue from 'vue'
//引入vue-router
import VueRouter from 'vue-router'
//使用vue-router
Vue.use(VueRouter)
	//引入router配置文件
import routes from './router.config.js'
//使用路由
const router = new VueRouter({
	scrollBehavior: () => ({
		y: 0
	}),
	routes
});

export default router