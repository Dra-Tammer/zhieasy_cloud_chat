<template>
  <div>
    <div class="mainContainer" v-for="(item,index) in summary" :key="index">
      <div class="citeTextContainer">
        {{ item.content }}
      </div>
      <div class="citeFromFileContainer">
        <div class="fileImg">
          <img :src="setFileImg(formatCiteName(item.source))" alt="" style="width: 30px;height: 30px;">
        </div>
        <div class="fileName"> {{ formatCiteName(item.source) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {fileImgMap} from '@/utils/imgMap'
import {downloadFile} from "@/api/file";

export default {
  name: "CiteFile",
  props: ['summary'],
  computed: {
    summaryWithBr() {
      return this.summary.replace(/\n/g, '<br>');
    }
  },
  data() {
    return {}
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
    formatCiteName(str) {
      return str.substring(str.lastIndexOf('/') + 1, str.length)
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
}

.fileName {
  margin-left: 20px;
}
</style>
