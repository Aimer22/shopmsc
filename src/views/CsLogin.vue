<template>
  <el-form class="login" label-width="50px" :model="form" :rules="rules" ref="login" size="small">
    <h1 class="heading">用户登录</h1>

    <el-form-item label="账号" prop="username" suffix-icon>
      <el-input v-model="form.username"/>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" show-password v-model="form.password" />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="checked1">自动登录</el-checkbox>
      <el-checkbox v-model="checked2">记住密码</el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button type="danger">注册</el-button>
    </el-form-item>
    
  </el-form>
</template>

<script>
export default {
  data(){
    // 自定义验证账号，字母开头，后面接字母数字下划线
    const checkusername = ( rule, value, callback) => {
      if(!/^[a-zA-Z]\w+$/.test(value)){
        callback( new Error(rule.message) )
      }else{
        // 参数为空，表示验证通过
        callback()
      }
    }
    return {
      form:{},
      rules:{
        username:[
          { required: true, message: '请输入账号名'},
          { min: 3, max: 20, message: '长度在3-20之间'},
          // 自定义规则
          { validator: checkusername, message: '字母数字下划线组成'}
        ],
        password:[
          { required: true, message: '请输入密码'},
          { min: 6, message: '至少6位数字'}
        ]
      },
      checked1: false,
      checked2: false
    }
  },
  methods:{
    onSubmit(){
      this.$refs.login.validate( (valid) => {
        if(valid){
          // console.log('验证成功');
          this.$http.post('admin/login', this.form).then(res => {
            // 判断是否有报错
            if(res.err > 0){
              this.$message.error( res.desc );
            }else{
              // 保存用户信息到vuex
              this.$store.commit('saveUserInfo', res.result)
              // 将返回的token存入本地
              localStorage.setItem('CS-Token', res.result.token)
              // 跳转至控制台
              this.$router.replace('/control')
            }
          })
        }
      })
    }
  },
  /* computed:{
    if(checked2){
      console.log(username.value);
    }
  } */
}
</script>

<style lang='less' scope>
  .login{
    position: fixed;
    width: 300px;
    padding: 25px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .2);
    color: aliceblue;

    .heading{
      text-align: center;
      margin-bottom: 20px;
      color: #ea7d7d;
    }
  }
</style>
