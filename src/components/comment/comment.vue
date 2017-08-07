<template>
  <div class="comment">
    <scroll class="comment-wrapper" :data="evaluatedCourseList" v-show="showFlag">
      <div>
        <div class="padding">
          <div class="user-wrapper" v-if="user">
            <div class="user">
              <div class="avatar-wrapper">
                <img class="avatar" :src="user.avatar" />
              </div>
              <div class="name-wrapper">
                <span class="name">{{ user.name }}</span>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="old">
                <span class="text">已评价课程</span>
                <div class="line"></div>
              </div>
              <div class="new" @click="evaluateNew">
                <span class="text">评价新课程</span>
              </div>
            </div>
          </div>
          <ul>
            <li class="course-item" v-for="course in evaluatedCourseList">
              <div class="title-wrapper">
                <div class="title">
                  <span class="name">{{ course.course_name }}</span>
                  <span class="teacher">{{ course.course_teacher }}</span>
                </div>
                <div class="button" @click="editEvaluate(course)">
                  编辑评价
                </div>
              </div>
              <div class="content-wrapper">
                <p class="content">{{ course.evaluate_content }}</p>
              </div>
              <div class="footer">
                <div class="time">
                  <span class="text">{{ `${course.evaluate_year}年${course.evaluate_month}月${course.evaluate_day}日` }}</span>
                </div>
                <div class="approval">
                  <i class="icon-thumb_up"></i>
                  <span class="count">{{ course.approval_count }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>

    <!-- loading -->
    <div class="loading-wrapper" v-show="!showFlag">
      <loading></loading>
    </div>

    <!-- 二级路由: 评价表单 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'

import { getComment } from 'api/comment'
import { ERR_OK } from 'api/config'

import { createUser } from 'common/js/user'

import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      user: null,
      evaluatedCourseList: [],
      showFlag: false
    }
  },
  activated () {
    if (!this.user) {
      this._getComment()
    }
  },
  methods: {
    evaluateNew () {
      this.$router.push('/search')
    },
    editEvaluate (course) {
      this.setCourse(course)
      this.$router.push(`/comment/${course.course_teacher}/${course.course_name}`)
    },
    _getComment () {
      if (this.userId === -1) {
        this.$router.push('/choice')
        return
      }

      getComment(this.userId).then((res) => {
        if (res.status === ERR_OK) {
          this.user = createUser(res.data)
          this.evaluatedCourseList = res.data.evaluated_courses

          setTimeout(() => {
            this.showFlag = true
          }, 20)
        }
      })
    },
    ...mapMutations({
      'setCourse': 'SET_COURSE'
    })
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.comment
  position: fixed
  top: 0.96rem
  bottom: 0
  left: 0
  right: 0
  background: $color-background
  .comment-wrapper
    height: 100%
    overflow: hidden
    .padding
      padding: 0.2rem 0.26rem
      .user-wrapper
        height: 3.2rem
        border-radius: 0.04rem
        background: #fff
        box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
        .user
          height: 2.44rem
          border-bottom: 0.02rem solid $color-border
          overflow: hidden
          .avatar-wrapper
            margin: 0.26rem auto 0.34rem
            width: 0.98rem
            height: 0.98rem
            .avatar
              width: 100%
              height: 100%
              border-radius: 50%
          .name-wrapper
            text-align: center
            font-size: 0
            .name
              font-size: $font-size-medium-x
        .button-wrapper
          display: flex
          height: 0.76rem
          .old, .new
            flex: 1
            text-align: center
            font-size: 0
            .text
              line-height: 0.76rem
              font-size: $font-size-medium-x
          .old
            box-sizing: border-box
            border-right: 0.02rem solid $color-border
            color: $color-border-green
            .line
              width: 1.9rem
              margin: 0 auto
              border-bottom: 0.04rem solid $color-border-green
              transform: translateY(-0.04rem)
          .new
            color: $color-text-d
      .course-item
        height: 2.52rem
        margin-top: 0.22rem
        box-sizing: border-box
        padding: 0.24rem
        background: #fff
        border-radius: 0.04rem
        box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
        .title-wrapper
          display: flex
          height: 0.46rem
          padding: 0 0.24rem 0 0.08rem
          justify-content: space-between
          font-size: 0
          .title
            line-height: 0.46rem
            .name
              margin-right: 0.24rem
              font-size: $font-size-medium-x
              color: $color-text-d
            .teacher
              font-size: $font-size-medium
              color: $color-text-l
          .button
            line-height: 0.46rem
            padding: 0 0.2rem
            font-size: $font-size-small
            color: $color-border-green
            border: 0.02rem solid $color-border-green
            border-radius: 0.02rem
        .content-wrapper
          padding: 0.52rem 0.44rem 0.38rem 0.08rem
          border-bottom: 0.02rem solid $color-border
          .content
            font-size: $font-size-medium
            color: $color-text-m
            no-wrap()
        .footer
          display: flex
          height: 0.66rem
          padding: 0 0.3rem 0 0.08rem
          justify-content: space-between
          font-size: 0
          .time
            .text
              line-height: 0.66rem
              font-size: $font-size-small
              color: $color-text-l
          .approval
            .icon-thumb_up, .count
              display: inline-block
              vertical-align: middle
              line-height: 0.66rem
              color: $color-text-l
            .icon-thumb_up
              margin-right: 0.12rem
              font-size: $font-size-medium-x
            .count
              font-size: $font-size-small
  .loading-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  .slide-enter-active, .slide-leave-active
    transition: transform 0.3s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>
