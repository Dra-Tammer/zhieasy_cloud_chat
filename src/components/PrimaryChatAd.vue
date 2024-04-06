<template>
  <div>
    <div class="mainContainer">
      <div class="titleBox">
        <div class="title">
          <span>Zhieasy</span>
          <span style="color: #4B70E2;"> Knowledge</span>
          <span> Assistant </span>
        </div>
        <div class="titleContent">构建文档知识库，高效检索信息，准确回答问题</div>
      </div>
      <div class="detailContainer">
        <div class="mainContent">
        </div>
        <div class="mainContent">
        </div>
        <div class="mainContent">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PrimaryChatAd",
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
.mainContainer {
  width: 100%;
}

.title {
  width: 100%;
  text-align: center;
  font-family: Alimama ShuHeiTi;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.titleContent {
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.detailContainer {
  width: 100%;
  height: 500px;
  position: relative;
  background: #e6e6e6;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px dashed #cecece;
  padding: 48px;
  display: flex;
  justify-content: space-between;
}

.mainContent {
  width: 30%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: ;
}
</style>
