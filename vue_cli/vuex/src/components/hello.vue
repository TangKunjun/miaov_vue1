<template>
    <div>
        hello,一起学习vue
        <p>{{$store.state.count}}</p>
        <button @click="changeConut">改变状态</button>
    </div>
</template>

<script>
export default {
    methods: {
        changeConut() {
            this.$store.commit("updateCount", {
                add: 10
            })
        }
    },
}
</script>