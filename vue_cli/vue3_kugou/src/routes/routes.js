
import newStrong from  "@/views/NewStrong"
import rank from  "@/views/rank"
import plist from  "@/views/Plist"
import singer from  "@/views/Singer"
import navBar from  "@/components/navBar"


export let  routes = [

    {
      path: '/',
      name: 'NewStrong',
      title: "新歌",
      components: {
        nav: navBar,
        default: newStrong
      }
    },
    {
      path: '/rank',
      name: 'rank',
      title: "排行",
      components: {
        nav: navBar, default: rank
      }
    },
    {
      path: '/plist',
      name: 'plist',
      title: "歌单",
      components: {
        nav: navBar, default: plist
      }
    },
    {
      path: '/singer',
      name: 'singer',
      title: "歌手",
      components: {
        nav: navBar, default: singer
      }
    },
];
