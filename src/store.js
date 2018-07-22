import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken: null,
		userId: null,
		user: null,
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData.token;
			state.userId = userData.userId;
		},
		storeUser(state, user) {
			state.user = user;
		},
		clearAuthData(state) {
			state.idToken = null;
			state.userId = null;
		},
	},
	actions: {
		setTimer({ commit }, expirationTime) {
			setTimeout(() => {
				commit('clearAuthData');
			}, expirationTime * 1000);
		},
		signup({ commit, dispatch }, authData) {
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
					dispatch('storeUser', authData);
					dispatch('setTimer', res.data.expiresIn);
				})
				.catch(err => console.log(err));
		},
		login({ commit, dispatch }, authData) {
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
					router.push('/dashboard');
					dispatch('setTimer', res.data.expiresIn);
				})
				.catch(err => console.log(err));
		},
		logout({ commit }) {
			commit('clearAuthData');
			router.replace('/');
		},
		storeUser({ commit, state }, userData) {
			if (!state.idToken) return;

			return globalAxios
				.post(`/users.json?auth=${state.idToken}`, userData)
				.then(res => {
					console.log(res);
				})
				.catch(err => console.log(err));
		},
		fetchUser({ commit, state }) {
			if (!state.idToken) return;

			return globalAxios
				.get(`/users.json?auth=${state.idToken}`)
				.then(res => {
					if (res) {
						console.log(res.data);
						const { data } = res;
						const users = [];

						for (let key in data) {
							const user = data[key];

							user.id = key;
							users.push(user);
						}
						console.log(users);
						commit('storeUser', users[0]);
					}
				})
				.catch(err => console.log(err));
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		isAuthenticated(state) {
			return !!state.idToken;
		},
	},
});
