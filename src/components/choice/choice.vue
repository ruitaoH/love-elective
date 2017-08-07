<template>
  <div class="choice">
    <filter-tab></filter-tab>
    <scroll class="choice-list"
            :data="filterCourses"
            :enable="!filterShow">
      <div>
        <div class="padding" v-if="courses.length">
          <course-list @select="selectCourse" :courses="largeCourses"></course-list>
          <split text="以下课程低于2学分" v-if="littleCourses.length"></split>
          <course-list @select="selectCourse" :courses="littleCourses"></course-list>
        </div>
      </div>

      <!-- 遮盖层 -->
      <transition name="fade">
        <div class="mask" v-show="filterShow" @click="cancelMask"></div>
      </transition>

      <!-- loading -->
      <div class="loading-wrapper" v-show="!courses.length">
        <loading></loading>
      </div>
    </scroll>

    <!-- 二级路由: 课程详情 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import FilterTab from 'components/filter-tab/filter-tab'
import Scroll from '@/base/scroll/scroll'
import CourseList from 'components/course-list/course-list'
import Split from '@/base/split/split'
import Loading from '@/base/loading/loading'

import { getCourseList } from 'api/choice'
import { ERR_OK } from 'api/config'

import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      courses: []
    }
  },
  created () {
    this._getCourseList()
  },
  methods: {
    selectCourse (course) {
      this.setCourse(course)
      this.$router.push(`/choice/${course.course_teacher}/${course.course_name}`)
    },
    cancelMask () {
      this.setFilterShow(false)
    },
    _getCourseList () {
      getCourseList().then((res) => {
        if (res.status === ERR_OK) {
          this.courses = res.data.course_information
          this.setUser(res.data.user_id)
        }
      })
    },
    _check (item, filterLists) {
      for (let key in filterLists) {
        let filterList = filterLists[key]

        if (!filterList.length) { // 如果这个filterList 为 [],则不过滤
          continue
        }

        if (filterList.indexOf(item[key]) === -1) {
          return false
        }
      }
      return true
    },
    ...mapMutations({
      setUser: 'SET_USER',
      setCourse: 'SET_COURSE',
      setFilterShow: 'SET_FILTER_SHOW'
    })
  },
  computed: {
    filterCourses () {
      let filterLists = {}

      for (let key in this.filters) {
        let filterList = this.filters[key].list.filter((item) => item.value)
        filterLists[key] = filterList.length !== 0 ? filterList.map((item) => item.type) : []
      }

      filterLists = Object.assign({}, {
        'course_category': filterLists.category,
        'course_weekday': filterLists.time,
        'course_area': filterLists.place,
        'rollcall_way': filterLists.rollcall,
        'assessment_way': filterLists.assessment
      })

      return this.courses.filter((item) => {
        return this._check(item, filterLists)
      })
    },
    largeCourses () {
      // 大于等于2学分
      return this.filterCourses.filter((item) => {
        return item.course_credit >= 2
      })
    },
    littleCourses () {
      // 小于2学分
      return this.filterCourses.filter((item) => {
        return item.course_credit < 2
      })
    },
    ...mapGetters([
      'filters',
      'filterShow'
    ])
  },
  components: {
    FilterTab,
    Scroll,
    CourseList,
    Split,
    Loading
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.choice
  .choice-list
    position: fixed
    top: 1.6rem
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    background: $color-background
    .padding
      padding: 0.22rem 0.26rem
    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .mask
      position: absolute
      z-index: 40
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: $mask
      &.fade-enter-active, &.fade-leave-active
        transition: opacity 0.3s
      &.fade-enter, &.fade-leave-to
        opacity: 0
  .slide-enter-active, .slide-leave-active
    transition: transform 0.3s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>
