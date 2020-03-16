<template>
    <div>
        <input :type="type" :value="value" @input="onInput">
    </div>
</template>

<script>
    export default {
        name: "KInput",
        methods: {
            onInput(e) {
                // this.cvalue = e.target.value;
                this.$emit('input', e.target.value);

                // 发送校验事件
                this.$parent.$emit("validate")
            }
        },
        // data: function() {
        //     return {
        //         cvalue: this.value
        //     }
        // },
        // watch: {
        //   value(newValue, oldValue) {
        //       console.log(newValue)
        //       this.cvalue = newValue;
        //   }
        // },
        compile: {

        },
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            }
        },
    }
</script>

<style scoped>

</style>