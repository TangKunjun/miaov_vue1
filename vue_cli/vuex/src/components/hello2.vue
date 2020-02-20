<template>
    <div>
        hello2,一起学习vue
         <p>{{n}}</p>
         <p>{{m}}</p>
         <button @click="changeCount">点击改变状态</button>
          <div>{{$store.getters.totals}}</div>
    </div>
</template>

<script>
export default {
    data() {   // 状态改变 它并不会改变
        return {
            n: this.$store.state.count
        }
    },
    computed: {
        m() {
            return this.$store.state.count
        }
    },
    methods: {
        changeCount() {
            this.$store.commit('updateCount', {
                add: 15
            })
            // this.$store.dispatch("updateCountAction", {   // 触发actions
            //     add: 15
            // })
        }
    },
}
</script>
