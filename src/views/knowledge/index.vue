<template>
  <div class="main_container">
    <div class="file_manage_container">
      <file-manage></file-manage>
    </div>
    <div class="knowledge_chat_container">
      <knowledge-chat></knowledge-chat>
    </div>
  </div>
</template>

<script>
import FileManage from "@/components/FileManage.vue";
import KnowledgeChat from "@/components/KnowledgeChat.vue";

export default {
  name: 'KnowledgePlace',
  components: {KnowledgeChat, FileManage},
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style lang="css" scoped>
.main_container {
  display: flex;
}

.file_manage_container {
  height: 100%;
  width: 50%;
  border-right: 1px solid #c7c7c7;
}

.knowledge_chat_container {
  width: 50%;
  height: 100%;
}
</style>
