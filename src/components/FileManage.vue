<template>
  <div id="main_container">
<!--    文件资源管理页面{{ fileId }}-->
<!--    网盘的菜单栏-->
    <div class="head">
          <vs-navbar v-model="activeItem" class="nabarx">
            <div slot="title">
              <vs-navbar-title index="$route.path">
<!--                这里不知道怎么将当前路由路径的id取过来,props?-->
<!--                {{ item.name}}-->
                <p>个人知识库</p>
              </vs-navbar-title>
            </div>
            <vs-navbar-item index="0">
              <vs-button type="line">上传</vs-button>
            </vs-navbar-item>
            <vs-navbar-item index="1">
              <vs-button type="line">新建</vs-button>
            </vs-navbar-item>
            <vs-navbar-item index="2">
              <vs-checkbox v-model="checkBox1">全选</vs-checkbox>
            </vs-navbar-item>
            <vs-input icon="search" placeholder="输入你想找的文件名" v-model="search"/>
          </vs-navbar>
    </div>

<!--    下面的组件是用来进行文件类型的识别(如果匹配到文件类型,则渲染标签)  -->
    <FileType></FileType>

    <div class="foot">
      <div>
        <vs-pagination :total="40" v-model="currentx" class="Pagination"></vs-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import FileType from "@/filetype/File_type.vue";
export default {
  name: 'FileManage',
  components: {FileType},
  data() {
    return {
      fileId: '',
      knowledgeList: [
        {id: '001', name: '个人知识库', groupCount: 30},
        {id: '002', name: 'marks的知识库', groupCount: 310},
        {id: '003', name: 'mike的知识库', groupCount: 230},
        {id: '004', name: 'java知识库', groupCount: 330},
        {id: '005', name: '公司人事知识库', groupCount: 30},
        {id: '006', name: '公司财务知识库', groupCount: 40},
      ],
      search: '',
      activeItem: 0,
      currentx: 11
    }
  },
  created() {
    let path = this.$route.path.split('/')
    this.fileId = path[path.length - 1]
    this.$watch(
        () => this.$route.params,
        (toParams, preParams) => {
          console.log(preParams)
          this.fileId = toParams.id
        }
    )
  },
  methods: {
    //上传文件方法


  },
}
</script>

<style lang="css" scoped>
.head{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  background-color: #d3e3fe;
}

.foot{
  display: flex;
  margin-top: 100%;
  justify-content: center;
}

</style>
