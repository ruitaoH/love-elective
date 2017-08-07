/*
  选课页api
 */
import axios from 'axios'

/**
 * 课程接口
 */
export function getCourseList () {
  const url = '/api/v1/user/homepage'

  const data = {
    type: 'all'
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
