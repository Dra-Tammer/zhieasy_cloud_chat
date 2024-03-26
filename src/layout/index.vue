<template>
  <div class="main_container">
    <div class="navbar_container">
      <div class="left_item_container">
        <div class="navbar_left_icon">
          <vs-icon icon="menu"></vs-icon>
        </div>
        <div class="navbar_title" @click="$router.push({path:'/chat'})">ZhieasyCloudChat</div>
      </div>
      <div class="right_item_container">
        <vs-avatar color="#26302a" text-color="rgb(246, 190, 16)"/>
<!--        <vs-icon icon="logout"></vs-icon>-->
      </div>
    </div>
    <div class="sidebar_container">

    </div>
    <div class="app_main_container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      llm_select: 0,
      chat_mode_select: 0,
      prompt_template_select: 0,
      llm_options: [
        {text: 'qwen-api(Running)', value: 0},
      ],
      chat_mode_options: [
        {text: 'LLM对话', value: 0},
        {text: '知识库问答', value: 1}
      ],
      prompt_template_options: [
        {text: 'default', value: 0}
      ],
      choose_number: 0.70
    }
  },
  mounted() {
  },
  methods: {},
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
