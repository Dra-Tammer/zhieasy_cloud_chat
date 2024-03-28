<template>
  <div class="side_bar">
    <div class="view_content">
      <div class="primary_chat" :class="{active:$route.path === '/chat'}" @click="switchToPrimaryChat">
        <vs-avatar text="AI" color="lightgreen"></vs-avatar>
        New Primary Chat
        <vs-icon icon="ios_share" style="margin-left: 20px;margin-right:6px;color: gray"></vs-icon>
      </div>
      <vs-divider position="left">
        知识库
      </vs-divider>
      <div class="knowledge_base_chat">
        <div class="knowledge_list_item" :class="{active:$route.path === `/knowledge/${item.id}`}"
             v-for="item in knowledgeList" :key="item.id" @click="switchKnowledge(item.id)">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" class="icon"
                     :class="{icon_active:$route.path === `/knowledge/${item.id}`}"></vs-icon>
            <div class="knowledge_base_title">{{ item.name }}</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：{{ item.groupCount }}</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;"
                         @click.stop="deleteKnowledge(item)">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;"
                         @click.stop="manageGroup(item.id)">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px;font-size: 14px;color: gray;">没有更多了</div>
      </div>
      <div class="create_knowledge" @click="addKnowledgeActivePrompt = true">
        <vs-icon icon="add" style="margin-right: 10px;"></vs-icon>
        <div>添加知识库</div>
      </div>
    </div>
    <vs-popup classContent="addKnowledgePopUP" title="新建知识库" :active.sync="addKnowledgeActivePrompt">
      <div class="addKnowledgeLeftContainer">
        <p style="margin-bottom: 10px;">命名新知识库：</p>
        <vs-input placeholder="input" v-model="newKnowledgeName" style="margin-bottom: 10px;"/>
        <p style="margin-bottom: 10px;">知识库规则</p>
        <vs-select
            v-model="addKnowledgeSelect"
            style="margin-bottom: 20px;"
        >
          <vs-select-item :key="index" :value="item.value" :text="item.text"
                          v-for="(item,index) in addKnowledgeRuleOptions"/>
        </vs-select>
        <vs-button @click="addKnowledge" style="width: 80px;margin-right: 20px;">确认</vs-button>
        <vs-button type="flat" @click="cancelAddKnowledge" style="width: 80px;">取消</vs-button>
      </div>
    </vs-popup>
  </div>
</template>


<script>
export default {
  name: 'SideBar',
  data() {
    return {
      knowledgeList: [
        {id: '001', name: '个人知识库', groupCount: 30},
        {id: '002', name: 'marks的知识库', groupCount: 310},
        {id: '003', name: 'mike的知识库', groupCount: 230},
        {id: '004', name: 'java知识库', groupCount: 330},
        {id: '005', name: '公司人事知识库', groupCount: 30},
        {id: '006', name: '公司财务知识库', groupCount: 40},
      ],
      addKnowledgeActivePrompt: false,
      newKnowledgeName: '',
      addKnowledgeSelect: 0,
      addKnowledgeRuleOptions: [
        {text: '自用一手新', value: 0},
        {text: '自用二手新', value: 1},
        {text: '包浆', value: 2}
      ]
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    switchToPrimaryChat() {
      if (this.$route.path !== '/chat') {
        this.$router.push('/chat');
      }
    },
    addKnowledge() {
      this.$vs.notify({
        color: 'success',
        title: '知识库新建成功',
        text: `成功新建：${this.newKnowledgeName}`
      })
      this.addKnowledgeActivePrompt = false
      this.newKnowledgeName = ''
      this.addKnowledgeSelect = 0
    },
    switchKnowledge(id) {
      if (this.$route.path !== `/knowledge/${id}`) {
        this.$router.push(`/knowledge/${id}`)
      }
    },
    deleteKnowledge(item) {
      this.$vs.dialog({
        accept: this.deleteKnowledgeAccept,
        type: 'confirm',
        color: 'danger',
        title: `删除知识库${item.name}`,
        text: '请明确删除知识库的后果，知识库中的文件要不会保留，知识库协作者们将不能再使用此知识库！',
        acceptText: '确定',
        cancelText: '取消'
      })
    },
    deleteKnowledgeAccept() {
      this.$vs.notify({
        color: 'danger',
        title: '删除知识库',
        text: '知识库删除成功'
      })
    },
    manageGroup(id) {
      console.log(id)
    },
    cancelAddKnowledge() {
      this.addKnowledgeActivePrompt = false
      this.newKnowledgeName = ''
      this.addKnowledgeSelect = 0
    },
  }
}
</script>

<style lang="css" scoped>
.side_bar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.view_content {
  height: calc(100% - 34px);
  width: 94%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.primary_chat {
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  width: 98%;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 0 1px #dcdfe6;
}

.primary_chat:hover:not(.active) {
  box-shadow: 0 0 0 1px #f3f3f3;
  background-color: #f3f3f3;
}

.active {
  background: rgba(107, 108, 111, .1490196078);
  box-shadow: 0 0 0 1px rgba(107, 108, 111, .1490196078);
}

.icon {
  color: gray;
}

.icon_active {
  color: rgb(23, 201, 100);
}

.knowledge_base_chat {
  height: 80%;
  padding-top: 2px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.knowledge_list_item {
  width: 98%;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 0 1px #dcdfe6;
  margin-bottom: 16px;
}

.knowledge_list_item:hover:not(.active) {
  box-shadow: 0 0 0 1px #f3f3f3;
  background-color: #f3f3f3;
}


.knowledge_list_item_top_container {
  display: flex;
  align-items: center;
}

.knowledge_base_title {
  margin-left: 16px;
  margin-bottom: 14px;
  padding-top: 10px;
}

.knowledge_list_item_bottom_container {

}

.knowledge_list_item_bottom_group_count {
  color: gray;
  font-size: 14px;
  margin-bottom: 16px;
}

.knowledge_list_item_bottom_button_container {
}

.create_knowledge {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  border-top: 1px solid #c7c7c7;
  display: flex;
  padding-top: 10px;
  cursor: pointer;
}

.addKnowledgePopUP {
}

.addKnowledgeLeftContainer {
  width: 46%;
  border-right: 1px solid #c7c7c7;
}
</style>
