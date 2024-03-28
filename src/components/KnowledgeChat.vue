<template>
  <div>
    知识库问答的界面{{ fileId }}
    <vs-button @click.native="demo">测试一手</vs-button>
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
  },
  methods: {
    demo() {
      this.$vs.dialog({
        color: 'danger',
        title: '我草泥马',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        accept: this.acceptAlert
      })
    },
    acceptAlert() {
      this.$vs.notify({
        color: 'success',
        title: 'Accept Selected',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
