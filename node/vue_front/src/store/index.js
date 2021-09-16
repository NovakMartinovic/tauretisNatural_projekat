import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const baseUrl = 'http://localhost:8085/'

export default new Vuex.Store({
    state: {
        proizvodi: [],
        users: [],
        korpa: [],
        user: "",
    },
    mutations: {

        set_users: function (state, users) {
            state.users = users;
        },
        set_user: function (state, user) {
            state.user = user;
        },
        set_kopra: function (state, korpa) {
            state.korpa = korpa;
        },
        set_proizvodi: function (state, proizvodi) {
            state.proizvodi = proizvodi;
        },
        get_proizvodi: function (state){
            return state.proizvodi;
        },
        add_user: function (state,user){
            state.users.push(user);
        },

    },
    actions: {
        load_korpa ({ commit }, id) {
            fetch(  baseUrl  + `korpa/${id}`, { method: 'get'
                , headers:{
                    'auth': localStorage.getItem('auth')

                }}).then((response) => {
                if (!response.ok)
                    alert(response.clone().json().title)
                return response.json()
            }).then((jsonData) => {
                commit('set_korpa', jsonData)
            }).catch((error) => {
                alert('a')
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {

                        alert(errorMessage);
                    });
                else{
                    alert('b')
                    alert(error);
                }

            });


        },
        load_proizvodi: function ({ commit }) {
            fetch(  baseUrl  + `proizvodi/`, {
                method: 'get',
                headers:{
                    'auth': localStorage.getItem('auth')
                }}).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_proizvodi', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        get_users_for_login: function ({ commit }) {
            fetch(  baseUrl  + `user`, { method: 'get'
                , headers:{
                    'auth': localStorage.getItem('auth')

                }}).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_users', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        new_user: function({ commit }, user) {
            fetch(baseUrl  + `auth/register/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_user', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        login_user: function ({commit}, user){


            fetch(baseUrl + `auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {

                localStorage.setItem('auth', jsonData.token)
                localStorage.setItem('user', jsonData.username)
                localStorage.setItem('user_id', jsonData.id)
                localStorage.setItem('is_admin', jsonData.is_admin)
                commit('set_user', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
    }
})

