<template>
  <!-- 按钮封装 -->
  <el-button
    v-if="type === 'primary'"
    type="primary"
    @click="$emit('click', $event)"
    :disabled="disabled"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
  height: 44px;
  font-size: 14px;
  background-color: #1e73ba;
  border-color: #1e73ba;
  &.is-disabled {
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
}
</style>
