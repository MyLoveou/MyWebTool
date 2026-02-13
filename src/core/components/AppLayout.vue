<template>
  <el-container class="app-layout">
    <el-aside width="240px" class="aside">
      <div class="logo">
        <el-icon><Tools /></el-icon>
        <span>工具平台</span>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        
        <!-- Render categorized menus -->
        <template v-for="(category, catName) in groupedTools" :key="catName">
           <el-sub-menu :index="String(catName)">
              <template #title>
                <el-icon><Menu /></el-icon>
                <span>{{ catName }}</span>
              </template>
              
              <!-- Subcategories -->
              <template v-for="(subItems, subName) in category.subcategories" :key="subName">
                  <el-sub-menu :index="`${catName}-${subName}`">
                    <template #title>{{ subName }}</template>
                    <el-menu-item v-for="tool in subItems" :key="tool.path" :index="tool.path">
                      <el-icon v-if="tool.icon"><component :is="tool.icon" /></el-icon>
                      <span>{{ tool.title }}</span>
                    </el-menu-item>
                  </el-sub-menu>
              </template>

              <!-- Direct items in category -->
              <el-menu-item v-for="tool in category.items" :key="tool.path" :index="tool.path">
                 <el-icon v-if="tool.icon"><component :is="tool.icon" /></el-icon>
                 <span v-else><el-icon><ElementPlus /></el-icon></span>
                 <span>{{ tool.title }}</span>
              </el-menu-item>
           </el-sub-menu>
        </template>

        <!-- Uncategorized Tools (fallback) -->
        <el-sub-menu v-if="uncategorizedTools.length > 0" index="other-tools">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>其他工具</span>
          </template>
          <el-menu-item v-for="tool in uncategorizedTools" :key="tool.path" :index="tool.path">
            <el-icon v-if="tool.icon"><component :is="tool.icon" /></el-icon>
            <span v-else><el-icon><ElementPlus /></el-icon></span>
            <span>{{ tool.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-if="authStore.isAdmin" index="/admin">
           <el-icon><Setting /></el-icon>
           <span>管理后台</span>
        </el-menu-item>
        
        <el-menu-item v-if="authStore.isAuthenticated" @click="handleLogout" index="">
           <el-icon><SwitchButton /></el-icon>
           <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Tools, HomeFilled, Menu, Setting, ElementPlus, SwitchButton } from '@element-plus/icons-vue'
import { useToolRegistryStore, type Tool } from '@/core/store/tool-registry'
import { useAuthStore } from '@/core/store/auth'
import { useRouter } from 'vue-router'
import _ from 'lodash'

const toolStore = useToolRegistryStore()
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// Helper to structure tools
interface CategoryGroup {
  items: Tool[]
  subcategories: Record<string, Tool[]>
}

const groupedTools = computed(() => {
  const groups: Record<string, CategoryGroup> = {}
  
  toolStore.tools.forEach(tool => {
    if (tool.hidden) return

    const category = tool.category
    if (!category) return
    let group = groups[category]
    if (!group) {
      group = { items: [], subcategories: {} }
      groups[category] = group
    }
    const subcategory = tool.subcategory
    if (subcategory) {
      const subItems = group.subcategories[subcategory] ?? (group.subcategories[subcategory] = [])
      subItems.push(tool)
    } else {
      group.items.push(tool)
    }
  })
  return groups
})

const uncategorizedTools = computed(() => {
  return toolStore.tools.filter(t => !t.category && !t.hidden)
})
</script>

<style scoped lang="scss">
.app-layout {
  height: 100vh;
}

.aside {
  background-color: #304156;
  color: white;
  display: flex;
  flex-direction: column;

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    gap: 10px;
    background-color: #2b3a4d;
  }

  .el-menu-vertical {
    border-right: none;
  }
}

.header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
