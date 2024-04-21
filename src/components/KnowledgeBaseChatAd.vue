<template>
  <div class="main_container">
    <div class="bigTitle">
      知识库问答
    </div>
    <div class="list_container">
      <div class="list_item">
        <vs-icon icon="arrow_right" class="icon_style"></vs-icon>
        <div class="item_title">询问您的文件，获取所需信息</div>
      </div>
      <div class="list_item">
        <vs-icon icon="arrow_right" class="icon_style"></vs-icon>
        <div class="item_title">开启一条线索，揭示更深层次的知识</div>
      </div>
      <div class="list_item">
        <vs-icon icon="arrow_right" class="icon_style"></vs-icon>
        <div class="item_title">选择文本等，接受人工智能分析</div>
      </div>
      <div class="list_item">
        <vs-icon icon="arrow_right" class="icon_style"></vs-icon>
        <div class="item_title">跨文档询问，提升搜索效率</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "KnowledgeBaseChatAd",
  computed: {},
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
  width: 100%;
  height: 100%;
  position: relative;
  font-family: Alimama ShuHeiTi;
}

.bigTitle {
  color: #4B70E2;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
}

.list_container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}

.list_item {
  border-radius: .75rem;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: rgba(101, 118, 219, .1);
  color: #4B70E2;
}

.icon_style {
  color: gray;
  margin-left: 4px;
}

.item_title {
  margin-left: 4px;
}
</style>
