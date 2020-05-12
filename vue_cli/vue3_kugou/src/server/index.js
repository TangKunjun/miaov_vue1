import axios from 'axios'
import store from '@/store'

let oneLeve = axios.create({
  responseType: 'json',

  transformRequest(data){
    console.log(data, 2)
    // 发送请求
    store.commit('updatedIsLoading',true)
    return data;
  },

  transformResponse(data){  // 拦截
    console.log(data)
    store.commit('updatedIsLoading', false)
    let o = {}
    if(data.list) {
      o.data = data.list;
      o.origin = 'singer'
    }else if(data.banner){
      o.data = data.data;
      o.banner = data.banner
      o.origin = 'new-song'
    }else if(data.rank){
      o.data = data.rank.list;
      o.origin = 'rank'
    }else if(data.plist){
      o.data = data.plist.list.info;
      o.origin = 'plist'
    }else if(data.singers){
      o.data = data.singers.list.info;
      o.origin = 'singers-list'
    }else if(data.songs){
      o.data = data.songs.list;
      o.info = data.info;
      o.origin = 'singers-info'
    }
    return o;
  }
})

// 获取banner和新歌
export const getNewSongs = (miaov) => {
  console.log(miaov, 1)
  return oneLeve('/v1/?json=true', { data: miaov})
}

// 获取排行数据
export const getRankList = () => {
  return oneLeve('/v1/rank/list?json=true')
}
// 获取歌单数据
export const getPlist = () => {
  return oneLeve('/v1/plist/index?json=true')
}

// 获取歌手分类数据
export const getSingers = () => {
  return oneLeve('/v1/singer/class?json=true')
}

// 根据歌手分类id，获取歌手分类歌手

export const getSingerList = (params={classid:''}) => {
  return oneLeve(`/v1/singer/list/${params.classid}?json=true`)
}

// 根据歌手id，获取歌手歌曲

export const getSingerInfo = (params = { singerid: '' }) => {
  return oneLeve(`/v1/singer/info/${params.singerid}?json=true`)
}