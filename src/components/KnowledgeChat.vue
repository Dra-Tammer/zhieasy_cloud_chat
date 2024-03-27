<template>
  <div>
    知识库问答的界面{{ fileId }}
  </div>
</template>


<script>
export default {
  name: 'KnowledgeChat',
  data() {
    return {
      fileId: ''
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
  }
}
</script>

<style lang="css" scoped>

</style>
