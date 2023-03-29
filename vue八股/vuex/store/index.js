// 创建一个新的store实例
// vuex中的store本质就是没有template的隐藏着的vue组件
import modulesA from "./modules/modulesA"
const store = {
    // 状态
    state: {
        state: 0,
        member: [
            { id: 1, text:'i am a boy', done: true },
            { id: 2, text:'i am a girl', done: false },
        ]
    },
    // 同步操作
    mutations: {
        increate (state) {
            state.count++
        },
        add (state, n) {
            state.count += n
        }
    },
    // 异步操作
    actions: {
        increate (context) {
            context.commit('increate')
        },
        add ({commit}) {
            setTimeout(() => {
                commit('add', 20)
            })
        }
    },
    // 可以认为是store的计算属性，接受state作为其第一个参数，也可以接受其他getter作为第二个参数
    getters: {
        doneTodos(state) {
            return state.member.filter(p => p.done)
        },
        getTodoById: (state) => (id) => {
            return state.member.filter(p => p.id === id)
        }
    },
    modules: {
        modulesA
    }
}

// 通过store.state来获取状态对象，
store.state
// 通过commit方法触发状态变更
store.commit('increate')
// 允许传入额外的参数，即mutation的载荷
store.commit('add', 10)

store.dispatch('add')
// mapState 辅助函数  import { mapState } from 'vuex'
// ...mapState

// mapGetters 辅助函数仅仅是将store中的getter映射到局部计算属性
// import { mapGetters } from 'vuex'
// computed: {
//     ...mapGetters([
//         'doneTodos',
//         'getTodoById'
//     ])
// }
