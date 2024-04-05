<template>
  <div class="body">
    <div class="shell">
      <!--    登录界面-->
      <div class="container a-container" id="a-container">
        <form action="" method="" class="form" id="b-form">
          <h2 class="form_title title">登入账号</h2>
          <span class="form_span">请使用用户名和密码登录</span>
          <input type="text" class="form_input" placeholder="Username" v-model="form.username">
          <input type="text" class="form_input" placeholder="Password" v-model="form.password">
          <button class="form_button button submit" @click="acceptLogin()">登录</button>
        </form>
      </div>
      <!--    注册界面-->
      <div class="container b-container" id="b-container">
        <form action="" method="" class="form" id="a-form">
          <h2 class="form_title title">创建账号</h2>
          <span class="form_span">请使用用户名和密码登录</span>
          <input type="text" class="form_input" placeholder="Username" v-model="form.username">
          <input type="text" class="form_input" placeholder="Password" v-model="form.password">
          <button class="form_button button submit" @click="acceptRegister()">注册</button>
        </form>
      </div>
      <!--    更换界面-->
      <div class="switch" id="switch-cnt">
        <div class="switch_circle"></div>
        <div class="switch_circle switch_circle-t"></div>
        <div class="switch_container" id="switch-c1">
          <h2 class="switch_title title" style="letter-spacing: 0;">Welcome to Zhieasy!</h2>
          <p class="switch_description description">Start to communicate with Zhieasy</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
        </div>

        <div class="switch_container is-hidden" id="switch-c2">
          <h2 class="switch_title title" style="letter-spacing: 0;">Join Zhieasy</h2>
          <p class="switch_description description">Already have an account？</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {userLogin, userRegister} from "@/api/user";

export default {
  name: 'UserLogin',
  data() {
    return {
      form: {
        username: 'userygwh',
        password: '200306'
      },
      login_sign: false,
      regist_sign: false,
    }
  },
  mounted() {
    // 这里是将所有含有这个的元素放入allButtons当中
    const allButtons = document.querySelectorAll(".submit");
    // 循环遍历，为每一个按钮添加监听，当被点击的时候，执行getButtons函数
    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener("click", this.getButtons);
    }
  },
  methods: {
    login_randomCenter() {
      this.$vs.notify({title: '成功', text: '用户登录成功', position: 'top-center'})
    },
    regist_randomCenter() {
      this.$vs.notify({title: '成功', text: '用户注册成功', position: 'top-center'})
    },
    login_reject_randomCenter() {
      this.$vs.notify({title: '错误', text: '用户名或密码错误', position: 'top-center', color: "warning"})
    },
    regist_reject_randomCenter() {
      this.$vs.notify({title: '错误', text: '用户名或密码格式错误', position: 'top-center', color: "warning"})
    },
    // 阻止按钮的默认行为
    getButtons(e) {
      e.preventDefault();
    },
    // 下面就是一旦触发了点击，就执行changeForm函数，隐藏部分内容切换显示
    changeForm() {
      const switchCtn = document.querySelector("#switch-cnt");
      const switchCircle = document.querySelectorAll(".switch_circle");
      const switchC1 = document.querySelector("#switch-c1");
      const switchC2 = document.querySelector("#switch-c2");
      const aContainer = document.querySelector("#a-container");
      const bContainer = document.querySelector("#b-container");

      switchCtn.classList.add("is-gx");
      setTimeout(() => {
        switchCtn.classList.remove("is-gx");
      }, 1500);
      switchCtn.classList.toggle("is-txr");
      switchCircle[0].classList.toggle("is-txr");
      switchCircle[1].classList.toggle("is-txr");

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z");

      this.switchState = this.switchState === 'login' ? 'signup' : 'login';
    },
    acceptLogin() {
      let username = this.form.username;
      let password = this.form.password;
      userLogin(username, password).then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('sessionId', res.data.data.sessionId)
          this.login_randomCenter();
          this.$router.push({path: '/chat'})
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`
          })
          this.login_reject_randomCenter();
        }
      })
    },
    acceptRegister() {
      let username = this.$data.form.username;
      let password = this.$data.form.password;
      userRegister(username, password).then((res) => {
        if (res.data.code === 200) {
          this.regist_randomCenter();
          window.location.reload();
        } else {
          this.regist_reject_randomCenter();
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`
          })
        }
      })
    },
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.login_alert {
  width: 60%;
  text-align: center;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}

.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
  margin-top: 30px;
  margin-bottom: 12px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
}

.title {
  font-size: 29px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>



