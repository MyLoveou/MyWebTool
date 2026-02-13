<template>
  <div class="tool-detail-container">
    <Suspense>
      <template #default>
        <component :is="loadedComponent" />
      </template>
      <template #fallback>
        <el-skeleton :rows="5" animated />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watchEffect, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { useToolRegistryStore } from '@/core/store/tool-registry'

const route = useRoute()
const toolStore = useToolRegistryStore()
const loadedComponent = shallowRef<Component | null>(null)

const toolId = computed(() => route.params.id as string)

// Map of available tool details to their import paths
const toolDetailModules = import.meta.glob('../../tools/*/detail.vue')

watchEffect(async () => {
  // Find tool by ID (assuming path convention /tools/:id)
  const tool = toolStore.tools.find(t => t.id === toolId.value || t.path === `/tools/${toolId.value}`)
  
  if (tool) {
    // Construct the key that matches import.meta.glob
    const key = `../../tools/${tool.componentName}/detail.vue`
    const loader = toolDetailModules[key]
    
    if (loader) {
      loadedComponent.value = defineAsyncComponent(loader as any)
    } else {
      console.error(`Detail component not found for tool: ${tool.componentName}`)
      loadedComponent.value = null
    }
  }
})
</script>

<style scoped>
.tool-detail-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-height: 400px;
}
</style>
