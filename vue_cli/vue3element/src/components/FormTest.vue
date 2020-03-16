<template>
    <div>
        <el-form label-width="80px" :model="model"  :rules="rules" ref="loginForm">
           <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username"></el-input>
           </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="model.password"></el-input>
           </el-form-item>
            <el-form-item >
                <el-button @click="submitForm('loginForm')">
                    提交
                </el-button>
           </el-form-item>
        </el-form>



        <h2>KForm</h2>
        <k-form :model="model" :rules="rules">
            <K-form-item label="用户名" prop="username">
                <K-input v-model="model.username"></K-input>
            </K-form-item>
            <K-form-item label="密码" prop="password">
                <K-input v-model="model.password" type="password"></K-input>
            </K-form-item>
        </k-form>
    </div>

</template>

<script>
    import KInput from "@/components/KInput.vue";
    import KFormItem from "@/components/KFormItem.vue";
    import KForm from "@/components/KForm.vue";
    export default {
        components: {
            KInput,
            KFormItem,
            KForm
        },
        name: "FormTest",
        data() {
            return {
                model: {
                    username: '',
                    password: ''
                },
                rules: {
                            username: [{required: true, message: '请输入用户名'}],
                            password: [{required: true, message: '请输入密码'}],
                       }

            }
        },
        methods: {
            submitForm(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        alert("请求登陆")
                    } else {
                        alert("校验失败")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>