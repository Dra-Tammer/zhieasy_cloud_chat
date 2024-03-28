<template>
  <div class='container' id='container'>
    <div class="form-container sign-up-container">
      <!-- 注册 -->
      <form action="#">
        <h1>Chat with ZhiEasy</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="iconfont icon-qq"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weibo-copy"></i></a>
          <a href="#" class="social"><i class="iconfont icon-github"></i></a>
        </div>
        <span>其他注册方式</span>
        <input type="text" placeholder="用户名">
        <input type="password" placeholder="密码">
        <input type="email" placeholder="邮箱">
        <button id="send_code">发送验证码</button>
        <input type="email" placeholder="验证码">
        <button>注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">

      <!-- 登陆 -->
      <form action="#">
        <h1>Welcome to ZhiEasy!</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="iconfont icon-qq"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weibo-copy"></i></a>
          <a href="#" class="social"><i class="iconfont icon-github"></i></a>
        </div>
        <span>其他登录方式</span>
        <input type="text" placeholder="用户名">
        <input type="password" placeholder="密码">
        <a href="#">忘记密码？</a>
        <button v-on:click="Userlogin()">登陆</button>
      </form>
    </div>
    <!-- 侧边栏内容 -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有帐号？</h1>
          <p>创建属于你的知识库吧</p>
          <button class='ghost' id="signIn">登陆</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有帐号？</h1>
          <p>注册一个属于你的账号吧</p>
          <button class='ghost' id="signUp">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>


<!--<script>-->
<script>
  export default {
  name: 'UserLogin',
  data() {
  return {
  form: {
  userName: '',
  password: ''
}
}
},
  methods:{
  Userlogin(){
  this.axios.post('http://172.24.34.83:11434/user/login',this.form).then((resp) =>{
  let data = resp.data
  if(data.success){
  this.form = {};
  this.$router.push({path:'/Home'})
}
})
}
},
}
</script>

<style src="./style.css"></style>
<style src="./iconfont/iconfont.css"></style>



