<template>
  <div class="navbar">
    <div class="left_item_container" @click="navigateToChat">
      <div class="navbar_left_icon">
        <vs-icon icon="home"></vs-icon>
      </div>
      <div class="navbar_title">ZhieasyCloudChat</div>

    </div>
    <div class="right_item_container">
      <vs-dropdown>
        <!--        <vs-avatar color="#26302a" text-color="rgb(246, 190, 16)"/>-->
        <vs-avatar
            src="https://th.bing.com/th/id/R.b4839f9c3eb4bbc80de06ceaf2b6966b?rik=mDdSYeoiUGt1bA&riu=http%3a%2f%2f96845.com%2fuploads%2fallimg%2f221112%2f1-221112103926439.jpg&ehk=0P67BL1puo7MvsCwPDAD7T7iHwPpHDNFBF0N8%2fi%2fg28%3d&risl=&pid=ImgRaw&r=0"/>
        <vs-dropdown-menu>
          <vs-dropdown-item style="width: 60px;" @click="demo">
            测试
          </vs-dropdown-item>
          <vs-dropdown-item style="width: 60px;" @click="logout">
            退出
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NavBar',
  data() {
    return {}
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
      this.$router.push({path: '/login'})
    },
    demo() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      console.log(baseUrl)
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
  border-right: 1px solid #c7c7c7;
}

.navbar_title {
  margin-left: 20px;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
}

.right_item_container {
  margin-right: 20px;
}
</style>
