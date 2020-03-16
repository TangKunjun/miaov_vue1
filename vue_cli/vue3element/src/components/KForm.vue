<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "KForm",
        provide() {  // 把自己当作参数传递下去， 子代可以直接获取到
          return {
              form: this
          }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>