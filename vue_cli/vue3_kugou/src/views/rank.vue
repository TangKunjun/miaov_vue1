<template>
    <div class="song-list">
        <mt-cell class='song-cell'
                 :key="item.hash" v-for="item in list" :title="item.rankname"  is-link>
            <img slot="icon" :src="item.imgurl" alt="">
        </mt-cell>
    </div>
</template>

<script>
    import {getRankList} from '@/server';
    export default {
        name: "rank",
        data(){
            return {
                size:400,
                list: []
            }
        },
        async created(){
            let {data} = await getRankList({laoding:2});
            this.list = data.data.map(v => {
                v.imgurl = v.imgurl.replace("{size}", 400);
                return v;
            });
            console.log(this.list)
        }
    }
</script>

<style scoped>
    img {
        width: 2rem;
        height: 2rem;
    }
    .rank-cell {
        padding: 5px 0;

    }
    .song-cell {
        padding: 0.2rem 0;
    }
</style>