<template>
  <div class="all">
    <div class="left">
      <!-- 左边的内容(到时候填充图片) -->
      <h1 class="line1">Chat with documents.
        Get instant answers with
        cited sources.</h1>
      <p class="line2">ChatDOC is a ChatGPT-based file-reading assistant that can quickly
        extract, locate and summarize information from documents.</p>
      <img src="./picture/login.png" alt="" class="img1">
    </div>
    <div class="right">
      <!-- 底下是登录的接口 -->
      <button class="signup">sign up</button>
      <div class="login">
        <h1 class="head">Welcome to ZhiEasy!</h1>
        <div class="login-inner">
          <input v-model="form.userName" placeholder="Enter your email" class="usernameinput">
          <input v-model="form.password" placeholder="Enter your password" class="passwordinput">
        </div>
        <div class="login_inner1">
          <input type="radio" class="select1">remember me
          <button class="login_button">continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      form: {
        userName: null,
        password: null
      }
    }
  }
}
</script>

<style lang="css" scoped>
.all {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  min-height: 100vh
}

.left {
  width: 55%;
  background-color: #ecf3ff;
}

.right {
  width: 45%;
  background-color: #fafcff;
}

.login {
  width: 60%;
  height: 50%;
  margin-bottom: 45%;
  margin-left: 25%;
  margin-top: 20%;
}

.login-inner {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: auto auto auto 10%;
  align-items: center;
}

.head {
  margin: auto;
  text-align: center;
}

.usernameinput {
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
  border-radius: 5px;
}

.passwordinput {
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
  border-radius: 5px;
}

.login_inner1 {
  margin-left: 10%;
  width: 80%;
  height: 10%;
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.select1 {
  margin-left: 10%;
}

.login_button {
  width: 80%;
  height: 35px;
  margin-top: 5%;
  border-radius: 5px;
  margin-left: 10%;
}

.signup {
  margin-left: 80%;
  margin-top: 5%;
  width: 10%;
  height: 5%;
  border-radius: 10px;
}

.left .line1 {
  margin-left: 20%;
  width: 60%;
  margin-top: 5%;
  font-size: 60px;
  text-align: center;
}

.left .line2 {
  margin-left: 20%;
  width: 60%;
  font-size: 20px;
  text-align: center;
}

.img1 {
  margin-top: 5%;
  display: flex;
  width: 80%;
  height: 50%;
  margin-left: 10%;
}
</style>
