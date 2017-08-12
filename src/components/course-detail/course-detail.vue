<template>
  <div class="course-detail">
    <course-header :name="course.course_name"></course-header>

    <div class="content-wrapper">
      <scroll class="content-wrapper-scroll" :data="latestComments" v-show="showFlag">
        <div>
          <div class="padding">
            <div class="info">
              <div class="left">
                <div class="row">
                  <span class="type">类别</span>
                  <span class="text">{{ allCourseInfo.course_category }}</span>
                </div>
                <div class="row">
                  <span class="type">学分</span>
                  <span class="text">{{ allCourseInfo.course_credit }}</span>
                </div>
                <div class="row target">
                  <span class="type">针对对象</span>
                  <span class="text">{{ allCourseInfo.course_object }}</span>
                </div>
              </div>
              <div class="right">
                <tag-container :margin-right-rem="0.24" v-if="getTagList(allCourseInfo).length">
                  <li class="tag-item" v-for="item in getTagList(allCourseInfo)">
                    {{ item }}
                  </li>
                </tag-container>
              </div>
            </div>

            <!-- 地点时间 -->
            <div class="place-time-wrapper">
              <div class="type">
                <p class="text place-type">开课地点</p>
                <p class="text">开课时间</p>
              </div>
              <horizontal-scroll ref="horizontalScroll" class="value-wrapper" :data="allCourseInfo.other_information">
                <ul class="value-list">
                  <li class="value" ref="times" v-for="(item, index) in allCourseInfo.other_information" :class="{ line: hasLine(index) }">
                    <p class="place">{{ item.course_address }}</p>
                    <ul class="time">
                      <li class="time-item" v-for="time in item.course_time">{{ time }}</li>
                    </ul>
                  </li>
                </ul>
              </horizontal-scroll>

              <div class="prev" @click="prev" v-show="showPrev">
                <i class="icon-arrow_lift"></i>
              </div>

              <div class="next" @click="next" v-show="showNext">
                <i class="icon-arrow_lift"></i>
              </div>
            </div>

            <!-- 分割 -->
            <split text="课程评价"></split>

            <div class="evaluation">
              <div class="good">
                <span class="text">很赞&nbsp;&nbsp;{{ courseQuality.best }}</span>
                <img class="img" src="./flag.png" v-show="flag === 'best'" />
              </div>
              <div class="normal">
                <span class="text">一般&nbsp;&nbsp;{{ courseQuality.common }}</span>
                <img class="img" src="./flag.png" v-show="flag === 'common'" />
              </div>
              <div class="bad">
                <span class="text">糟糕&nbsp;&nbsp;{{ courseQuality.terrible }}</span>
                <img class="img" src="./flag.png" v-show="flag === 'terrible'" />
              </div>
            </div>

            <!-- 精彩评论 + 最新评论 -->
            <div class="comment-list-wrapper" v-show="latestComments.length">
              <!-- 精彩评论 -->
              <h1 class="wonderful-title">精彩评论</h1>
              <comment-list :comments="wonderfulComments" @approval="approval" @disapproval="disapproval"></comment-list>


              <!-- 最新评论 -->
              <h1 class="new-title">最新评论</h1>
              <comment-list :comments="latestComments" @approval="approval" @disapproval="disapproval"></comment-list>
            </div>
          </div>
        </div>
      </scroll>

      <!-- loading -->
      <div class="loading-wrapper" v-show="!showFlag">
        <loading></loading>
      </div>
    </div>

    <!-- 底部button -->
    <div class="footer-button-wrapper">
      <footer-button title="添加评价" @click="showEvaluate" v-show="showFlag"></footer-button>
    </div>

    <!-- 三级路由: 评价表单 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import CourseHeader from 'components/course-header/course-header'
import Scroll from '@/base/scroll/scroll'
import Split from '@/base/split/split'
import CommentList from 'components/comment-list/comment-list'
import Loading from '@/base/loading/loading'
import FooterButton from '@/base/footer-button/footer-button'
import TagContainer from '@/base/tag-container/tag-container'
import HorizontalScroll from '@/base/horizontal-scroll/horizontal-scroll'

