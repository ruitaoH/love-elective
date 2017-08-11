/*
  搜索页接口
 */
import axios from 'axios'
import qs from 'qs'

/**
 * 搜索接口
 */
export function getSearch (content) {
  const url = '/newixuanxiu/api/v1/user/search_course'

  const data = qs.stringify({
    'search_content': content
  })

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 *  热搜接口
 */
export function getHotSearch () {
  const url = '/newixuanxiu/api/v1/user/hot_search'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
