<template>
  <div class="KnowledgeChatContainer">
    <div class="knowledgeTopEmptyBox"></div>
    <div class="charBoxContainer">


      <div class="chatBox">
        <div class="chatBoxTop">
          <div class="chatBoxTopLeftContainer">
            <vs-avatar/>
          </div>
          <div class="chatBoxTopRightContainer">
            <div class="chatQuestions">
              写出这份文件摘要这份文件的摘要这份文件的摘要这份文件的摘要这份文件的摘要这份文这份文件的摘要件的摘要这份文件的摘要这份文件的摘要件的摘要
            </div>
            <div class="chatBottomDetailTime">2024-03-24 21:41:30</div>
          </div>
        </div>
        <div class="chatBoxResponse">
          <div class="streamResponse">
            <div class="chatBoxResponseLeftContainer">
              <vs-avatar text="AI" color="lightgreen"></vs-avatar>
            </div>
            <div class="chatBoxResponseRightContainer">
              <div class="chatResponseFromKnowledge">
                中国大学生计算机设计大赛的参赛要求包括：参赛对象为全国高等院校在籍的本科生，也包括港、澳、台学生和留学生[1a]；指导教师应是在高校担任本科生教学任务的教师[2]；大赛作品须符合相关章程要求[1b]；作品内容分为软件应用与开发、微课与教学辅助、物联网应用、大数据应用、人工智能应用等类别[16]。
              </div>
            </div>
          </div>
          <div class="dividerBox">
            <vs-divider position="left" color="#888">
              <vs-icon icon="done_all" class="spanCite"></vs-icon>
              <span style="color: #888888;">引用自</span>
            </vs-divider>
          </div>
          <div class="citeContentBox">
            <cite-file></cite-file>
          </div>
        </div>

      </div>


    </div>
    <div class="bottomInputBox">
      <div class="contentBox">
        <vs-input size="large" style="width: 86%;margin-left: 20px;" placeholder="type your question"
                  v-model="userInputMessage"/>
        <vs-button color="primary" icon="send" style="margin-left: 20px;margin-top: 2px;"></vs-button>
      </div>
    </div>
  </div>
</template>


<script>
import CiteFile from "@/components/citeFile.vue";

export default {
  name: 'KnowledgeChat',
  components: {CiteFile},
  data() {
    return {
      knowledgeId: '',
      userInputMessage: '',
      itemList: [
        {id: 11, name: 'item 1'},
        {id: 12, name: 'item 2'},
        {id: 13, name: 'item 3'}
      ]
    }
  },
  created() {
    let path = this.$route.path.split('/')
    this.knowledgeId = path[path.length - 1]
    this.$watch(
        () => this.$route.params,
        (toParams, preParams) => {
          console.log(preParams)
          this.knowledgeId = toParams.id
        }
    )
  },
  methods: {}
}
</script>

<style lang="css" scoped>
.KnowledgeChatContainer {
  width: 100%;
  height: 100%;
}

.knowledgeTopEmptyBox {
  height: 4%;
  border-bottom: 1px solid #c7c7c7;
}

.charBoxContainer {
  height: 82%;
  overflow-y: auto;
  scrollbar-width: thin;
}

.charBoxContainer::-webkit-scrollbar {
  width: 8px;
}

.charBoxContainer::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.chatBox {
  width: 100%;
  margin-bottom: 8px;
  border-bottom: 8px solid #e6e6e6;
}

.active {
  border-bottom: 8px solid #e6e6e6;
}

.chatBoxTop {
  display: flex;
}

.chatBoxTopLeftContainer {
  width: 12%;
  padding-top: 16px;
  padding-left: 20px;
  min-height: 100px;
}

.chatBoxTopRightContainer {
  width: 84%;
  margin-top: 20px;
  margin-left: 2px;
  line-height: 28px;
}

.chatQuestions {
  font-weight: bold;
}

.chatBottomDetailTime {
  margin-top: 10px;
  margin-bottom: 20px;
}

.chatBoxResponse {
  height: 800px;
  background-color: #fafafa;
  box-shadow: 0 1px 0 #c7c7c7, 0 -1px 0 #c7c7c7;
  cursor: pointer;
}

.streamResponse {
  display: flex;
}

.chatBoxResponseLeftContainer {
  width: 12%;
  padding-top: 16px;
  padding-left: 20px;
  min-height: 100px;
}

.chatBoxResponseRightContainer {
  width: 84%;
  margin-top: 20px;
  margin-left: 2px;
  line-height: 26px;
}

.chatResponseFromKnowledge {
  font-size: 14px;
  margin-bottom: 6px;
}

.dividerBox {
  width: 90%;
  margin-left: 30px;
  color: #888888;
}

.spanCite {
  color: green;
  font-size: 20px;
}

.citeContentBox {
  width: 90%;
  height: 200px;
  background-color: #4CAF50;
  margin-left: 30px;
}

.bottomInputBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  border-top: 1px solid #c7c7c7;
}

.contentBox {
  width: 40%;
  display: flex;
  justify-content: space-between;
}
</style>
