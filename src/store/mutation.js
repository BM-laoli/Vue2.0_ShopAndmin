import { LOADING, UNLOADING } from './mutations-types'

export default {
    [LOADING](state) {
        state.loading = true
    },
    [UNLOADING](state) {
        state.loading = false
    },

}