<template>
  <div class="knowledgeFileManagementContainer">
    <div class="fileManagementTop">
      <vs-icon icon="chevron_left"
               style="color: white;margin-right: 10px;margin-left: 10px;cursor: pointer; background-color: #4B70E2"
               @click="goBackward"></vs-icon>
      <div class="breadCrumbContainer">
        <vs-chip style="font-size: 16px;color: gray;" v-if="filePath.length !== 0">
          {{ this.filePath }}
        </vs-chip>
      </div>
    </div>
    <div class="fileListMainContainer">
      <div class="fileListContainer">
        <div class="fileListItem" v-for="(item,index) in fileList" :key="index" @click="enterDir(item)">
          <div class="fileListTopContainer">
            <div class="fileListItemTopLeftContainer">
              <div class="fileTypeImg">
                <img :src="setFileImg(item)" alt="" style="width: 30px;height: 30px;">
              </div>
              <div class="fileName">{{ item.name }}</div>
            </div>
            <div class="fileListItemTopRightContainer">
              <vs-icon v-if="!item.isDir" icon="download" style="cursor: pointer; color: #9f9f9f;"
                       @click="handleDownload(item)"></vs-icon>
            </div>
          </div>
          <div class="fileListBottomContainer">
            <div class="fileListBottomLeftContainer" v-if="!item.isDir">
              <vs-icon icon="browse_gallery" style="color: gray;font-size: 16px;"></vs-icon>
              <div class="fileCreateTime">{{ item.createTime }}</div>
            </div>
            <div class="fileListBottomRightContainer">
              <vs-icon v-if="!item.isDir" icon="delete" style="cursor: pointer; color: #9f9f9f;"
                       @click="deleteFile(item)"></vs-icon>
            </div>
          </div>
        </div>
        <div class="noMoreFile">没有更多了</div>
      </div>
    </div>

    <div class="fileManageBottomContainer">
      <vs-chip style="font-size: 16px;margin-left: 20px;margin-right: 100px;">
        知识库： {{ activeKnowledgeName }}
      </vs-chip>
      <div>
        <vs-button size="large" color="primary" type="flat" icon="window" @click="newDirDialogActivePrompt = true;">
          新建文件夹
        </vs-button>
        <vs-button size="large" color="success" type="flat" icon="upload" @click="uploadToKnowledgeActivePrompt = true"
                   style="margin-right: 10px;">
          上传文件到知识库
        </vs-button>
        <vs-prompt
            @cancel="newDirName=''"
            @accept="newDir"
            @close="newDirName=''"
            :active.sync="newDirDialogActivePrompt"
            title="新建文件夹"
            accept-text="确定"
            cancel-text="取消"
        >
          <div>
            <vs-input placeholder="命名文件夹" v-model="newDirName" style="margin-top: 20px;"/>
          </div>
        </vs-prompt>
        <vs-popup title="上传文件到知识库" :active.sync="uploadToKnowledgeActivePrompt">
          <input type="file" ref="fileInput" @change="uploadFile" class="uploadButton"/>
          <vs-button @click="upload" size="small" :disabled="uploadSuccess">上传</vs-button>
          <vs-progress indeterminate color="primary" v-if="uploadSuccess">primary</vs-progress>
        </vs-popup>
      </div>
    </div>
  </div>
</template>


<script>

import {fileImgMap} from '@/utils/imgMap'
import {downloadFile, fileList, newDir, uploadFile, deleteFile} from "@/api/file";

