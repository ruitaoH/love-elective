<template>
  <div class="evaluate">
    <!-- 顶部header -->
    <course-header :name="course.course_name"></course-header>

    <!-- 主体部分 -->
    <div v-show="showFlag">
      <div class="tag-group-wrapper">
        <tag-group title="点名" :data="rollcall" :select-string="rollcallValue" @select="(value) => select('rollcallValue', value)"></tag-group>
        <tag-group title="考核" :data="assessment" :select-string="assessmentValue" @select="(value) => select('assessmentValue', value)"></tag-group>
        <tag-group title="作业" :data="homework" :select-string="homeworkValue" @select="(value) => select('homeworkValue', value)"></tag-group>
        <tag-group title="质量" :data="quality" :select-string="qualityValue" @select="(value) => select('qualityValue', value)"></tag-group>
      </div>

      <h1 class="title">课程评价</h1>

      <div class="content-wrapper">
        <textarea class="content" ref="content" v-model="content" @click.prevent.stop="focus" placeholder="添加对该课程的相关评论"></textarea>
      </div>

      <ul class="tip-wrapper">
        <li class="tip-item" v-for="item in randomStringList" @click="addTip(item)">
          {{ item }}
        </li>
      </ul>

      <h2 class="change" @click.prevent.stop="change">换一换</h2>

      <div class="anonymous-wrapper" @click="anonymous">
        <div class="checkbox" :class="{ selected: isAnonymous === 1 }"></div>
        <span class="text">匿名</span>
      </div>

      <!-- 底部button -->
      <footer-button title="提交" @click="submit"></footer-button>
    </div>

    <div class="loading-wrapper" v-show="!showFlag">
      <loading></loading>
    </div>

    <confirm ref="confirm" text="是否确认提交" confirmBtnText="提交" @confirm="confirm"></confirm>
  </div>
</template>

<script>
import CourseHeader from 'components/course-header/course-header'
import FooterButton from '@/base/footer-button/footer-button'
import TagGroup from '@/base/tag-group/tag-group'
import Confirm from '@/base/confirm/confirm'
import Loading from '@/base/loading/loading'

import { mapGetters } from 'vuex'

import { getEvaluatedInfo, postEvaluate } from 'api/evaluate'
import { ERR_OK } from 'api/config'

const ROLLCALL = ['签到', '点名', '不点名不签到'] // 点名
const ASSESSMENT = ['论文', '考试', '其他'] // 考核
const HOMEWORK = ['无作业', '有作业'] // 作业
const QUALITY = ['很赞', '一般', '糟糕', '没听'] // 质量

const STRING_LIST = ['给分很高', '给分很低', '老师认真', '老师敷衍', '作业频繁', '作业量大', '课时冗长', '按时下课', '教学有趣', '授课死板', '理论为主', '实践性强', '内容很水', '内容太难', '颇有收获', '混个学分']
const RANDOM_LIST_COUNT = 4

export default {
  data () {
    return {
      rollcallValue: '',
      assessmentValue: '',
      homeworkValue: '',
      qualityValue: '',
      content: '',
      randomStringList: this._random(STRING_LIST),
      isAnonymous: 0,
      showFlag: false
    }
  },
  created () {
    this.rollcall = ROLLCALL
    this.assessment = ASSESSMENT
    this.homework = HOMEWORK
    this.quality = QUALITY

    this._getEvaluatedInfo()
  },
  methods: {
    select (key, value) {
      this[key] = value
    },
    focus () {
      this.$refs.content.focus()
    },
    change () {
      this.randomStringList = this._random(STRING_LIST)
    },
    addTip (item) {
      if (this.content.trim()) {
        this.content += ` ${item}`
      } else {
        this.content = item
      }
    },
    anonymous () {
      if (this.isAnonymous === 0) {
        this.isAnonymous = 1
      } else {
        this.isAnonymous = 0
      }
    },
    submit () {
      this.$refs.confirm.show()
    },
    confirm () {
      postEvaluate(this.userId, this.course, {
        'rollcall_way': this.rollcallValue,
        'assessment_way': this.assessmentValue,
        'course_assignment': this.homeworkValue,
        'course_quality': this.qualityValue,
        'evaluate_content': this.content,
        'is_anonymous': this.isAnonymous
      }).then((res) => {
        if (res.status === ERR_OK) {
          this.$router.push('/') // TODO 回到首页，是否添加一个弹框
        }
      })
    },
    _getEvaluatedInfo () {
      getEvaluatedInfo(this.userId, this.course).then((res) => {
        if (res.status === ERR_OK) {
          this.rollcallValue = res.data.rollcall_way || ''
          this.assessmentValue = res.data.assessment_way || ''
          this.homeworkValue = res.data.course_assignment || ''
          this.qualityValue = res.data.course_quality || ''
          this.content = res.data.evaluate_content || ''
          this.isAnonymous = res.data.is_anonymous || 0
          this.showFlag = true
        }
      })
    },
    _random (list) {
      let ret = []
      let length = list.length

      for (let i = 0; i < RANDOM_LIST_COUNT; i++) {
        ret.push(list[Math.floor(Math.random() * length)])
      }

      return ret
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'course'
    ])
  },
  components: {
    CourseHeader,
    FooterButton,
    TagGroup,
    Confirm,
    Loading
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.evaluate
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: #fff
  text-align: center
  font-size: 0
  .tag-group-wrapper
    padding-top: 0.72rem
  .title
    margin-bottom: 0.36rem
    text-align: center
    font-size: $font-size-medium-x
    color: $color-text-d
  .content-wrapper
    padding: 0 0.7rem
    font-size: 0
    .content
      width: 100%
      height: 2.04rem
      box-sizing: border-box
      padding: 0.24rem 0.3rem
      font-size: $font-size-medium-x
      line-height: 0.32rem
      border: 0.02rem solid $color-border-green
      border-radius: $border-radius-s
      &::placeholder
        color: $color-text-l
  .tip-wrapper
    display: flex
    padding: 0 0.7rem
    margin: 0.4rem 0 0.2rem 0
    justify-content: space-between
    .tip-item
      height: 0.48rem
      line-height: 0.44rem
      box-sizing: border-box
      padding: 0 0.12rem
      text-align: center
      font-size: $font-size-medium-x
      color: $color-border-green
      border: 0.02rem solid $color-border-green
      border-radius: $border-radius-s
  .change
    display: inline-block
    margin: 0 auto
    padding: 0.2rem 0.4rem
    text-align: center
    font-size: $font-size-small
    color: $color-border-green
  .anonymous-wrapper
    display: flex
    align-items: center
    width: 1.5rem
    height: 0.32rem
    margin-left: 0.52rem
    padding: 0.2rem 0 0.2rem 0.2rem
    .checkbox
      width: 0.24rem
      height: 0.24rem
      margin-right: 0.2rem
      box-sizing: border-box
      border: 0.02rem solid $color-border-green
      border-radius: $border-radius-s
      &.selected
        background: $color-border-green
    .text
      line-height: 0.32rem
      font-size: $font-size-medium-x
  .loading-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
