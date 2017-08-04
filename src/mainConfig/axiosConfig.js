import axios from 'axios'
//设置post请求头部
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//每次请求之前的回调
axios.interceptors.request.use(function(config) { // 这里的config包含每次请求的内容
	if(localStorage.getItem("httpKey")) {
		config.headers.Authorization = `Bearer ${localStorage.getItem("httpKey")}`;
	}
	//		请求完执行的函数
	//		config.transformResponse = [(res) => {
	//			var data = JSON.parse(res);
	//			return data;
	//		}]
	return config;
}, function(err) {
	return Promise.reject(err);
});

export default axios