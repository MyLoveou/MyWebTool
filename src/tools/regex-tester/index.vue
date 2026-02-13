<template>
  <div class="regex-tester">
    <h2>正则表达式测试</h2>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form label-position="top">
          <el-form-item label="正则表达式">
             <el-input v-model="regexStr" placeholder="例如: \d+" size="large">
                <template #prepend>/</template>
                <template #append>/{{ flags }}</template>
             </el-input>
          </el-form-item>
          <el-form-item label="修饰符">
            <el-checkbox-group v-model="flagList">
              <el-checkbox label="g" value="g">全局匹配 (g)</el-checkbox>
              <el-checkbox label="i" value="i">忽略大小写 (i)</el-checkbox>
              <el-checkbox label="m" value="m">多行模式 (m)</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="测试文本">
            <el-input v-model="testStr" type="textarea" :rows="6" placeholder="在此输入待测试的文本..." />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-card header="常用正则">
          <el-button-group class="preset-group">
            <el-button v-for="(item, index) in commonRegex" :key="index" size="small" @click="applyRegex(item.value)">
              {{ item.name }}
            </el-button>
          </el-button-group>
        </el-card>
      </el-col>
    </el-row>
    
    <el-divider content-position="left">匹配结果</el-divider>
    
    <div class="result-box" v-html="highlightedResult"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const regexStr = ref('\\d+')
const testStr = ref('Hello 123 World 456')
const flagList = ref(['g'])

const flags = computed(() => flagList.value.join(''))

const commonRegex = [
  { name: '数字', value: '\\d+' },
  { name: '邮箱', value: '[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?' },
  { name: '手机号', value: '1[3-9]\\d{9}' },
  { name: '身份证', value: '\\d{15}|\\d{18}' },
  { name: '中文', value: '[\\u4e00-\\u9fa5]' },
]

const applyRegex = (val: string) => {
  regexStr.value = val
}

const highlightedResult = computed(() => {
  if (!regexStr.value) return testStr.value
  
  try {
    const re = new RegExp(regexStr.value, flags.value)
    // We need to be careful with replace if it's not global
    // But for visualization, global makes most sense usually.
    // If user didn't select 'g', it only highlights first one.
    
    // HTML Escape function to prevent XSS in the output
    const escapeHtml = (unsafe: string) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    // Split string by matches to handle highlighting correctly
    // This is complex to do perfectly with replace, but for simple highlighting:
    return testStr.value.replace(re, (match) => `<span style="background: #ffd700; border-radius: 2px; box-shadow: 0 0 2px #aaa;">${escapeHtml(match)}</span>`)
  } catch (e) {
    return `<span style="color: red;">Error: ${(e as Error).message}</span>`
  }
})
</script>

<style scoped>
.preset-group {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.preset-group .el-button {
  margin-left: 0 !important;
  margin-bottom: 5px;
}
.result-box {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px;
  min-height: 150px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
  background-color: #fff;
  line-height: 1.5;
}
</style>
