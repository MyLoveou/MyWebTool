import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Tool {
  id: string
  title: string
  path: string
  icon?: string
  componentName: string
  description?: string
  category?: string // Top-level menu category
  subcategory?: string // Second-level menu category
  hidden?: boolean // If true, hide from sidebar menu
}

export const useToolRegistryStore = defineStore('toolRegistry', () => {
  const tools = ref<Tool[]>([
    {
      id: 'utility-tools',
      title: '实用工具',
      path: '/tools/utility-tools',
      componentName: 'utility-tools',
      description: '包含常用的开发与效率工具',
      category: '常用工具'
    },
    {
      id: 'regex-tester',
      title: '正则测试',
      path: '/tools/regex-tester',
      componentName: 'regex-tester',
      description: '正则表达式在线测试工具',
      category: '常用工具',
      subcategory: '实用工具',
      hidden: true
    },
    {
      id: 'quick-links',
      title: '网站导航',
      path: '/tools/quick-links',
      componentName: 'quick-links',
      description: '常用开发网站快速跳转',
      category: '常用工具'
    },
    {
      id: 'software-recommend',
      title: '软件推荐',
      path: '/tools/software-recommend',
      componentName: 'software-recommend',
      description: '精选开发与效率软件推荐',
      category: '推荐'
    },
    {
      id: 'novel-recommend',
      title: '小说推荐',
      path: '/tools/novel-recommend',
      componentName: 'novel-recommend',
      description: '精选科幻奇幻小说推荐',
      category: '推荐'
    },
    {
      id: 'author-recommend',
      title: '作者推荐',
      path: '/tools/author-recommend',
      componentName: 'author-recommend',
      description: '知名小说作者介绍',
      category: '推荐'
    }
  ])

  const registerTool = (tool: Tool) => {
    // Avoid duplicates
    if (!tools.value.find(t => t.id === tool.id)) {
      tools.value.push(tool)
    }
  }

  const setTools = (newTools: Tool[]) => {
    tools.value = newTools
  }

  return {
    tools,
    registerTool,
    setTools
  }
})
