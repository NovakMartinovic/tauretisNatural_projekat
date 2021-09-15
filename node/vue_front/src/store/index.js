import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const baseUrl = 'http://localhost:8085/'

export default new Vuex.Store({
    state: {
        proizvodi: [],
        users: [],
    },
    mutations: {
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
        load_proizvodi: function ({ commit }) {
            fetch(  baseUrl  + `proizvodi/`, { method: 'get'
                , headers:{
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
        new_user: function({ commit }, user) {
            fetch(baseUrl  + `register/`, {
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
    },
})
