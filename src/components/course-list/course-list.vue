<template>
  <ul>
    <li class="course-item" v-for="course in courses" @click="selectCourse(course)">
      <div class="left">
        <h1 class="name">{{ course.course_name }}</h1>
        <div class="desc">
          <span class="teacher">{{ course.course_teacher }}</span>
          <span class="category">{{ course.course_category }}</span>
        </div>
      </div>
      <div class="right">
        <tag-container :margin-right-rem="0.24">
          <li class="tag-item" v-for="(item, index) in getTagList(course)" :class="`tag${index}`">
            {{ item }}
          </li>
        </tag-container>
      </div>

      <div class="corner" @click="evaluate($event, course)">
        <span class="text" v-if="isEvaluate">评价</span>
        <i class="icon-circle-right"></i>
      </div>
    </li>
  </ul>
</template>

<script>
import TagContainer from '@/base/tag-container/tag-container'

export default {
  props: {
    courses: {
      type: Array,
      default: null
    },
    isEvaluate: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: null
    }
  },
  methods: {
    selectCourse (course) {
      this.$emit('select', course)
    },
    getTagList (course) {
      const tags = ['course_weekday', 'course_area', 'course_credit', 'rollcall_way', 'assessment_way']
      let ret = []

      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        let value = course[tag]

        if (tag === 'course_credit' && value) {
          ret.push(`${value}学分`)
          continue
        }

        if (value) { // 如果有这个标签值，则显示
          ret.push(value)
        }
      }

      return ret
    },
    evaluate (e, course) { // 传递出去
      if (this.isEvaluate) {
        e.preventDefault()
        e.stopPropagation()

        this.$emit('click', course)
      }
    }
  },
  components: {
    TagContainer
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.course-item
  display: flex
  position: relative
  width: 100%
  height: 2.08rem
  margin-bottom: 0.22rem
  box-sizing: border-box
  padding: 0.2rem 0
  border-radius: 0.04rem
  background: #fff
  box-shadow: 0.01rem 0.01rem 0.03rem rgba(100, 100, 100, 0.5)
  &:last-child
    margin-bottom: 0
  .left
    flex: 0 0 3.14rem
    width: 3.14rem
    display: flex
    flex-direction: column
    justify-content: space-between
    box-sizing: border-box
    padding: 0.1rem 0.28rem 0.12rem 0.26rem
    border-right: 0.02rem solid $color-border
    .name
      font-size: $font-size-large
      color: $color-text-d
    .desc
      display: flex
      justify-content: space-between
      height: 0.34rem
      line-height: 0.34rem
      font-size: $font-size-small
      .teacher
        color: $color-text-l
      .category
        box-sizing: border-box
        padding: 0 0.24rem
        text-align: center
        color: $color-border-green
        border: 0.02rem solid $color-border-green
        border-radius: $border-radius-s
  .right
    flex: 1
    box-sizing: border-box
    padding: 0.12rem 0.36rem 0 0.36rem
    .tag-item
      height: 0.38rem
      line-height: 0.38rem
      margin-bottom: 0.26rem
      padding: 0 0.12rem
      text-align: center
      font-size: $font-size-small
      color: $color-text
      border-radius: $border-radius-s
      &.tag0
        background: $color-tag1
      &.tag1
        background: $color-tag2
      &.tag2
        background: $color-tag3
      &.tag3
        background: $color-tag4
      &.tag4
        background: $color-tag5
  .corner
    position: absolute
    right: 0.36rem
    bottom: 0.2rem
    font-size: 0
    .text, .icon-circle-right
      display: inline-block
      vertical-align: middle
    .text
      margin-right: 0.14rem
      font-size: $font-size-small
      color: $color-border-green
    .icon-circle-right
      font-size: $font-size-medium-x
      color: $color-border-green
</style>
