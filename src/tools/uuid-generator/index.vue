<template>
  <div class="uuid-generator">
    <div class="controls">
      <el-form inline>
        <el-form-item label="生成数量">
          <el-input-number v-model="count" :min="1" :max="100" />
        </el-form-item>
        <el-form-item label="连字符">
          <el-switch v-model="hyphens" active-text="开启" inactive-text="关闭" />
        </el-form-item>
        <el-form-item label="大小写">
          <el-radio-group v-model="uppercase">
            <el-radio-button :value="false">小写</el-radio-button>
            <el-radio-button :value="true">大写</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generate">生成 UUID</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="result-area">
      <el-input
        v-model="result"
        type="textarea"
        :rows="15"
        readonly
        placeholder="生成的 UUID 将显示在这里"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(5)
const hyphens = ref(true)
const uppercase = ref(false)
const result = ref('')

const generateUUID = () => {
  let d = new Date().getTime()
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

const generate = () => {
  const uuids = []
  for (let i = 0; i < count.value; i++) {
    let uuid = generateUUID()
    if (!hyphens.value) {
      uuid = uuid.replace(/-/g, '')
    }
    if (uppercase.value) {
      uuid = uuid.toUpperCase()
    }
    uuids.push(uuid)
  }
  result.value = uuids.join('\n')
}

// Generate on mount
generate()
</script>

<style scoped>
.uuid-generator {
  max-width: 800px;
}
.controls {
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>
