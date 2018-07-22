import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import router from './router';
import store from './store';

axios.defaults.baseURL = 'https://vue-axios-combo.firebaseio.com';
axios.defaults.headers.common['Authorization'] = 'token-placeholder';
axios.defaults.headers.get['Accepts'] = 'application/json';

// Set interceptors
const reqInterceptor = axios.interceptors.request.use(config => {
	console.log('config', config);
	return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
	console.log('response', res);
	return res;
});

// Remove interceptors
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
});
