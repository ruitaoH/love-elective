/*
  课程详情页api
 */
import axios from 'axios'
import qs from 'qs'

/**
 * 课程详情接口
 */
export function getCourseDetailInfo (userId, course) {
  const url = '/newixuanxiu/api/v1/user/course_detail'

  const data = {
    user_id: userId,
    course_id: course.course_id,
    course_name: course.course_name,
    course_teacher: course.course_teacher
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 点赞接口
 */
export function postApproval (userId, course, commentId) {
  const url = '/newixuanxiu/api/v1/user/approval'

  const data = qs.stringify({
    'user_id': userId,
    'course_name': course.course_name,
    'course_teacher': course.course_teacher,
    'comment_id': commentId
  })

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 取消点赞接口
 */
export function postDisapproval (userId, course, commentId) {
  const url = '/newixuanxiu/api/v1/user/disapproval'

  const data = qs.stringify({
    'user_id': userId,
    'course_name': course.course_name,
    'course_teacher': course.course_teacher,
    'comment_id': commentId
  })

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
