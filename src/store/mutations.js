import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, userId) {
    state.userId = userId
  },
  [types.SET_COURSE] (state, course) {
    state.course = course
  },
  [types.SET_FILTER] (state, { type, index }) {
    state.filters[type].list[index].value = !state.filters[type].list[index].value
  },
  [types.SET_FILTER_SHOW] (state, flag) {
    state.filterShow = flag
  },
  [types.SET_FILTER_SHOW_TYPE] (state, type) {
    state.filterShowType = type
  },
  [types.SET_SEARCH_HISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_SHOWTOAST] (state, flag) {
    state.showToast = flag
  }
}

export default mutations
