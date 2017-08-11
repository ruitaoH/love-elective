import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Choice from 'components/choice/choice'
import Comment from 'components/comment/comment'
import Search from 'components/search/search'

// 二级路由
import CourseDetail from 'components/course-detail/course-detail'

// 三级路由
import Evaluate from 'components/evaluate/evaluate'

Vue.use(Router)

export default new Router({
  base: '/newixuanxiu/',
  routes: [
    {
      path: '/',
      redirect: '/choice'
    }, {
      path: '/choice',
      component: Choice,
      children: [
        {
          path: ':teacher/:name',
          component: CourseDetail,
          children: [
            {
              path: 'evaluate',
              component: Evaluate
            }
          ]
        }
      ]
    }, {
      path: '/comment',
      component: Comment,
      children: [
        {
          path: ':teacher/:name',
          component: Evaluate
        }
      ]
    }, {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':teacher/:name',
          component: CourseDetail,
          children: [
            {
              path: 'evaluate',
              component: Evaluate
            }
          ]
        }
      ]
    }
  ]
})
