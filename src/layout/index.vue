<template>
  <div class="main_container">
    <div class="navbar_container">
      <nav-bar></nav-bar>
    </div>
    <div class="sidebar_container">
      <side-bar></side-bar>
    </div>
    <div class="app_main_container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from "@/layout/components/Sidebar.vue";
import NavBar from "@/layout/components/Navbar.vue";

export default {
  name: 'AppLayout',
  components: {NavBar, SideBar},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="css" scoped>
.main_container {
  display: grid;
  height: 100vh;
  grid-template-rows: 6% 94%;
  grid-template-columns: 18% 82%;
  background-color: #ffffff;
}

.navbar_container {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  border-bottom: 1px solid #c7c7c7;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar_container {
  grid-row: 2 / -1;
  grid-column: 1 / 2;
  border-right: 1px solid #c7c7c7;
  background-color: #ffffff;
}

.app_main_container {
  grid-row: 2 / -1;
  grid-column: 2 / -1;
}
</style>
