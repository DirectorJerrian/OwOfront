<template>
  <div id="app">
    <!--    <img src="http://software-engineering-iii.oss-cn-hangzhou.aliyuncs.com/all/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "app",
    provide() {
      return {
        reload: this.reload
      }
    },
    nodes() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }
</style>
