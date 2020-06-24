<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<script>
  export default {
    // 测试用例
    created () {
       window.sessionStorage.setItem('status',1)
    },    
}
</script>


<style lang="scss" scoped>

</style>

