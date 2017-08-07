<template>
  <div class="comment-list">
    <ul>
      <li class="comment-item" v-for="comment in comments">
        <div class="avatar-wrapper">
          <avatar :is-anonymous="comment.is_anonymous === 1" :src="comment.headimgurl"></avatar>
        </div>

        <div class="content-wrapper">
          <h1 class="name">{{ comment.nickname }}</h1>
          <h2 class="time">{{ `${comment.evaluate_year}年${comment.evaluate_month}月${comment.evaluate_day}日` }}</h2>
          <p class="content">{{ comment.evaluate_content }}</p>

          <div class="approval" :class="{ approvaled: comment.is_approval === 1 }" @click="handleApproval(comment)">
            <i class="icon-thumb_up"></i>
            <span class="count">{{ comment.approval_count }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from 'components/avatar/avatar'

export default {
  props: {
    comments: {
      type: Array,
      default: null
    }
  },
  methods: {
    handleApproval (comment) {
      let isApproval = comment.is_approval
      let index = comment.index
      let commentId = comment.comment_id

      if (isApproval === 1) { // 已经点赞 ---> 取消点赞
        this.$emit('disapproval', { index, commentId })
      } else { // 点赞
        this.$emit('approval', { index, commentId })
      }
    }
  },
  components: {
    Avatar
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.comment-list
  .comment-item
    display: flex
    padding: 0.28rem 0.08rem 0.22rem
    border-bottom: 0.02rem solid $color-border
    .avatar-wrapper
      flex: 0 0 0.58rem
      width: 0.58rem
      height: 0.58rem
      margin-right: 0.2rem
    .content-wrapper
      flex: 1
      position: relative
      box-sizing: border-box
      padding: 0.04rem 0.12rem 0 0
      font-size: 0
      .name
        font-size: $font-size-small
        color: $color-text-d
      .time
        margin: 0.12rem 0 0.24rem
        font-size: $font-size-smallest
        color: $color-text-l
      .content
        font-size: $font-size-small
        color: $color-text-m
      .approval
        position: absolute
        top: 0
        right: 0.12rem
        height: 0.4rem
        color: $color-text-l
        &.approvaled
          color: $color-border-green
        .icon-thumb_up, .count
          display: inline-block
          vertical-align: middle
          line-height: 0.4rem
        .icon-thumb_up
          margin-right: 0.12rem
          font-size: $font-size-medium-x
        .count
          font-size: $font-size-small
</style>
