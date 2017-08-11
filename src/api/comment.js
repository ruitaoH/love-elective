/*
  评课页api
 */
import axios from 'axios'

/**
 * 评课接口
 */
export function getComment (userId) {
  const url = '/newixuanxiu/api/v1/user/user_information'

  const data = {
    user_id: userId
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
