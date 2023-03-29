export default {
    // 使其成为带命名空间的模块
    nameSpaced: true,
    state: {
        autoName: 'fhj'
    },
    mutations: {
        // commit('modules/modulesA')
        changeName(state, name) {
            state.autoName = name
        }
    },
    actions: {

    },
    getters: {
        // getters['modulesA/getName']
        getName(state) {
            return state.autoName
        }
    },

}