<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!--插槽-->
        <slot></slot>
        <!--错误信息-->
        <p v-if="error" style="color:red">{{error}}</p>
    </div>
</template>

<script>
    import Schema from "async-validator";
    export default {
        name: "KFormItem",
        inject: ['form'],  // 获取父组件注入的数据
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        data: function () {
            return {
                error: ''
            }
        },
        mounted: function () {
            // 监听一下校验事件
            this.$on("validate", this.validate)
        },
        methods:  {
            validate() {
                // 执行校验工作
                // 1、获取校验规则
                const rules = this.form.rules[this.prop];
                // 2、获取数据模型
                // console.log(this.form)
                const value = this.form.model[this.prop];

                // 3、校验对象
                const descriptor = {[this.prop]: rules};
                // 4、创建校验器
                const schema = new Schema(descriptor);
                // 5、校验
                schema.validate({[this.prop]: value}, errors => {
                    if (errors) {
                        this.error = errors[0].message;
                    } else {
                        this.error= "";
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>