import { getCourseDetailInfo, postApproval, postDisapproval } from 'api/course'
import { ERR_OK } from 'api/config'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      allCourseInfo: {},
      courseQuality: {},
      latestComments: [],
      showFlag: false,
      currentIndex: 0
    }
  },
  created () {
    this._getCourseDetailInfo()
  },
  methods: {
    prev () {
      let times = this.$refs.times
      let horizontalScroll = this.$refs.horizontalScroll

      let index = this.currentIndex - 1

      if (index < 0) {
        return
      }

      horizontalScroll.scrollToElement(times[index], 400)
      this.currentIndex = index
    },
    next () {
      let times = this.$refs.times
      let horizontalScroll = this.$refs.horizontalScroll
      const length = times.length

      let index = this.currentIndex + 1

      if (index >= length) {
        return
      }

      horizontalScroll.scrollToElement(times[index], 400)
      this.currentIndex = index
    },
    getTagList (course) {
      const tags = ['rollcall_way', 'assessment_way', 'course_assignment']
      let ret = []

      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        let value = course[tag]

        if (value) { // 如果有这个标签值，则显示
          ret.push(value)
        }
      }

      return ret
    },
    showEvaluate () {
      this.$router.push(`${this.$route.path}/evaluate`)
    },
    approval (data) {
      let { commentId, index } = data

      postApproval(this.userId, this.course, commentId).then((res) => {
        if (res.status === ERR_OK) {
          this.latestComments[index].approval_count++
          this.latestComments[index].is_approval = 1
        }
      })
    },
    disapproval (data) {
      let { commentId, index } = data

      postDisapproval(this.userId, this.course, commentId).then((res) => {
        if (res.status === ERR_OK) {
          this.latestComments[index].approval_count--
          this.latestComments[index].is_approval = 0
        }
      })
    },
    hasLine (index) {
      const length = this.allCourseInfo.other_information.length
      return length > 1 && index < (length - 1)
    },
    _getCourseDetailInfo () {
      getCourseDetailInfo(this.userId, this.course).then((res) => {
        if (res.status === ERR_OK) {
          this._normalize(res.data)

          setTimeout(() => {
            this.showFlag = true
          }, 20)
        }
      })
    },
    _normalize (data) {
      let otherInfo = []

      let courseInfo = data.course_information
      let courseAddress = courseInfo.course_address
      let courseTime = courseInfo.course_time

      for (let i = 0; i < courseAddress.length; i++) {
        let address = courseAddress[i]
        let time = []
        let timeList = courseTime[i].split(' ')

        for (let i = 0; i < timeList.length; i += 2) {
          time.push(`${timeList[i]} ${timeList[i + 1]}`)
        }

        otherInfo.push({
          'course_address': address,
          'course_time': time
        })
      }

      this.allCourseInfo = Object.assign({}, this.course, courseInfo, {
        'other_information': otherInfo
      })
      this.courseQuality = data.course_quality
      this.latestComments = data.latest_comments.map((item, index) => {
        return Object.assign({}, item, {
          index: index
        })
      })
    }
  },
  computed: {
    flag () {
      let { best, common, terrible } = this.courseQuality

      if (best === common && best === terrible && common === terrible) {
        return ''
      }

      if (best === common && best > terrible) {
        return ''
      }

      if (best === terrible && best > common) {
        return ''
      }

      if (common === terrible && common > best) {
        return ''
      }

      return best > common ? (best > terrible ? 'best' : 'terrible') : (common > terrible ? 'common' : 'terrible')
    },
    wonderfulComments () {
      let comments = this.latestComments.slice(0) // 克隆数组

      return comments.sort((a, b) => {
        return b.approval_count - a.approval_count
      }).slice(0, 4) // 取出点赞数最多的前四条作为精彩评论
    },
    showPrev () {
      return this.allCourseInfo.other_information && this.allCourseInfo.other_information.length > 2 && this.currentIndex > 0
    },
    showNext () {
      return this.allCourseInfo.other_information && this.allCourseInfo.other_information.length > 2 && this.currentIndex < (this.allCourseInfo.other_information.length - 2)
    },
    ...mapGetters([
      'userId',
      'course'
    ])
  },
  components: {
    CommentList,
    CourseHeader,
    Scroll,
    Split,
    Loading,
    FooterButton,
    TagContainer,
    HorizontalScroll
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.course-detail
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: $color-background
  .content-wrapper
    position: fixed
    top: 1rem
    bottom: 0.98rem
    left: 0
    right: 0
    .content-wrapper-scroll
      height: 100%
      overflow: hidden
      .padding
        padding: 0.22rem 0.26rem
        .info
          display: flex
          padding: 0.22rem 0 0.22rem 0.26rem
          border-radius: $border-radius-m
          background: #fff
          box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
          .left
            flex: 0 0 3.3rem
            width: 3.3rem
            box-sizing: border-box
            padding: 0.18rem 0.26rem 0.18rem 0
            border-right: 0.02rem solid $color-border
            .row
              display: flex
              justify-content: space-between
              margin-bottom: 0.4rem
              font-size: 0
              &:last-child
                margin-bottom: 0
              &.target
                .type
                  flex: 0 0 1.1rem
                  width: 1.1rem
              .type, .text
                font-size: $font-size-small
              .type
                color: $color-text-l
              .text
                color: $color-text-d
          .right
            flex: 1
            display: flex
            flex-wrap: wrap
            align-content: flex-start
            box-sizing: border-box
            padding: 0.16rem 0.24rem
            font-size: 0
            .tag-item
              height: 0.42rem
              line-height: 0.38rem
              margin-bottom: 0.2rem
              box-sizing: border-box
              padding: 0 0.12rem
              font-size: $font-size-small-s
              color: $color-border-green
              border: 0.02rem solid $color-border-green
              border-radius: $border-radius-s
        .place-time-wrapper
          position: relative
          display: flex
          justify-content: space-between
          margin-top: 0.22rem
          padding: 0.3rem 0.26rem
          background: #fff
          border-radius: $border-radius-m
          box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
          font-size: 0
          .type
            flex: 0 0 1.4rem
            width: 1.4rem
            .text
              font-size: $font-size-small
              color: $color-text-l
              &.place-type
                margin-bottom: 0.24rem
          .value-wrapper
            flex: 1
            overflow: hidden
            .value-list
              .value
                display: inline-block
                width: 45%
                box-sizing: border-box
                &.line
                  margin-right: 10%
                  border-right: 0.02rem solid $color-border
                .place, .time
                  font-size: $font-size-small
                  color: $color-text-d
                .place
                  margin-bottom: 0.24rem
                .time // 多行开课时间
                  .time-item
                    margin-bottom: 0.1rem
          .prev, .next
            &:before
              content: ''
              position: absolute
              top: 0
              bottom: 0
              left: -0.14rem
              right: -0.14rem
          .prev
            position: absolute
            display: flex
            align-items: center
            height: 100%
            top: 0
            left: 1.4rem
            .icon-arrow_lift
              font-size: $font-size-medium
              color: $color-border
          .next
            position: absolute
            display: flex
            align-items: center
            height: 100%
            top: 0
            right: 0.02rem
            transform: rotate(180deg)
            .icon-arrow_lift
              font-size: $font-size-medium
              color: $color-border
        .evaluation
          display: flex
          border-radius: $border-radius-m
          padding: 0.26rem 0
          background: #fff
          box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
          .good, .normal, .bad
            flex: 1
            position: relative
            height: 0.4rem
            text-align: center
            font-size: 0
            .text
              line-height: 0.4rem
              font-size: $font-size-small
              color: $color-text-d
            .img
              position: absolute
              top: -0.26rem
              left: 0.3rem
              width: 0.28rem
              height: 0.44rem
          .normal
            border-left: 0.02rem solid $color-border
            border-right: 0.02rem solid $color-border
        .comment-list-wrapper
          margin-top: 0.22rem
          padding: 0.28rem 0.32rem
          border-radius: $border-radius-m
          background: #fff
          box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
          .wonderful-title, .new-title
            text-align: center
            font-size: $font-size-small
            color: $color-text-d
          .new-title
            margin-top: 0.6rem
    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .footer-button-wrapper
    position: fixed
    left: 0
    right: 0
    bottom: 0
  .slide-enter-active, .slide-leave-active
    transition: transform 0.4s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>
