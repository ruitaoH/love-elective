import { loadSearch } from 'common/js/cache'

const state = {
  userId: -1,
  course: {},
  filterShow: false,
  filterShowType: '', // category、time...
  filters: {
    category: {
      tag: '类别',
      list: [
        { type: '综合', value: false },
        { type: '人文', value: false },
        { type: '自然', value: false },
        { type: '艺术', value: false }
      ]
    },
    time: {
      tag: '时间',
      list: [
        { type: '周一', value: false },
        { type: '周二', value: false },
        { type: '周三', value: false },
        { type: '周四', value: false },
        { type: '周五', value: false },
        { type: '周六', value: false },
        { type: '周日', value: false }
      ]
    },
    place: {
      tag: '地点',
      list: [
        { type: '东区', value: false },
        { type: '西区', value: false }
      ]
    },
    rollcall: {
      tag: '点名方式',
      list: [
        { type: '点名', value: false },
        { type: '签到', value: false },
        { type: '不点名不签到', value: false }
      ]
    },
    assessment: {
      tag: '考核方式',
      list: [
        { type: '论文', value: false },
        { type: '考试', value: false },
        { type: '其他', value: false }
      ]
    }
  },
  searchHistory: loadSearch()
}

export default state
