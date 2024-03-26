<template>
  <div class="side_bar">
    <div class="view_content">
      <div class="primary_chat">
        <vs-avatar text="AI" color="lightgreen"></vs-avatar>
        new primary chat
        <vs-icon icon="ios_share" style="margin-left: 20px;margin-right:6px;color: gray"></vs-icon>
      </div>
      <vs-divider position="left">
        知识库
      </vs-divider>
      <div class="knowledge_base_chat">
        <div class="knowledge_list_item">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" style="color: gray;"></vs-icon>
            <div class="knowledge_base_title">个人知识库</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：3</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div class="knowledge_list_item">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" style="color: gray;"></vs-icon>
            <div class="knowledge_base_title">个人知识库</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：3</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div class="knowledge_list_item">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" style="color: gray;"></vs-icon>
            <div class="knowledge_base_title">个人知识库</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：3</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div class="knowledge_list_item">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" style="color: gray;"></vs-icon>
            <div class="knowledge_base_title">个人知识库</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：3</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div class="knowledge_list_item">
          <div class="knowledge_list_item_top_container">
            <vs-icon icon="token" style="color: gray;"></vs-icon>
            <div class="knowledge_base_title">个人知识库</div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">合作人数：3</div>
            <div class="knowledge_list_item_bottom_button_container">
              <vs-button line-position="top" line-origin="right" color="dark" type="line" style="width: 50%;">删除
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="dark" type="line" style="width: 50%;">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px;font-size: 14px;color: gray;">没有更多了</div>
      </div>
      <div class="create_knowledge" @click="addKnowledge">
        <vs-icon icon="add" style="margin-right: 10px;"></vs-icon>
        <div>添加知识库</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'SideBar',
  data() {
    return {}
  },
  methods: {
    addKnowledge() {

    }
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

.active {
  background: rgba(107, 108, 111, .1490196078);
  box-shadow: 0 0 0 0;
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
</style>
