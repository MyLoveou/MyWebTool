<template>
  <div class="recommendation-layout">
    <div class="header-actions">
      <h2>{{ title }}</h2>
      <div class="search-box">
         <el-input
          v-model="searchQuery"
          :placeholder="searchPlaceholder"
          prefix-icon="Search"
          clearable
          class="search-input"
        />
      </div>
    </div>
    
    <div class="filters">
      <div class="filter-group">
        <span class="filter-label">分类:</span>
        <el-radio-group v-model="selectedCategory" size="small">
          <el-radio-button value="all">全部</el-radio-button>
          <el-radio-button v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="filter-group" v-if="allTags.length > 0">
        <span class="filter-label">标签:</span>
        <div class="tag-cloud">
           <el-check-tag 
             v-for="tag in allTags" 
             :key="tag" 
             :checked="selectedTags.includes(tag)"
             @change="toggleTag(tag)"
             class="filter-tag"
           >
             {{ tag }}
           </el-check-tag>
        </div>
      </div>
    </div>

    <el-empty v-if="filteredItems.length === 0" :description="emptyText" />

    <div class="items-grid" v-else>
       <slot 
         name="card" 
         v-for="item in filteredItems" 
         :key="getItemKey(item)" 
         :item="item" 
       ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import _ from 'lodash'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array as () => any[],
    required: true
  },
  searchPlaceholder: {
    type: String,
    default: '搜索...'
  },
  emptyText: {
    type: String,
    default: '未找到相关内容'
  },
  categoryKey: {
    type: String,
    default: 'category'
  },
  tagsKey: {
    type: String,
    default: 'tags'
  },
  titleKey: {
    type: String,
    default: 'name'
  },
  itemKey: {
    type: String,
    default: 'name'
  },
  searchMatcher: {
    type: Function as PropType<(item: any, query: string) => boolean>,
    default: null
  }
})

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedTags = ref<string[]>([])

const allCategories = computed(() => {
  const cats = new Set(props.items.map(item => item[props.categoryKey]))
  return Array.from(cats).filter(Boolean)
})

const allTags = computed(() => {
  const tags = new Set<string>()
  props.items.forEach(item => {
    const itemTags = item[props.tagsKey]
    if (Array.isArray(itemTags)) {
      itemTags.forEach(t => tags.add(t))
    }
  })
  return Array.from(tags).filter(Boolean)
})

const filteredItems = computed(() => {
  return props.items.filter(item => {
    // Filter by category
    if (selectedCategory.value !== 'all' && item[props.categoryKey] !== selectedCategory.value) {
      return false
    }
    
    // Filter by tags
    if (selectedTags.value.length > 0) {
       const itemTags = item[props.tagsKey] || []
       const hasTag = selectedTags.value.some(tag => itemTags.includes(tag))
       if (!hasTag) return false
    }
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      if (props.searchMatcher) {
        return props.searchMatcher(item, query)
      } else {
        // Default simple search: title + category
        const title = String(item[props.titleKey] || '').toLowerCase()
        const category = String(item[props.categoryKey] || '').toLowerCase()
        return title.includes(query) || category.includes(query)
      }
    }
    
    return true
  })
})

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const getItemKey = (item: any) => {
  return item[props.itemKey] || JSON.stringify(item)
}
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-actions h2 {
  margin: 0;
}
.search-box {
  width: 300px;
}
.filters {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.filter-group {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}
.filter-group:last-child {
  margin-bottom: 0;
}
.filter-label {
  font-weight: bold;
  color: #606266;
  font-size: 14px;
  width: 60px;
  flex-shrink: 0;
  margin-top: 5px;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-tag {
  cursor: pointer;
}
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
