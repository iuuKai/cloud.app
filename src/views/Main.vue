<template>
  <el-container style="height: 100vh">
    <el-header height="52px">
      <CommonHeader></CommonHeader>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'

export default {
  components: {
    CommonHeader
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #e7e7e7;
}
</style>
