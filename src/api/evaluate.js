/*
  评价页api
 */
import axios from 'axios'
import qs from 'qs'

/**
 * 获取评价内容接口
 */
export function getEvaluatedInfo (userId, course) {
  const url = '/newixuanxiu/api/v1/user/modify_assessment'

  const data = {
    'user_id': userId,
    'course_id': course.course_id,
    'course_name': course.course_name,
    'course_teacher': course.course_teacher
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 评价接口
 */
export function postEvaluate (userId, course, comment) {
  const url = '/newixuanxiu/api/v1/user/fill_assess'

  const data = qs.stringify({
    'user_id': userId,
    'course_id': course.course_id,
    'course_name': course.course_name,
    'course_teacher': course.course_teacher,
    ...comment
  })

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
