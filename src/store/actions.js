import * as types from './mutation-types'

import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

/**
 * [显示filter-card的action]
 */
export const showFilter = function ({ commit }, type) {
  commit(types.SET_FILTER_SHOW_TYPE, type)
  commit(types.SET_FILTER_SHOW, true)
}

export const saveSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export function deleteSearchHistory ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export function clearSearchHistory ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
