<template>
  <div class="main_container">
    <div id="chat-container" ref="chatContainer">
      <div class="adContainer" v-if="messages.length === 0"></div>
      <div :class="[msg.type === 'sent' ? 'message sent' : 'message received']" v-for="(msg, index) in messages"
           :key="index">
        <template v-if="loading && index === messages.length">
          <span class="flash_cursor"></span>
        </template>
        <template v-else>
         <pre>{{ msg.text }}</pre>
        </template>
      </div>
    </div>
    <div class="input-container">
      <vs-input class="input_box" :disabled="loading" @keyup.enter="getJsonData" placeholder="Type your message..."
                v-model="userMessage" size="large"/>
      <vs-button color="primary" type="filled" icon="arrow_upward" @click="getJsonData" :disabled="loading"
                 style="margin-left: 20px"></vs-button>
    </div>
  </div>
</template>

<script>
import {createTypewriter} from "@/utils/typeWriter"
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css"

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: "language-",
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
            '<pre class="code"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
        );
      } catch (__) {
        console.log(md)
      }
    }
    return "";
  },
})
export default {
  name: 'PrimaryChat',
  data() {
    return {
      userMessage: '',
      messages: [

      ],
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
      this.loading = true
      const typewriter = createTypewriter((str) => {
        this.messages[this.messages.length - 1].text += str || ''
      })
      if (this.userMessage.trim() === '') return;
      this.messages.push({text: this.userMessage, type: 'sent'});
      let URL = process.env.VUE_APP_BASE_URL +'/chat'
      // if (this.chat_mode_select) {
      //   URL = 'http://127.0.0.1:4523/m1/4197185-0-default/knowledge_base/chat'
      // }
      this.prompt.query = this.userMessage
      this.prompt.sessionId = localStorage.getItem('sessionId')
      // this.prompt.messages[0].content = this.userMessage
      this.userMessage = ''

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
          text: '网络问题',
          position: 'top-center'
        })
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
        typewriter.add(JSON.parse(value).data)
      }


      // const res = await fetch('http://127.0.0.1:11434/api/chat', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(this.prompt),
      // });

      // if (!res.body) console.log("返回的结果为空")
      // const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      // let is_true = true
      // this.messages.push({text: '', type: 'received'})
      // let count = 0
      // while (is_true) {
      //   count++
      //   if (count === 1) typewriter.start()
      //   this.$nextTick(() => {
      //     this.scrollToBottom();
      //   });`
      //   var {value, done} = await reader.read()
      //   if (done) break;
      //   // const jsonArray = parsePack(value)
      //   typewriter.add(JSON.parse(value).message.content)
      //   // typewriter.add(JSON.parse(value).message.content)
      //
      // }
      typewriter.done()
      this.loading = false
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
  background-color: rgb(99, 159, 255);
  align-self: flex-end;
  color: white;
}

.received {
  background-color: #f3f3f3;
  align-self: flex-start;
  color: #333;
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
}

.adContainer {
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: #4CAF50;
}
</style>
