<template>
  <div id="app">
    <view-box>
      <x-header class="header" slot="header" title="网易" :left-options="{showBack: true, backText:'back'}">
        <div slot="right">搜索</div>
      </x-header>

      <sc :lock-y="true">
        <div  class="tab">
          <tab>
            <tab-item selected>推荐</tab-item>
            <tab-item>要闻</tab-item>
            <tab-item>游戏</tab-item>
            <tab-item>科技</tab-item>
            <tab-item>娱乐</tab-item>
            <tab-item>体育</tab-item>
            <tab-item>互联网</tab-item>
          </tab>
        </div>
      </sc>

      <scroller class="my_scroller" :on-refresh="refresh" :on-infinite="infinite" ref="myScroller">
        <swiper :list="swiperList" v-model="swiperIndex" :loop="true"></swiper>

        <marquee class="my_marquee">
          <marquee-item v-for="item in marqueeList">{{item.title}}</marquee-item>
        </marquee>

        <panel :list="dataList"></panel>
        <panel :list="moreData"></panel>
      </scroller>

      <tabbar slot="bottom">
        <tabbar-item>
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
            <span slot="label">推荐</span>
        </tabbar-item>
        <tabbar-item>
            <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import {ViewBox, XHeader, Tabbar, TabbarItem, Tab, TabItem, Scroller as sc, Swiper, Marquee, MarqueeItem, Panel} from "vux";

var refreshKey = ["A", "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B010"]

var key = 0;

var start = 0;
var end = 9;

var initloading = false;

var keyValue = refreshKey[key];
function getRefreshKey() {
    key++;
    if (key == refreshKey.length -1) {
        key = 0;
    }
    keyValue = refreshKey[key];
    return keyValue;
}

export default {
  name: 'app',
  components: {
      XHeader,
      ViewBox,
      Tabbar,
      TabbarItem,
      Tab,
      TabItem,
      sc,
      Swiper,
      Marquee,
      MarqueeItem,
      Panel
  },
    data() {
      return {
          swiperList: [],
          swiperIndex: 0,
          dataList: [],
          marqueeList: [],
          moreData: []
      }
    },
    created() {
      this.$jsonp("http://3g.163.com/touch/jsonp/sy/recommend/0-9.html").then(data => {
         this.swiperList =  data.focus.filter(item => !item.addata).map(item => {
            return {
                url: item.link,
                img: item.picInfo[0].url,
                title: item.title
            }
         });

         this.dataList =  data.list.filter(item => !item.addata).map(item => {
            return {
                title: item.title,
                src: item.picInfo[0].url,
                desc: item.digest,
                url: item.link
            }

         });

         this.marqueeList =  data.live.filter(item => !item.addata).map(item => {
              return {
                  title: item.title
              }
         })
          initloading = true;

      })
    },
    methods: {
        refresh() {
            getRefreshKey()
            this.$jsonp("http://3g.163.com/touch/jsonp/sy/recommend/0-9.html", {miss:'00',refresh: keyValue}).then(data => {

                this.dataList =  data.list.filter(item => !item.addata).map(item => {
                    return {
                        title: item.title,
                        src: item.picInfo[0].url,
                        desc: item.digest,
                        url: item.link
                    }
                });
                this.$refs.myScroller.finishPullToRefresh();

                this.$vux.toast.text("刷新成功", 'top')
            })
        },
        infinite() {

            if (!initloading) {
                this.$refs.myScroller.finishInfinite();
                return;
            }

            this.$jsonp("http://3g.163.com/touch/jsonp/sy/recommend/"+start+"-"+end+".html", {miss:'00',refresh: keyValue}).then(data => {

               var  dataList =  data.list.filter(item => !item.addata).map(item => {
                    return {
                        title: item.title,
                        src: item.picInfo[0].url,
                        desc: item.digest,
                        url: item.link
                    }
                });

                this.moreData.push(dataList);

                start+= 10;
                end = start+9;
                this.$refs.myScroller.finishInfinite();
            })
        }
    }
}
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  html,body{
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  #app{
    height: 100%;
    overflow: hidden;
    .header{position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      z-index: 999
    }
    .my_scroller{top: 90px}
    .loading-layer{padding-bottom: 90px}
    .tab{width: 1000px; margin-top: 46px;}
    .my_marquee{margin: 10px}
    .weui-media-box__hd, .weui-media-box__hd img{width: 102px;height: 78px;}
    .weui-media-box__bd{ height: 78px;}
  }
</style>
