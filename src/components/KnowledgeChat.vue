<template>
  <div class="KnowledgeChatContainer">
    <div class="knowledgeTopEmptyBox">
    </div>
    <div class="knowledge_base_chat_ad" v-if="chatIds.length === 0">
      <KnowledgeBaseChatAd></KnowledgeBaseChatAd>
    </div>
    <div class="charBoxContainer" id="chat-container" ref="chatContainer">

      <div class="chatBox" v-for="(item,index) in chatIds" :key="index">
        <div class="chatBoxTop">
          <div class="chatBoxTopLeftContainer">
            <vs-avatar/>
          </div>
          <div class="chatBoxTopRightContainer">
            <div class="chatQuestions">
              {{ questionsArray[item.index] }}
            </div>
            <div class="chatBottomDetailTime">{{ item.createTime }}</div>
          </div>
        </div>
        <div class="chatBoxResponse">
          <div class="streamResponse">
            <div class="chatBoxResponseLeftContainer">
              <vs-avatar text="AI" color="lightgreen"></vs-avatar>
            </div>
            <div class="chatBoxResponseRightContainer">
              <div class="chatResponseFromKnowledge">
                <!--                <div id="markdown">{{ responseArray[item.index] }}</div>-->
                <pre :id="'markdown'+index"></pre>
              </div>
            </div>
          </div>
          <div v-if="item.index === summaryArray.length - 1">
            <div class="dividerBox" v-if="summaryArray[item.index].length !== 0">
              <vs-divider position="left" color="#888">
                <vs-icon icon="done_all" class="spanCite"></vs-icon>
                <span style="color: #888888;">引用自</span>
              </vs-divider>
            </div>
            <div class="citeContentBox">
              <cite-file :summary="summaryArray[item.index]"></cite-file>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomInputBox">
      <div class="contentBox">
        <vs-input size="large" style="width: 86%;margin-left: 20px;" :disabled="loading"
                  placeholder="输入您的问题："
                  v-model="userInputMessage" @keyup.enter="sendQuestion"/>
        <vs-button color="primary" icon="send" style="margin-left: 20px;margin-top: 2px;" @click="sendQuestion"
                   :disabled="loading"></vs-button>
      </div>
    </div>
    <div style="display: none;">
      {{ adjunct }}
    </div>
  </div>
</template>
<script>
import CiteFile from "@/components/citeFile.vue";
import {createTypewriter} from "@/utils/typeWriter";
import {getTimeNow} from "@/utils/getTimeNow";
import {marked} from "marked";
import KnowledgeBaseChatAd from "@/components/KnowledgeBaseChatAd.vue";

export default {
  name: 'KnowledgeChat',
  components: {KnowledgeBaseChatAd, CiteFile},
  data() {
    return {
      knowledgeId: '',
      userInputMessage: '',
      chatIds: [],
      questionsArray: [],
      responseArray: [],
      sourceArray: [],
      summaryArray: [],
      loading: false,
      prompt: {
        query: null,
        session_id: 0
      },
      adjunct: '',
      loadingStyleShow: false
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
          this.chatIds = []
          this.questionsArray = []
          this.responseArray = []
          this.sourceArray = []
          this.summaryArray = []
        }
    )
  },
  mounted() {
  },
  methods: {
    async sendQuestion() {

      this.loading = true
      const typewriter = createTypewriter((str) => {
        this.responseArray[this.responseArray.length - 1] += str || ''
        this.sourceArray[this.sourceArray.length - 1] += str || ''
        document.getElementById(`markdown${this.responseArray.length - 1}`).innerHTML = marked.parse(this.responseArray[this.responseArray.length - 1])
        this.adjunct += str || ''
        this.adjunct = ''
      })
      if (this.userInputMessage.trim() === '') {
        this.loading = false
        return;
      }
      let chatIdsIndex = this.chatIds.length
      this.chatIds.push({index: chatIdsIndex, createTime: getTimeNow()})
      this.questionsArray.push(this.userInputMessage);
      let URL = process.env.VUE_APP_BASE_URL + '/knowledge_base/chat'
      this.prompt.query = this.userInputMessage
      this.prompt.session_id = localStorage.getItem('sessionId')
      this.userInputMessage = ' '
      try {
        const res = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
          },
          body: JSON.stringify(this.prompt),
        });
        if (!res.body) {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: '网络错误',
            position: 'top-center'
          })
          this.loading = false
          this.chatIds.pop()
          this.questionsArray.pop()
        }
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let is_true = true
        this.responseArray.push('')
        let count = 0
        while (is_true) {
          count++
          if (count === 1) typewriter.start()
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          var {value, done} = await reader.read()
          if (done) break;
          if(value === '') continue;
          // let startIndex = value.indexOf('{')
          let arr = value.split("data: ")
          for(let i = 0; i < arr.length; i++) {
            if(arr[i] === '') continue;
            let resData = JSON.parse(arr[i])
            if (resData.code === 200) {
              if (!resData.data.isSummary) {
                // if(JSON.parse(value).data.reply === '') continue;
                typewriter.add(resData.data.reply)
              }
              else if (resData.data.isSummary) {
                this.summaryArray.push(resData.data.summary)
              }
            } else {
              this.$vs.notify({
                color: 'warning',
                title: '错误',
                text: `${resData.msg}`,
                position: 'top-center'
              })
              this.responseArray.pop()
              this.questionsArray.pop()
              this.chatIds.pop()
              this.loading = false
            }
            // if (!resData.data.isSummary) {
            //   // if(JSON.parse(value).data.reply === '') continue;
            //   // typewriter.add(JSON.parse(value).data.reply)
            // }
            // else if (resData.data.isSummary) {
            //   this.summaryArray.push(resData.data.summary)
            // }
          }
          // if(startIndex !== -1) value = value.substring(startIndex)
          // let resData = JSON.parse(value)
          // if (resData.code === 200) {
          //   if (!resData.data.isSummary) {
          //     // if(JSON.parse(value).data.reply === '') continue;
          //     // typewriter.add(JSON.parse(value).data.reply)
          //   }
          //   else if (resData.data.isSummary) {
          //     this.summaryArray.push(resData.data.summary)
          //   }
          // } else {
          //   this.$vs.notify({
          //     color: 'warning',
          //     title: '错误',
          //     text: `${resData.msg}`,
          //     position: 'top-center'
          //   })
          //   this.responseArray.pop()
          //   this.questionsArray.pop()
          //   this.chatIds.pop()
          //   this.loading = false
          // }
        }
        typewriter.done()
        this.loading = false
      } catch (error) {
        console.log(error.message)
        if (error.message !== 'Cannot set properties of null (setting \'innerHTML\')') {
          this.$vs.notify({
            color: 'danger',
            title: '错误',
            text: '服务器问题，请检查网络或者稍后提问',
            position: 'top-center'
          })
        }
        this.responseArray.pop()
        this.questionsArray.pop()
        this.chatIds.pop()
        this.loading = false
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
  }
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
  background-color: #fafafa;
  box-shadow: 0 1px 0 #c7c7c7, 0 -1px 0 #c7c7c7;
  padding-bottom: 2px;
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
  font-weight: 600;
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

pre {
  font-family: PingFang, Noto Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  white-space: break-spaces;
  line-height: 30px;
}

.knowledge_base_chat_ad {
  width: 90%;
  height: 80%;
  margin: auto;
}
</style>
