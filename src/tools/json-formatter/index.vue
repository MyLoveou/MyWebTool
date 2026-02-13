<template>
  <div class="json-formatter">
    <div class="actions">
      <el-button type="primary" @click="formatJson">格式化</el-button>
      <el-button @click="minifyJson">压缩</el-button>
      <el-button type="danger" plain @click="clear">清空</el-button>
    </div>
    <div class="editors">
      <div class="editor-container">
        <div class="label">输入 JSON</div>
        <el-input
          v-model="inputJson"
          type="textarea"
          :rows="20"
          placeholder="在此粘贴 JSON..."
          resize="none"
        />
      </div>
      <div class="editor-container">
        <div class="label">结果</div>
        <el-input
          v-model="outputJson"
          type="textarea"
          :rows="20"
          readonly
          resize="none"
          placeholder="结果将显示在这里..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const inputJson = ref('')
const outputJson = ref('')

const formatJson = () => {
  try {
    if (!inputJson.value.trim()) return
    const obj = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(obj, null, 2)
  } catch (e) {
    ElMessage.error('无效的 JSON 格式')
    outputJson.value = (e as Error).message
  }
}

const minifyJson = () => {
  try {
    if (!inputJson.value.trim()) return
    const obj = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(obj)
  } catch (e) {
    ElMessage.error('无效的 JSON 格式')
    outputJson.value = (e as Error).message
  }
}

const clear = () => {
  inputJson.value = ''
  outputJson.value = ''
}
</script>

<style scoped>
.json-formatter {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.actions {
  margin-bottom: 15px;
}
.editors {
  display: flex;
  gap: 20px;
  flex: 1;
}
.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #606266;
}
</style>
