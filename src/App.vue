<template>
  <div id="app" v-loading.fullscreen.lock="this.$store.state.loading">
    <router-view/>
  </div>
</template>



<script>
  export default {
    // 测试用例
    created () {
       window.sessionStorage.setItem('status',1)
    }, 
    data() {
      return {
        loading: false
      }
    },
}
</script>


<style lang="scss" scoped>

</style>

