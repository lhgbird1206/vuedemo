<template>
    <div class="login-container">
        <el-form class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                 label-position="left">
            <div class="title-container">
                <h3 class="title">登录</h3>
            </div>
            <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="icon iconfont">&#xe603;</i>
        </span>
                <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" placeholder="请输入用户名"/>
            </el-form-item>

            <el-form-item prop="password">
        <span class="svg-container">
          <i class="icon iconfont">&#xe614;</i>
        </span>
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" auto-complete="on" placeholder="请输入密码"/>
                <span class="show-pwd" @click="showPwd">
          <i class="icon iconfont">&#xe60d;</i>
        </span>
            </el-form-item>

            <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

        </el-form>

    </div>
</template>

<script>
    export default {
        name: 'Login',
        components: {},
        data() {
            const validateUsername = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('密码不能为空'))
                } else {
                    callback()
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        console.log(this);
                        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                            this.loading = false;
                            debugger;
                            this.$router.push({path: '/'})
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>