<template>
  <div class="userInfo">
    <el-header style="padding: 0">
      <Header></Header>
    </el-header>
  </div>
</template>

<script>
    import chartCard from "../components/chartCard";
    import Header from "@/components/header";
    export default {
        name: "personalInfo",
        components: {
          Header,
        },
    }
</script>

<style scoped>

</style>
