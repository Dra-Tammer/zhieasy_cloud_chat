<template>
  <div>
    文件资源管理和知识库对话
    {{ $route.query }}
  </div>
</template>


<script>
export default {
  name: 'KnowledgePlace',
  props: ['id'],
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.query)
  }
}
</script>

<style lang="css" scoped>

</style>
