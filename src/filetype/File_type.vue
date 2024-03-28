<template>
  <div>
<!--    下面就是通过返回的文件类型,加载标签-->
    <div class="files">
<!--      图像标签-->
      <div class="img" v-if="type.includes('image')">
        <img v-lazy="cover_url" />
<!--      标记收藏(不知道有没有,先放着)-->
        <i class="icon-star-on" v-if="isCollection"></i>
      </div>
<!--      音乐文件-->
      <div class="audio" v-else-if="isMp3">
        <img :src="require('@/assets/mp3.svg')" />
        <i class="icon-star-on" v-if="isCollection"></i>
      </div>
<!--      压缩文件-->
      <div class="zip" v-else-if="isZip">
        <img :src="require('@/assets/zip.svg')" />
        <i class="icon-star-on" v-if="isCollection"></i>
      </div>
      <!--      pdf文件-->
      <div class="pdf" v-else-if="isPdf">
        <img :src="require('@/assets/pdf.svg')" />
        <i class="icon-star-on" v-if="isCollection"></i>
      </div>
      <!--      word文档-->
      <div class="doc" v-else-if="isDoc">
        <img :src="require('@/assets/doc.svg')" />
        <i class="icon-star-on" v-if="isCollection"></i>
      </div>

<!--      底下这部分的图片资源还没有找到-->

<!--            txt文件-->
<!--      <div class="text" v-else-if="isTxt">-->
<!--        <img :src="require('@/assets/txt.svg')" />-->
<!--        <i class="el-icon-star-on" v-if="isCollection"></i>-->
<!--      </div>-->
<!--            xls文件-->
<!--      <div class="text" v-else-if="isXls">-->
<!--        <img :src="require('@/assets/txt.svg')" />-->
<!--        <i class="el-icon-star-on" v-if="isCollection"></i>-->
<!--      </div>-->
<!--            png文件-->
<!--      <div class="text" v-else-if="isPng">-->
<!--        <img :src="require('@/assets/txt.svg')" />-->
<!--        <i class="el-icon-star-on" v-if="isCollection"></i>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script >
import FileType from "./FileType";
export default{
  name:'File_Type',
  data() {
    return {}
  },
  methods:{},
  // 将js脚本中的函数引入到当前组件当中
  mixins: [FileType],
}

</script>

<style scoped lang="css">
.files {
  width: 100px;
  height: 100px;

  & > div {
    width: 100px;
    height: 100px;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 100px;
    }

    .icon-star-on {
      position: absolute;
      right: -20px;
      top: 0px;
      color: gold;
      font-size: 25px;
    }
  }
}
</style>