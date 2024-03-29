<template>
  <div class="knowledgeFileManagementContainer">
    <div class="fileManagementTop">
      <vs-button radius color="dark" type="flat" icon="chevron_left" style="margin-right: 20px;"></vs-button>
      <div class="breadCrumbContainer">/knowledge/dir/item/zheshi/zhangsan</div>
    </div>
    <div class="fileListContainer">

    </div>
    <div class="fileManageBottomContainer">
      <vs-chip style="font-size: 16px;margin-left: 20px;margin-right: 20px;">
        知识库： {{ knowledgeId }}
      </vs-chip>
      <vs-button size="large" color="primary" type="flat" icon="window" @click="newDirDialogActivePrompt = true;">
        新建文件夹
      </vs-button>
      <vs-button size="large" color="success" type="flat" icon="upload" @click="uploadFileToKnowledge">
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
</template>


<script>


export default {
  name: 'FileManage',
  data() {
    return {
      knowledgeId: null,
      newDirDialogActivePrompt: false,
      newDirName: '',
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
  methods: {
    newDir() {
      this.$vs.notify({
        color: 'success',
        title: '新建文件夹成功',
        text: `成功新建：${this.newDirName}`
      })
      this.newDirName = ''
    },
    uploadFileToKnowledge() {

    }
  },
}
</script>

<style lang="css" scoped>
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

.fileListContainer {
  height: 86%;
}

.fileManageBottomContainer {
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 0;
  height: 8%;
  width: 41%;
  border-top: 1px solid #c7c7c7;
}
</style>
