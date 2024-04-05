<template>
  <div>
    <div class="mainContainer" v-for="(item,index) in summary" :key="index">
      <div class="citeTextContainer">
        {{ item.content }}
      </div>
      <div class="citeFromFileContainer">
        <div class="citeFromFileFrontContainer">
          <div class="fileImg">
            <img :src="setFileImg(formatCiteName(item.source))" alt="" style="width: 30px;height: 30px;">
          </div>
          <div class="fileName"> {{ formatCiteName(item.source) }}</div>
        </div>
        <div class="downloadButton">
          <vs-icon icon="download" style="cursor: pointer; color: #9f9f9f;"
                   @click="handleDownload(item.source)"></vs-icon>
        </div>
      </div>
      <vs-divider position="left" color="#888" border-style="dashed" >
      </vs-divider>
    </div>
  </div>
</template>

<script>
import {fileImgMap} from '@/utils/imgMap'
import {downloadFile} from "@/api/file";

export default {
  name: "CiteFile",
  props: ['summary'],
  computed: {},
  data() {
    return {
      showIcon: false
    }
  },
  mounted() {
  },
  methods: {
    setFileImg(fileName) {
      let dotIndex = fileName.lastIndexOf('.')
      if (dotIndex !== -1) {
        let type = fileName.substring(dotIndex + 1)
        return fileImgMap.get(type)
      }
    },
    formatCiteName(str) {
      return str.substring(str.lastIndexOf('/') + 1, str.length)
    },
    async handleDownload(name) {
      try {
        this.$vs.loading()
        // 在这里调用下载文件的函数
        const response = await downloadFile(localStorage.getItem('token'), name);

        // 创建一个Blob对象，并将文件流(response.data)存入其中
        const blob = new Blob([response.data], {type: response.data.type});

        // 创建一个a标签，设置其href为Blob对象的URL，以及下载文件的名称
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name.split('/').pop(); // 提取文件名

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
        this.$vs.loading.close()
      } catch (error) {
        console.error('下载文件时发生错误：', error);
        // 处理错误情况，例如提示用户下载失败等
      }
    },
  }
}
</script>

<style lang="css" scoped>
.mainContainer {
  margin-bottom: 30px;
}

.citeTextContainer {
  border-radius: 10px;
  padding: 12px 12px 12px 12px;
  font-size: 14px;
  font-weight: 400;
  background-color: white;
  color: #5e5d5d;
  line-height: 24px;
  border: 1px dashed rgb(23, 201, 100);
  font-family: PingFang, Noto Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  box-shadow: 0px 0px 1px 0px #0000001a, 0px 0.5px 5px 0px #0000001a;;
}

.citeFromFileContainer {
  box-shadow: 0px 0px 1px 0px #0000001a, 0px 0.5px 5px 0px #0000001a;
  border-radius: 10px;
  background-color: white;
  margin-top: 20px;
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.citeFromFileFrontContainer {
  display: flex;
  align-items: center;
}

.fileName {
  margin-left: 20px;
}

.citeFromFileContainer:hover .downloadButton {
  display: flex;
}

.downloadButton {
  display: none;
}
</style>
