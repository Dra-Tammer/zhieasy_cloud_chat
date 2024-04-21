<template>
  <div class="main_container">
    <div id="chat-container" ref="chatContainer">
      <div class="adContainer" v-if="messages.length === 0">
        <primary-chat-ad></primary-chat-ad>
      </div>
      <div :class="[msg.type === 'sent' ? 'message_body sent' : 'message_body received']"
           v-for="(msg, index) in messages"
           :key="index">
        <div class="left-avatar">
          <vs-avatar class="left-avatar" v-if="msg.type === 'received'" color="success" text="AI"></vs-avatar>
        </div>
        <template v-if="loading && index === messages.length">
          <span class="flash_cursor"></span>
        </template>
        <template v-else>
          <div
              :class="[msg.type==='sent' ? 'text_container text_container_sent' : 'text_container text_container_received']">
            <pre :id="'markdown'+index">{{ msg.type === 'sent' ? msg.text : '' }}</pre>
          </div>
        </template>
        <div class="right-avatar">
          <vs-avatar v-if="msg.type === 'sent'" color="primary"></vs-avatar>
        </div>
      </div>
      <!--      <div :class="[msg.type === 'sent' ? 'message sent' : 'message received']" v-for="(msg, index) in messages"-->
      <!--           :key="index">-->
      <!--        <template v-if="loading && index === messages.length">-->
      <!--          <span class="flash_cursor"></span>-->
      <!--        </template>-->
      <!--        <template v-else>-->
      <!--          <pre :id="'markdown'+index">{{ msg.type === 'sent' ? msg.text : '' }}</pre>-->
      <!--        </template>-->
      <!--      </div>-->
    </div>
    <div class="input-container">
      <vs-input class="input_box" :disabled="loading" @keyup.enter="getJsonData" placeholder="输入您的问题："
                v-model="userMessage" size="large"/>
      <vs-button color="primary" type="filled" icon="arrow_upward" @click="getJsonData" :disabled="loading"
                 style="margin-left: 20px"></vs-button>
    </div>
  </div>
</template>

<script>
import {createTypewriter} from "@/utils/typeWriter"
import {marked} from "marked";
import PrimaryChatAd from "@/components/PrimaryChatAd.vue";

export default {
  name: 'PrimaryChat',
  components: {PrimaryChatAd},
  data() {
    return {
      userMessage: '',
      messages: [],
      loading: false,
      // prompt: {
      //   "model": "qwen:4b",
      //   "messages": [
      //     {
      //       "role": "user",
      //       "content": ''
      //     }
      //   ]
      // },
      prompt: {
        query: null,
        sessionId: 0
      }
    }
  },
  props: {
    msg: String
  },
  mounted() {
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
    toggleReply() {
      this.loading = !this.loading;
    },
    async getJsonData() {
      try {
        this.loading = true
        const typewriter = createTypewriter((str) => {
          this.messages[this.messages.length - 1].text += str || ''
          document.getElementById(`markdown${this.messages.length - 1}`).innerHTML = marked.parse(this.messages[this.messages.length - 1].text)
        })
        if (this.userMessage.trim() === '') {
          this.loading = false
          return;
        }
        this.messages.push({text: this.userMessage, type: 'sent'});
        let URL = process.env.VUE_APP_BASE_URL + '/chat'
        this.prompt.query = this.userMessage
        this.prompt.sessionId = localStorage.getItem('sessionId')
        this.userMessage = ''
        // this.messages.push({text: '', type: 'received'})
        // typewriter.start()
        // const ctrl = new AbortController();
        // await fetchEventSource(URL, {
        //   method: "POST",
        //   openWhenHidden: true,
        //   signal: ctrl.signal,
        //   headers: {
        //     "Content-Type": "application/json",
        //     "token": localStorage.getItem('token')
        //   },
        //   body: JSON.stringify(this.prompt),
        //   onmessage(event) {
        //     console.log('e: ', JSON.parse(event.data).data)
        //     typewriter.add(JSON.parse(event.data).data)
        //   },
        //   onerror(event) {
        //     ctrl.abort();
        //     console.log('服务异常', event)
        //   },
        //   onclose() {
        //     typewriter.done()
        //     this.loading = false
        //     console.log('服务关闭')
        //   }
        // });


        const res = await fetch(URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "token": localStorage.getItem('token')
          },
          body: JSON.stringify(this.prompt),
        });
        if (!res.body) {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: '网络问题',
            position: 'top-center'
          })
          this.loading = false
          this.messages.pop()
        }
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let is_true = true
        this.messages.push({text: '', type: 'received'})
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
          let startIndex = value.indexOf('{')
          if(startIndex !== -1) value = value.substring(startIndex)
          // let str = value
          // let arr = str.split('}')
          // for (let i = 0; i < arr.length; i++) {
          //   if (arr[i] !== '') {
          //     // typewriter.add(JSON.parse(arr[i] + '}').data);
          //   }
          // }
          typewriter.add(JSON.parse(value).data);
        }
        typewriter.done()
        this.loading = false
      } catch (error) {
        console.log(error)
        this.$vs.notify({
          color: 'danger',
          title: '错误',
          text: '服务器问题，提问速度过快，请稍后提问',
          position: 'top-center'
        })
        this.messages.pop()
        this.messages.pop()
        this.loading = false
      }
    }
  },
}
</script>


<style lang="css" scoped>
.main_container {
  width: 100%;
  display: block;
}

#chat-container {
  overflow-y: auto;
  scrollbar-width: none;
  width: 82%;
  margin: 20px auto;
  padding: 20px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
}

#chat-container::-webkit-scrollbar {
  display: none;
}

#chat-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.message_body {
  display: flex;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 80%;
  line-height: 20px;
}

.left-avatar {
  width: 34px;
  height: 34px;
  margin-right: 20px;
}

.right-avatar {
  width: 34px;
  height: 34px;
  margin-left: 10px;
}

.text_container {
  border-radius: 10px;
  word-wrap: break-word;
  padding: 12px;
}

.text_container_sent {
  background-color: rgb(99, 159, 255);
  color: white;
}

.text_container_received {
  background-color: #f3f3f3;
  color: #333;
}

.message {
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 70%;
  line-height: 20px;
  word-wrap: break-word;
}

.sent {
  align-self: flex-end;
}

.received {
  align-self: flex-start;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.input_box {
  width: 74%;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.input-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: black;
  animation: blink-animation 1s infinite;
  position: relative;
  bottom: -0.2em;
}

@keyframes blink-animation {
  50% {
    opacity: 0;
  }
}

.flash_cursor {
  width: 20px;
  height: 30px;
  display: inline-block;
  background: #d6e3f5;
  opacity: 1;
  animation: glow 800ms ease-out infinite alternate;
}

pre {
  font-family: PingFang, Noto Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  white-space: break-spaces;
  line-height: 30px;
  overflow: auto;
}

.adContainer {
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
