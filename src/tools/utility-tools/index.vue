<template>
  <div class="utility-tools-page">
    <h2>实用工具</h2>
    <div class="tools-grid">
      <el-card 
        v-for="tool in utilityTools" 
        :key="tool.id" 
        class="tool-card" 
        shadow="hover"
        @click="$router.push(tool.path)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ tool.title }}</span>
          </div>
        </template>
        <div class="card-desc">
          {{ tool.description || '暂无描述' }}
        </div>
      </el-card>
    </div>
    <el-empty v-if="utilityTools.length === 0" description="暂无工具" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToolRegistryStore } from '@/core/store/tool-registry'

const toolStore = useToolRegistryStore()

const utilityTools = computed(() => {
  return toolStore.tools.filter(t => t.subcategory === '实用工具')
})
</script>

<style scoped>
.utility-tools-page {
  padding: 20px;
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.tool-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.tool-card:hover {
  transform: translateY(-5px);
}
.card-header {
  font-weight: bold;
}
.card-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}
</style>
