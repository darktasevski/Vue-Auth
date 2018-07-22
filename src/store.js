import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken: null,
		userId: null,
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData.token;
			state.userId = userData.userId;
		},
	},
	actions: {
		signup({ commit }, authData) {
			return axios
				.post('/signupNewUser?key=AIzaSyDspg8Wy4fXKMUJbwVm8bwS5nNIdZhCNMc', {
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then(res => {
					console.log(res);
					commit('authUser', {
						token: res.data.idToken,
						userId: res.data.localId,
					});
				})
				.catch(err => console.log(err));
		},
		login({ commit }, authData) {
			return axios
				.post('/verifyPassword?key=AIzaSyDspg8Wy4fXKMUJbwVm8bwS5nNIdZhCNMc', {
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then(res => {
					console.log(res);
					commit('authUser', {
						token: res.data.idToken,
						userId: res.data.localId,
					});
				})
				.catch(err => console.log(err));
		},
	},
	getters: {},
});