export default {
  name: 'FileManage',
  data() {
    return {
      knowledgeId: null,
      uploadSuccess: false,
      newDirDialogActivePrompt: false,
      newDirName: '',
      fileList: [
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          createTime: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.jpg',
          isDir: false,
          createTime: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.doc',
          isDir: false,
          createTime: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.pdf',
          isDir: false,
          createTime: '2024-03-24'
        }
      ],
      filePath: '/',
      deletingFileName: '',
      uploadToKnowledgeActivePrompt: false,
      activeKnowledgeName: null
    }
  },
  computed: {},
  created() {
    let path = this.$route.path.split('/')
    this.knowledgeId = path[path.length - 1]
    this.activeKnowledgeName = localStorage.getItem('activeKnowledgeName')
    this.$watch(
        () => this.$route.params,
        (toParams, preParams) => {

          console.log('pre:', preParams)
          this.knowledgeId = toParams.id
          this.activeKnowledgeName = localStorage.getItem('activeKnowledgeName')

          this.getFileList()

        }
    )
  },
  watch: {},
  mounted() {
    this.getFileList();
  },
  methods: {
    newDir() {
      newDir(localStorage.getItem('token'), this.filePath + this.newDirName).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.$vs.notify({
            color: 'success',
            title: '新建文件夹成功',
            text: `成功新建：${this.newDirName}`
          })
          this.getFileList()
          this.newDirName = ''
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`
          })
          this.newDirName = ''
        }
      })
    },
    successUpload() {
      this.uploadToKnowledgeActivePrompt = false
      this.$vs.notify({color: 'success', title: 'Upload Success', text: '上传成功'})
    },
    async handleDownload(item) {
      try {
        let fileName = this.filePath + item.name

        if (this.filePath === '/') fileName = this.filePath + item.name
        else fileName = this.filePath + '/' + item.name
        // 在这里调用下载文件的函数
        const response = await downloadFile(localStorage.getItem('token'), fileName);

        // 创建一个Blob对象，并将文件流(response.data)存入其中
        const blob = new Blob([response.data], {type: response.data.type});

        // 创建一个a标签，设置其href为Blob对象的URL，以及下载文件的名称
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName.split('/').pop(); // 提取文件名

        // 将a标签插入到DOM中，并触发点击事件，开始下载
        document.body.appendChild(link);
        link.click();

        // 下载完成后，移除a标签
        this.$vs.notify({
          color: 'success',
          title: '成功',
          text: '文件下载成功'
        })
        document.body.removeChild(link);


      } catch (error) {
        console.error('下载文件时发生错误：', error);
        // 处理错误情况，例如提示用户下载失败等
      }
    },
    deleteFile(item) {
      this.deletingFileName = this.filePath + item.name
      this.$vs.dialog({
        accept: this.deleteKnowledgeAccept,
        type: 'confirm',
        color: 'danger',
        title: `删除${item.name}`,
        text: '请明确删除文件的后果，协作者们将不能再使用此文件！',
        acceptText: '确定',
        cancelText: '取消'
      })
    },
    deleteKnowledgeAccept() {
      deleteFile(localStorage.getItem('token'), this.deletingFileName).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$vs.notify({
            color: 'danger',
            title: '删除',
            text: '文件删除成功'
          })
          this.getFileList()
        } else {
          this.$vs.notify({
            color: 'warning',
            title: '错误',
            text: `${res.data.msg}`
          })
        }
      })

    },
    enterDir(item) {
      if (item.isDir) {
        if (this.filePath === '/') this.filePath += item.name
        else this.filePath += '/' + item.name
        this.getFileList()
      }
    },
    setFileImg(item) {
      if (item.isDir) return fileImgMap.get('dir')
      let dotIndex = item.name.indexOf('.')
      if (dotIndex !== -1) {
        let type = item.name.substring(dotIndex + 1)
        return fileImgMap.get(type)
      }
    },
    getFileList() {
      fileList(localStorage.getItem('token'), this.filePath).then((res) => {
        if (res.data.code === 200) {
          this.fileList = res.data.data
        }
      })
    },
    goBackward() {
      let str = this.filePath
      if (str !== '/') {
        if (str.lastIndexOf('/') !== 0) {
          this.filePath = str.substring(0, str.lastIndexOf('/'))
        } else {
          this.filePath = str.substring(0, str.lastIndexOf('/') + 1)
        }
      }
      this.getFileList()
    },
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      this.file = file;
    },
    upload() {
      this.uploadSuccess = true
      let pathStr = ''
      if (this.filePath === '/') pathStr = '/' + this.file.name
      else pathStr = this.filePath + '/' + this.file.name
      uploadFile(localStorage.getItem('token'), pathStr, this.file).then((res) => {
        console.log(pathStr)
        if (res.data.code === 200) {
          this.$vs.notify({
            color: 'success',
            title: '文件上传成功',
            text: `成功上传：${this.file.name}`
          })
          this.uploadToKnowledgeActivePrompt = false
          this.uploadSuccess = false
          this.getFileList()
        }
      })
    },
  }
}
</script>

<style lang="css" scoped>
.fileListItem:hover .fileListItemTopRightContainer {
  display: flex;
}

.fileListItem:hover .fileListBottomRightContainer {
  display: flex;
}

.fileListItemTopRightContainer,
.fileListBottomRightContainer {
  display: none;
}

.knowledgeFileManagementContainer {
  height: 94%;
  width: 100%;
}

.fileManagementTop {
  margin-top: 2px;
  height: 4%;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  align-items: center;
}

.fileListMainContainer {
  height: 86%;
  display: flex;
  justify-content: center;
}

.fileListContainer {
  padding-top: 10px;
  width: 98%;
  overflow-y: auto;
  scrollbar-width: thin;
}

.fileListContainer::-webkit-scrollbar {
  width: 6px;
}

.fileListContainer::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.fileListItem {
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

.fileListItem:hover {
  box-shadow: 0 0 0 1px #f3f3f3;
  background-color: #f3f3f3;
}

.fileListTopContainer {
  display: flex;
  justify-content: space-between;
}

.fileListItemTopLeftContainer {
  width: 86%;
  display: flex;
  padding-left: 6px;
  padding-top: 6px;
}

.fileName {
  margin-left: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #3E3f42;
}

.fileListItemTopRightContainer {
  margin-top: 10px;
  margin-right: 6px;
}

.fileListBottomContainer {
  display: flex;
  justify-content: space-between;
}

.fileListBottomLeftContainer {
  display: flex;
  padding-left: 10px;
  color: gray;
  align-items: center;
  height: 30px;
}

.fileCreateTime {
  margin-left: 8px;
  font-size: 12px;
  margin-top: -2px;
}

.fileListBottomRightContainer {
  margin-right: 30px;
}

.fileManageBottomContainer {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  height: 8%;
  width: 41%;
  border-top: 1px solid #c7c7c7;
}

.uploadButton {
}

.noMoreFile {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: gray;
}
</style>
