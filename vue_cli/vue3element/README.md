# 模仿elemen表单写form组件

分为3个组件KForm(爷)、KFormItem(父)、KInput(子)

KInput组件
```
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
            // }
        }
    </script>
```
由于该组件在父组件是插槽形式，无法用this.$emit传给父组件再传给爷组件，所以采用this.$parent.$emit形式传递事件

KFormItem
```
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
```
KFormItem主要负责校验，接收子组件传来的校验事件，并且通过注册获取到父组件的信息

KForm
```
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
```

使用
```
<h2>KForm</h2>
<k-form :model="model" :rules="rules">
    <K-form-item label="用户名" prop="username">
        <K-input v-model="model.username"></K-input>
    </K-form-item>
    <K-form-item label="密码" prop="password">
        <K-input v-model="model.password" type="password"></K-input>
    </K-form-item>
</k-form>
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
    }
</script>
```



