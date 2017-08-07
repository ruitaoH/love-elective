<template>
  <div class="search">
    <search-header ref="searchHeader" @click="search" @setFlag="setShortcutShow"></search-header>

    <div class="shortcut-wrapper" v-show="shortcutShow">
      <scroll ref="shortcut"
              class="shortcut"
              :data="shortcut"
              :beforeScroll="beforeScroll"
              @beforeScroll="blurInput">
        <div>
          <!-- hot search -->
          <div class="hot-search-wrapper">
            <split text="热门搜索"></split>
            <tag-container :margin-right-rem="0.2" v-if="hotSearch.length">
              <li class="tag-item" v-for="item in hotSearch" @click="selectHotTag(item)">
                {{ item.course_name }}
              </li>
            </tag-container>

            <div class="hot-search-loading-wrapper" v-show="!hotSearch.length">
              <loading></loading>
            </div>
          </div>

          <!-- search history -->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearSearchHistory">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <ul>
              <li class="search-history-item" v-for="item in searchHistory" @click="selectSearchHistory(item)">
                <span class="text">{{ item }}</span>
                <span class="icon" @click.stop="deleteSearchHistory(item)">
                  <i class="icon-close"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>

    <!-- search result -->
    <div class="search-result-wrapper" v-show="!shortcutShow">
      <scroll class="search-result"
              :data="searchCourses"
              :beforeScroll="beforeScroll"
              @beforeScroll="blurInput">
        <div>
          <div class="padding">
            <div class="split-wrapper">
              <split text="搜索结果"></split>
            </div>

            <!-- search result list -->
            <course-list v-show="searchCourses.length > 0" @select="selectCourse" :courses="searchCourses" :isEvaluate="true" @click="evaluate"></course-list>

            <!-- no result -->
            <div class="no-result" v-show="!loadingShow && !searchCourses.length">
              <img class="img" src="./no-result.png" />
              <p class="text">未搜索到相关课程</p>
            </div>
          </div>
        </div>
      </scroll>

      <!-- loading -->
      <div class="loading-wrapper" v-show="loadingShow">
        <loading></loading>
      </div>
    </div>

    <!-- 二级路由: 课程详情 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import SearchHeader from 'components/search-header/search-header'
import Split from '@/base/split/split'
import TagContainer from '@/base/tag-container/tag-container'
import Scroll from '@/base/scroll/scroll'
import CourseList from 'components/course-list/course-list'
import Loading from '@/base/loading/loading'

import { getSearch, getHotSearch } from 'api/search'
import { ERR_OK } from 'api/config'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      hotSearch: [],
      searchCourses: [],
      shortcutShow: true,
      loadingShow: true,
      beforeScroll: true
    }
  },
  created () {
    this._getHotSearch()
  },
  methods: {
    blurInput () { // 用户滚动时关闭输入框
      this.$refs.searchHeader.blur()
    },
    setShortcutShow (flag) {
      if (flag) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
          this.searchCourses = []
        }, 20)
      }

      this.shortcutShow = flag
    },
    search (content) {
      this.loadingShow = true
      this.saveSearchHistory(content)
      getSearch(content).then((res) => {
        if (res.status === ERR_OK) {
          this.searchCourses = res.data.course_information
          this.loadingShow = false
        }
      })
    },
    selectCourse (course) {
      this.setCourse(course)
      this.$router.push(`/search/${course.course_teacher}/${course.course_name}`)
    },
    selectHotTag (item) { // 热搜 ---> 应该是设置query
      this.saveSearchHistory(item.course_name)
      this.$refs.searchHeader.setQuery(item.course_name)
    },
    selectSearchHistory (item) {
      this.$refs.searchHeader.setQuery(item)
    },
    evaluate (course) {
      this.setCourse(course)
      this.$router.push(`/search/${course.course_teacher}/${course.course_name}/evaluate`)
    },
    _getHotSearch () {
      getHotSearch().then((res) => {
        if (res.status === ERR_OK) {
          this.hotSearch = this._normalise(res.data)
        }
      })
    },
    _normalise (data) {
      return data.sort((a, b) => {
        return a.course_name.length - b.course_name.length
      })
    },
    ...mapMutations({
      'setCourse': 'SET_COURSE'
    }),
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  computed: {
    shortcut () {
      return this.hotSearch.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  components: {
    SearchHeader,
    Split,
    TagContainer,
    Scroll,
    CourseList,
    Loading
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.search
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: $color-background
  .shortcut-wrapper
    position: fixed
    width: 100%
    top: 1.24rem
    bottom: 0
    .shortcut
      height: 100%
      overflow: hidden
      .hot-search-wrapper
        position: relative
        min-height: 4rem
        margin: 0 auto
        padding: 0 0.7rem
        .tag-item
          height: 0.5rem
          line-height: 0.5rem
          padding: 0 0.3rem
          text-align: center
          font-size: $font-size-small
          color: $color-text-m
          background: $color-background-d
          border-radius: $border-radius-s
          margin-bottom: 0.26rem
        .hot-search-loading-wrapper
          position: absolute
          width: 100%
          top: 50%
          left: 0
          transform: translateY(-50%)
      .search-history
        margin: 0.3rem 0.7rem 0
        .title
          display: flex
          align-items: center
          height: 0.6rem
          font-size: $font-size-large
          color: $color-text-d
          .text
            flex: 1
          .clear
            extend-click()
        .search-history-item
          display: flex
          align-items: center
          height: 0.6rem
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .icon
            extend-click()
  .search-result-wrapper
    position: fixed
    top: 1.24rem
    bottom: 0
    left: 0
    right: 0
    .search-result
      height: 100%
      overflow: hidden
      .padding
        padding: 0 0.26rem 0.26rem
        .split-wrapper
          padding: 0 0.44rem
        .no-result
          margin: 1.16rem auto 0
          text-align: center
          font-size: 0
          .img
            width: 2.66rem
            height: 2.95rem
            margin-bottom: 0.6rem
          .text
            font-size: $font-size-large
            color: $color-text-m
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
