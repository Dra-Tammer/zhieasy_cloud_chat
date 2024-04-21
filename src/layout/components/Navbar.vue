<template>
  <div class="navbar">
    <div class="left_item_container" @click="navigateToChat">
      <div class="navbar_left_icon">
        <vs-icon icon="home"></vs-icon>
      </div>
      <div class="navbar_title">Zhieasy Artemis</div>

    </div>
    <div class="right_item_container">
      <div class="user_container">{{ username }}</div>
      <div>
        <vs-dropdown>
          <!--        <vs-avatar color="#26302a" text-color="rgb(246, 190, 16)"/>-->
          <vs-avatar color="rgb(31, 116, 255)" text-color="white"/>
          <vs-dropdown-menu>
            <vs-dropdown-item style="width: 60px;" @click="logout">
              退出
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NavBar',
  data() {
    return {
      username: '',
    }
  },
  mounted() {
    this.username = localStorage.getItem('user')
  },
  methods: {
    navigateToChat() {
      if (this.$route.path !== '/chat') {
        this.$router.push('/chat');
      }
    },
    logout() {
      this.$vs.dialog({
        color: 'primary',
        title: 'Logout',
        text: '退出当前账号',
        accept: this.acceptLogout,
        acceptText: '确认'
      })
    },
    acceptLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('activeKnowledgeName')
      localStorage.removeItem('sessionId')
      this.$router.push({path: '/login'})
      this.$vs.notify({
        color: 'primary',
        title: '退出',
        text: `用户退出登录`,
        position: 'top-center'
      })
    }

  }
}
</script>

<style lang="css" scoped>
.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left_item_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar_left_icon {
  cursor: pointer;
  width: 60px;
  text-align: center;
  height: 80%;
  line-height: 0px;
  border-right: 1px solid #000000;
}

.navbar_title {
  color: #00269a;
  margin-left: 20px;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
}

.right_item_container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user_container {
  text-align: center;
  height: 20px;
  line-height: 16px;
  margin-right: 20px;
  font-weight: bold;
}
</style>
