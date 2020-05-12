<template>
    <div class="song-list">
        <mt-cell class='song-cell'
                 :key="item.hash" v-for="item in list" :title="item.classname"  is-link>
            <img slot="icon" :src="item.imgurl" alt="">
        </mt-cell>
    </div>
</template>

<script>
    import {getSingers} from "../server";

    export default {
        name: "Singer",
        data() {
            return {
                list: []
            }
        },
        async created() {
            let {data} = await getSingers();
            this.list = data.data
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