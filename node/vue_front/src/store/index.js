import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        proizvodi: [],
    },
    mutations: {
        get_proizvodi: function (state, proizvodi) {
            state.proizvodi = proizvodi
        },
    },
    actions: {

        load_proizvodi: function ({ commit }) {
            fetch(  '/proizvodi', { method: 'get' })
                .then((response) => {
                    if (!response.ok)
                        throw response;
                    return response.json()
                }).then((jsonData) => {
                commit('get_proizvodi', jsonData)
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
