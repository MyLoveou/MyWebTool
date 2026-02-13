<template>
  <div class="base64-converter">
    <div class="actions">
      <el-button type="primary" @click="encode">Base64 编码</el-button>
      <el-button type="success" @click="decode">Base64 解码</el-button>
      <el-button type="danger" plain @click="clear">清空</el-button>
    </div>
    <div class="editors">
      <div class="editor-container">
        <div class="label">原文 / 密文</div>
        <el-input
          v-model="inputStr"
          type="textarea"
          :rows="15"
          placeholder="请输入内容..."
          resize="none"
        />
      </div>
      <div class="editor-container">
        <div class="label">结果</div>
        <el-input
          v-model="outputStr"
          type="textarea"
          :rows="15"
          readonly
          resize="none"
          placeholder="转换结果..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const inputStr = ref('')
const outputStr = ref('')

const encode = () => {
  try {
    outputStr.value = btoa(unescape(encodeURIComponent(inputStr.value)))
  } catch (e) {
    ElMessage.error('编码失败')
  }
}

const decode = () => {
  try {
    outputStr.value = decodeURIComponent(escape(atob(inputStr.value)))
  } catch (e) {
    ElMessage.error('无效的 Base64 字符串')
  }
}

const clear = () => {
  inputStr.value = ''
  outputStr.value = ''
}
</script>

<style scoped>
.base64-converter {
  height: 100%;
}
.actions {
  margin-bottom: 15px;
}
.editors {
  display: flex;
  gap: 20px;
}
.editor-container {
  flex: 1;
}
.label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #606266;
}
</style>
