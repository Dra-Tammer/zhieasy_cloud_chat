<template>
  <div class="knowledgeFileManagementContainer">
    <div class="fileManagementTop">
      <vs-button radius color="dark" type="flat" icon="chevron_left" style="margin-right: 10px;"
                 @click="goBackward"></vs-button>
      <div class="breadCrumbContainer">
        <vs-chip style="font-size: 16px;color: gray;" v-if="fileBreadCrumbPath.length !== 0">
          {{ this.fileBreadCrumbPath }}
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
                       @click="downloadFile(item)"></vs-icon>
            </div>
          </div>
          <div class="fileListBottomContainer">
            <div class="fileListBottomLeftContainer">
              <vs-icon icon="browse_gallery" style="color: gray;font-size: 16px;"></vs-icon>
              <div class="fileCreateTime">{{ item.time }}</div>
            </div>
            <div class="fileListBottomRightContainer">
              <vs-icon v-if="!item.isDir" icon="delete" style="cursor: pointer; color: #9f9f9f;"
                       @click="deleteFile(item)"></vs-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fileManageBottomContainer">
      <vs-chip style="font-size: 16px;margin-left: 20px;margin-right: 100px;">
        知识库： {{ knowledgeId }}
      </vs-chip>
      <div>
        <vs-button size="large" color="primary" type="flat" icon="window" @click="newDirDialogActivePrompt = true;">
          新建文件夹
        </vs-button>
        <vs-button size="large" color="success" type="flat" icon="upload" @click="uploadFileToKnowledge"
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
      </div>
    </div>
  </div>
</template>


<script>

import {fileImgMap} from '@/utils/imgMap'
import {downloadFile, newDir} from "@/api/file";

export default {
  name: 'FileManage',
  data() {
    return {
      knowledgeId: null,
      newDirDialogActivePrompt: false,
      newDirName: '',
      fileList: [
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.jpg',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.doc',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.pdf',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.c',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide',
          isDir: true,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.gif',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.exe',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.go',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.css',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.sql',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.svg',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.txt',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
        {
          name: 'chat_doc_user_guide.png',
          isDir: false,
          time: '2024-03-24'
        },
      ],
      fileBreadCrumbPath: '/knowledge/dirone/dirtwo/dirthree',
      dirName: '',
    }
  },
  computed: {},
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
  mounted() {
    this.getFileList()
  },
  methods: {
    newDir() {
      newDir(localStorage.getItem('token'), this.newDirName).then((res) => {
        console.log(res)
      })
      this.$vs.notify({
        color: 'success',
        title: '新建文件夹成功',
        text: `成功新建：${this.newDirName}`
      })
      this.newDirName = ''
    },
    uploadFileToKnowledge() {

    },
    async downloadFile(item) {
      console.log('下载', item.name)
      await downloadFile(localStorage.getItem('token'), item.name).then((res) => {
        // 创建一个 Blob 对象
        const blob = new Blob([res.data], {type: res.headers['content-type']});

        // 创建一个临时链接
        const url = window.URL.createObjectURL(blob);

        // 创建一个 a 标签
        const link = document.createElement('a');
        link.href = url;

        // 设置下载的文件名
        const contentDisposition = res.headers['content-disposition'];
        const fileName = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');
        link.setAttribute('download', fileName);

        // 触发点击事件，下载文件
        document.body.appendChild(link);
        link.click();

        // 清理临时链接
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
    },
    deleteFile(item) {
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
      this.$vs.notify({
        color: 'danger',
        title: '删除',
        text: '文件删除成功'
      })
    },
    enterDir(item) {
      if (item.isDir) {
        this.fileList = this.fileList.slice(1, 3)
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

    },
    goBackward() {
      let str = this.fileBreadCrumbPath
      this.fileBreadCrumbPath = str.substring(0, str.lastIndexOf('/'))
      this.dirName = str.substring(str.lastIndexOf('/') + 1, str.length)
      console.log(this.dirName)
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


</style>
