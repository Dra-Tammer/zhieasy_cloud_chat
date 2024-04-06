<template>
  <div>
    <div class="mainContainer">
      <div class="titleBox">
        <div class="title">
          <span>Zhieasy</span>
          <span style="color: #4B70E2;"> Knowledge</span>
          <span> Assistant </span>
        </div>
        <div class="titleContent">构建文档知识库，高效检索信息，精确回答问题</div>
      </div>
      <div class="detailContainer">
        <div class="mainContent">
          <vs-card>
            <div slot="header" class="h2Title">
              <h2>
                知识库问答
              </h2>
            </div>
            <div class="cardFont">
              <div>基于大语言模型的知识库问答创新平台。</div>
              <div>依据私有化，轻量化的设计初衷。企业可以简单的在本地私有化部署一个内部的知识库共享平台。</div>
              <div>提供知识理解和搜索能力的知识库问答服务</div>
            </div>
            <vs-divider color="success"></vs-divider>
            <div class="cardFooter">
              <div>
                从个人空间开始！上传文件，开始问答！
              </div>
              <div>还可以创建其他知识库，针对性检索信息！</div>
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-chip color="primary" style="font-size: 14px;">
                  准确
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  可靠
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  高效
                </vs-chip>
              </vs-row>
            </div>
          </vs-card>
        </div>
        <div class="mainContent">
          <vs-card>
            <div slot="header" class="h2Title">
              <h2>
                个人AI助手
              </h2>
            </div>
            <div class="cardMainContainer">
              <div class="cardFont">
                <div>快来和我交流吧！我可以为你答疑解惑，创作文案，生成创意，成为你的高效智能助手。</div>
                <div>打开智慧之门，与最先进的人工智能对话，解锁无限的创意和知识，开启与未来的交流</div>
                <div>问你想问，精确回答！</div>
              </div>
              <vs-divider color="success"></vs-divider>
              <div class="cardFooter">
                <div>点击下方输入框</div>
                <div>直接在下方进行问答吧</div>
              </div>
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-chip color="primary" style="font-size: 14px;">
                  智能
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  迅速
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  全面
                </vs-chip>
              </vs-row>
            </div>
          </vs-card>
        </div>
        <div class="mainContent">
          <vs-card>
            <div slot="header" class="h2Title">
              <h2>
                个人 / 团队文件管理
              </h2>
            </div>
            <div class="cardFont">
              <div>无论是个人文件整理还是团队协作，我们的云文件管理系统能够帮助您轻松管理、自动进行文档的分析，让工作更加井井有条，合作更加流畅无阻。</div>
              <div>对象化文件存储，网盘功能</div>
            </div>
            <vs-divider color="success"></vs-divider>
            <div class="cardFooter">
              <div>点击知识库，上传，下载或者删除</div>
              <div>开始管理个人或者团队文件！</div>
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-chip color="primary" style="font-size: 14px;">
                  便捷
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  安全
                </vs-chip>
                <vs-chip color="primary" style="font-size: 14px;">
                  协作
                </vs-chip>
              </vs-row>
            </div>
          </vs-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PrimaryChatAd",
  computed: {},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>


<style lang="css" scoped>
.mainContainer {
  width: 100%;
}

.title {
  width: 100%;
  text-align: center;
  font-family: Alimama ShuHeiTi;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.titleContent {
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.detailContainer {
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 12px;
  box-sizing: border-box;
  padding-top: 48px;
  display: flex;
  justify-content: space-between;
}

.mainContent {
  width: 31%;
  height: 400px;
  background-color: white;
  border-radius: 8px;
}

.h2Title {
  color: #4B70E2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardFont {
  font-size: 14px;
  line-height: 36px;
  color: gray;
  height: 180px;
}

.cardFooter {
  font-size: 14px;
  line-height: 30px;
  color: #4B70E2;
  font-weight: bold;
}
</style>
