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
        delete_user: function (state,id){
            for(let i = 0 ; i < state.users.length; i++){
                if(state.users[i].id === parseInt(id)){
                    state.users.splice(i,1);
                    break;
                }
            }
        },
    },
    actions: {
        load_proizvodi: function ({ commit }) {
            fetch(  baseUrl  + `proizvodi/api/`, {
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
        load_users: function ({ commit }) {
            fetch(  baseUrl  + `admin_panel/api/`, {
                method: 'get',
                headers:{
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


            fetch(baseUrl + `auth/login/`, {
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
        delete_user: function({ commit }, id) {
            fetch(  baseUrl  + `admin_panel/api/${id}`, {
                method: 'delete'
                , headers:{
                    'auth': localStorage.getItem('auth')

                }}).then((jsonData) => {
                commit('delete_user', jsonData.id)
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

