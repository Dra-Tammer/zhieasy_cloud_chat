<template>
  <div class="side_bar">
    <div class="view_content">
      <div class="primary_chat" :class="{active:$route.path === '/chat'}" @click="switchToPrimaryChat">
        <vs-icon icon="smart_toy" style="margin-left: 20px;color: gray;"
                 :style="{'color': $route.path === '/chat' ? 'white' : ''}"></vs-icon>
        <div style="display: flex;justify-content: center;width: 68%; font-weight: bold;">AI 助手</div>
      </div>
      <vs-divider position="left" style="font-weight: bold;">
        知识库
      </vs-divider>
      <div class="knowledge_base_chat">
        <div class="knowledge_list_item" :class="{active:$route.path === `/knowledge/${item.id}`}"
             v-for="item in knowledgeList" :key="item.id" @click="switchKnowledge(item.id)">
          <div class="knowledge_list_item_top_container">
            <div class="knowledge_list_item_top_left_container">
              <vs-icon icon="token" class="icon"
                       :class="{icon_active:$route.path === `/knowledge/${item.id}`}"></vs-icon>
              <div class="knowledge_base_title">{{ item.space_name }}</div>
            </div>
            <div class="knowledge_limits">
              <vs-chip transparent color="primary"
                       :style="{'color': $route.path === `/knowledge/${item.id}` ? 'white' : ''}">
                {{ item.rule === 'GROUP' ? '协作' : '私有' }}
              </vs-chip>
            </div>
          </div>
          <div class="knowledge_list_item_bottom_container">
            <div class="knowledge_list_item_bottom_group_count">
              <vs-icon icon="browse_gallery"
                       style="color:gray;font-size: 16px;margin-right: 10px;margin-left: 6px;"
                       :style="{'color': $route.path === `/knowledge/${item.id}` ? 'white' : ''}"
                       :class="{icon_active:$route.path === `/knowledge/${item.id}`}"></vs-icon>
              <span :class="{icon_active:$route.path === `/knowledge/${item.id}`}">{{ item.update_time }}</span>
            </div>
            <div class="knowledge_list_item_bottom_button_container" v-if="item.space_name!=='个人空间'">
              <vs-button size="small" line-position="top" line-origin="right" color="dark" type="line"
                         style="width: 50%;" :style="{'color': $route.path === `/knowledge/${item.id}` ? 'white' : ''}"
                         @click.stop="deleteKnowledge(item)">删除
              </vs-button>
              <vs-button size="small" line-position="top" line-origin="left" color="dark" type="line"
                         style="width: 50%;" :style="{'color': $route.path === `/knowledge/${item.id}` ? 'white' : ''}"
                         @click.stop="manageGroup(item.id)">管理成员
              </vs-button>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px;font-size: 14px;color: gray;">没有更多了</div>
      </div>
    </div>
    <div class="create_knowledge" @click="addKnowledgeActivePrompt = true">
      <vs-button style="width: 100%;" type="gradient" icon="add">添加知识库</vs-button>
    </div>
    <vs-popup classContent="addKnowledgePopUP" title="新建知识库" :active.sync="addKnowledgeActivePrompt">
      <div class="addKnowledgePopUP">
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
        <div class="addKnowledgeRightContainer">
          <p style="margin-bottom: 10px;">知识库就是用户利用知识管理软件创建一个集中式存储库</p>
          <p style="margin-bottom: 10px;">该存储库可用于轻松创建、组织、查找和共享知识，</p>
          <p style="margin-bottom: 10px;">将分散在各处的知识集中起来。</p>
        </div>
      </div>
    </vs-popup>
    <vs-popup classContent="manageGroupPopUP" title="管理知识库协作者" :active.sync="manageGroupActivePrompt">
      <div class="manageGroupPopUP">
        <div class="manageGroupLeftContainer">
          <vs-table
              maxHeight="300px"
              search
              multiple
              v-model="manageGroupSelected"
              :data="manageGroupUserList">
            <template slot="header">
              <vs-button v-if="0!==this.manageGroupSelected.length" line-position="top" line-origin="left"
                         color="warning" type="line"
                         style="width: 100px;margin-right: 20px;" @click="removePersonFromKnowledge">移出
              </vs-button>
              <vs-button line-position="top" line-origin="left" color="primary" type="line"
                         @click="addMemberActivePrompt = true">添加成员
              </vs-button>
            </template>
            <template slot="thead">
              <vs-th>
                成员名
              </vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].username">
                  {{ data[indextr].username }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
      <vs-popup title="添加成员" :active.sync="addMemberActivePrompt">
        <div style="display: flex;">
          <vs-input placeholder="成员用户名" v-model="newKnowledgeMemberName" style="margin-top: 10px;"/>
          <vs-button style="margin-left: 20px;" size="small" @click="addKnowledgeMember">确认</vs-button>
        </div>
      </vs-popup>
    </vs-popup>
  </div>
</template>


<script>
import {
  addKnowledge,
  knowledgeList,
  deleteKnowledge,
  switchToPrimaryChat,
  knowledgeMemberList,
  knowledgeGroupInvite, switchToKnowledge, knowledgeMemberRemove
} from "@/api/knowledge";

export default {
  name: 'SideBar',
  data() {
    return {
      knowledgeList: [
      ],
      // knowledgeList: null,
      addKnowledgeActivePrompt: false,
      newKnowledgeName: '',
      addKnowledgeSelect: 0,
      addKnowledgeRuleOptions: [
        {text: '私有', value: 0},
        {text: '协作', value: 1},
      ],
      manageGroupActivePrompt: false,
      manageGroupHandleId: null,
      manageGroupSelected: [],
      manageGroupUserList: [],
      deletingKnowledgeId: null,
      newKnowledgeMemberName: '',
      addMemberActivePrompt: false,
      personalKnowledgeId: -1
    }
  },
  watch: {},
  mounted() {
    this.getKnowledgeList()
  },
  methods: {
    getKnowledgeList() {
      knowledgeList(localStorage.getItem('token')).then((res) => {
        if (res.data.code === 200) {
          this.knowledgeList = res.data.data
          this.personalKnowledgeId = this.knowledgeList.find(item => item.space_name === '个人空间').id
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })
    },
    switchToPrimaryChat() {


      switchToPrimaryChat(localStorage.getItem('token'), true).then((res) => {
        if (res.data.code === 200) {
          if (this.$route.path !== '/chat') {
            this.$router.push('/chat');
          }
          localStorage.setItem('sessionId', res.data.data.sessionId)
          localStorage.setItem('token', res.data.data.token)
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })
    },
    addKnowledge() {
      if (this.newKnowledgeName === '') return;
      let knowledgeLimit = null
      if (this.addKnowledgeSelect) knowledgeLimit = "GROUP"
      else knowledgeLimit = 'PRIVATE'
      addKnowledge(localStorage.getItem('token'), this.newKnowledgeName, knowledgeLimit).then((res) => {
        // 请求成功之后的
        if (res.data.code === 200) {
          this.getKnowledgeList()
          this.$vs.notify({
            color: 'success',
            title: '知识库新建成功',
            text: `成功新建：${this.newKnowledgeName}`,
            position: 'top-center'
          })
          this.addKnowledgeActivePrompt = false
          this.newKnowledgeName = ''
          this.addKnowledgeSelect = 0
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
          this.addKnowledgeActivePrompt = false
          this.newKnowledgeName = ''
          this.addKnowledgeSelect = 0
        }
      })


    },
    switchKnowledge(id) {
      switchToKnowledge(localStorage.getItem('token'), id, false).then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('sessionId', res.data.data.sessionId)
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('activeKnowledgeName', res.data.data.kbName)
          if (this.$route.path !== `/knowledge/${id}`) {
            this.$router.push(`/knowledge/${id}`)
          }
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })
    },
    deleteKnowledge(item) {
      this.deletingKnowledgeId = item.id
      this.$vs.dialog({
        accept: this.deleteKnowledgeAccept,
        type: 'confirm',
        color: 'danger',
        title: `删除${item.space_name}`,
        text: '请明确删除知识库的后果，知识库中的文件要不会保留，知识库协作者们将不能再使用此知识库！',
        acceptText: '确定',
        cancelText: '取消'
      })
    },
    deleteKnowledgeAccept() {
      this.$vs.loading()
      deleteKnowledge(localStorage.getItem('token'), this.deletingKnowledgeId).then((res) => {
        if (res.data.code === 200) {
          this.$vs.notify({
            color: 'danger',
            title: '删除知识库',
            text: '知识库删除成功',
            position: 'top-center'
          })
          this.getKnowledgeList()
          if (this.$route.path !== '/chat') {
            this.switchKnowledge(this.personalKnowledgeId)
          }
          this.$vs.loading.close()
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })

    },
    manageGroup(id) {
      this.manageGroupActivePrompt = true
      this.manageGroupHandleId = id
      this.getMemberList()
    },
    cancelAddKnowledge() {
      this.addKnowledgeActivePrompt = false
      this.newKnowledgeName = ''
      this.addKnowledgeSelect = 0
    },
    getMemberList() {
      knowledgeMemberList(localStorage.getItem('token'), this.manageGroupHandleId).then((res) => {
        if (res.data.code === 200) {
          this.manageGroupUserList = res.data.data.map(member => {
            return {
              id: member.id,
              username: member.username
            }
          })
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })
    },
    removePersonFromKnowledge() {
      let ids = this.manageGroupSelected.map(item => item.id)
      knowledgeMemberRemove(localStorage.getItem('token'), this.manageGroupHandleId, ids).then((res) => {
        if (res.data.code === 200) {
          this.$vs.notify({
            color: 'danger',
            title: '移出成员',
            text: '已经将成员移出知识库',
            position: 'top-center'
          })
          this.manageGroupSelected = []
          this.getMemberList()
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`,
            position: 'top-center'
          })
        }
      })
    },
    addKnowledgeMember() {
      if (this.newKnowledgeMemberName !== '') {
        knowledgeGroupInvite(localStorage.getItem('token'), this.manageGroupHandleId, this.newKnowledgeMemberName).then((res) => {
          if (res.data.code === 200) {
            this.addMemberActivePrompt = false
            this.$vs.notify({
              color: 'success',
              title: '成功',
              text: '添加成员成功',
              position: 'top-center'
            })
            this.newKnowledgeMemberName = ''
            this.getMemberList()
          } else {
            this.$vs.notify({
              color: 'warning',
              title: '错误',
              text: `${res.data.msg}`,
              position: 'top-center'
            })
            this.newKnowledgeMemberName = ''
            this.addMemberActivePrompt = false
            this.getMemberList()
          }
        })
      }
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
  position: relative;
}


.view_content {
  height: 97%;
  width: 94%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.primary_chat {
  margin-top: 2px;
  display: flex;
  align-items: center;
  height: 54px;
  width: 98%;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 0px 1px 0px #0000001a, 0px 0.5px 5px 0px #0000001a;
}

.primary_chat:hover:not(.active) {
  box-shadow: 0 0 0 1px #f3f3f3;
  background-color: #f3f3f3;
}

.active {
  background: rgb(31, 116, 255);
  color: white;
  box-shadow: rgba(31, 116, 255, 0.4) 0px 3px 8px;
}

.icon {
  color: gray;
}

.icon_active {
  color: white;
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
  margin-bottom: 10px;
  box-shadow: 0px 0px 1px 0px #0000001a, 0px 0.5px 5px 0px #0000001a;
}

.knowledge_list_item:hover:not(.active) {
  box-shadow: 0 0 0 1px #f3f3f3;
  background-color: #f3f3f3;
}


.knowledge_list_item_top_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.knowledge_list_item_top_left_container {
  display: flex;
  align-items: center;
}

.knowledge_base_title {
  margin-left: 16px;
  margin-bottom: 8px;
  padding-top: 6px;
}

.knowledge_limits {
  font-size: 12px;
  color: gray;
  margin-right: 10px;
  margin-top: 4px;
}

.knowledge_list_item_bottom_container {

}

.knowledge_list_item_bottom_group_count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: gray;
  margin-bottom: 6px;
}

.knowledge_list_item_bottom_button_container {
}

.create_knowledge {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6%;
  border-top: 1px solid #c7c7c7;
  display: flex;
  cursor: pointer;
  background-color: rgb(31, 116, 225);
}

.addKnowledgePopUP {
  display: flex;
  justify-content: space-between;
}

.addKnowledgeLeftContainer {
  width: 46%;
  border-right: 1px solid #c7c7c7;
}

.addKnowledgeRightContainer {
  width: 50%;
  color: gray;
  line-height: 20px;
}

.manageGroupPopUP {
  display: flex;
}

.manageGroupLeftContainer {
  width: 100%;
}
</style>
