<template>
  <div class="admin-editor">
    <el-page-header @back="goBack" :content="pageTitle" class="page-header" />
    
    <el-card class="editor-card" v-loading="loading">
      <el-form 
        ref="formRef"
        :model="formData" 
        label-width="120px"
        class="editor-form"
      >
        <template v-for="field in formFields" :key="field.prop">
          <el-form-item :label="field.label" :prop="field.prop">
            
            <!-- Text Input -->
            <el-input 
              v-if="field.type === 'text' || !field.type" 
              v-model="formData[field.prop]" 
              :placeholder="'请输入' + field.label"
            />
            
            <!-- Textarea -->
            <el-input 
              v-else-if="field.type === 'textarea'" 
              type="textarea"
              v-model="formData[field.prop]" 
              :placeholder="'请输入' + field.label"
              :rows="5"
            />

            <!-- Tags Input with Autocomplete -->
            <el-select
              v-else-if="field.type === 'tags'"
              v-model="formData[field.prop]"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="请输入标签并回车"
              :loading="suggestionsLoading"
              @focus="() => fetchSuggestions(field.prop)"
            >
              <el-option
                v-for="item in suggestions[field.prop] || []"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>

            <!-- Markdown Editor -->
            <div v-else-if="field.type === 'markdown'">
              <MdEditor
                v-if="!loading"
                v-model="formData[field.prop]"
                style="height: 500px; margin-bottom: 20px"
              />
            </div>

            <!-- Works List Editor -->
            <div v-else-if="field.type === 'works-list'">
              <div v-for="(work, index) in formData[field.prop]" :key="index" class="work-item">
                <el-input v-model="work.title" placeholder="作品名称" style="width: 200px; margin-right: 10px" />
                <el-input v-model="work.url" placeholder="链接地址" style="flex: 1; margin-right: 10px" />
                <el-button type="danger" circle size="small" @click="removeWork(index as number)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <el-button type="primary" plain size="small" @click="addWork">
                <el-icon><Plus /></el-icon> 添加作品
              </el-button>
            </div>

            <!-- JSON Input -->
            <el-input
               v-else-if="field.type === 'json'"
               :model-value="JSON.stringify(formData[field.prop], null, 2)"
               @input="(val: string) => handleJsonInput(val, field.prop)"
               type="textarea"
               :rows="8"
               placeholder="请输入 JSON 格式数据"
            />

          </el-form-item>
        </template>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { getResource, createResource, updateResource } from '@/core/api/client'
import { adminConfigs } from '@/core/config/admin-config'

const route = useRoute()
const router = useRouter()

const resource = route.params.resource as string
const id = route.params.id as string
const isEdit = !!id

const config = adminConfigs[resource]
if (!config) {
  ElMessage.error('无效的资源类型')
  router.push('/admin')
}

const formFields = config?.formFields || []
const pageTitle = computed(() => config ? `${isEdit ? '编辑' : '新增'}${config.label}` : '加载中...')

const formData = reactive<Record<string, any>>({})
const loading = ref(false)
const submitting = ref(false)
const suggestionsLoading = ref(false)
const suggestions = reactive<Record<string, string[]>>({})

// Initialize form data
const initForm = () => {
  formFields.forEach(field => {
    if (field.type === 'tags') {
      formData[field.prop] = []
    } else if (field.type === 'json' || field.type === 'works-list') {
      formData[field.prop] = [] 
    } else {
      formData[field.prop] = ''
    }
  })
}

const fetchData = async () => {
  if (!isEdit) return
  
  loading.value = true
  try {
    // Ideally we need getResourceById but our generic getResource returns list or we use getResource with ID
    // Our backend supports /api/resource/{id}/ so we can use generic get but we need a specific method or modify client
    // Actually client.ts doesn't have getResourceById, let's just use axios directly or add it.
    // wait, client.ts: export const getResource = (resource: string) => apiClient.get(`/${resource}/`)
    // We need to fetch specific item.
    // Let's assume we can fetch list and find it OR we implement getOne.
    // Ideally getOne. Let's use direct axios call for now to avoid modifying client again if possible, 
    // OR better, update client.ts properly.
    // Let's assume we update client.ts or just use the existing one if it supported ID.
    // Actually I can just do:
    const res = await getResource(`${resource}/${id}`)
    Object.assign(formData, res.data)
    
    // Debug
    console.log('Fetched data:', res.data)
    console.log('FormData after assign:', formData)
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const fetchSuggestions = async (fieldProp: string) => {
  // Only for tags/categories
  // We can fetch all items of this resource and extract unique values for this field
  if (suggestions[fieldProp] && suggestions[fieldProp].length > 0) return

  suggestionsLoading.value = true
  try {
    const res = await getResource(resource)
    const items = res.data
    const values = new Set<string>()
    
    items.forEach((item: any) => {
      const val = item[fieldProp]
      if (Array.isArray(val)) {
        val.forEach(v => values.add(v))
      } else if (typeof val === 'string') {
        values.add(val)
      }
    })
    
    suggestions[fieldProp] = Array.from(values)
  } catch (e) {
    console.error(e)
  } finally {
    suggestionsLoading.value = false
  }
}

const addWork = () => {
  if (!formData.works) formData.works = []
  formData.works.push({ title: '', url: '' })
}

const removeWork = (index: number) => {
  formData.works.splice(index, 1)
}

const handleJsonInput = (val: string, prop: string) => {
  try {
    formData[prop] = JSON.parse(val)
  } catch (e) {
    // ignore
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    if (isEdit) {
      await updateResource(resource, id, formData)
      ElMessage.success('更新成功')
    } else {
      await createResource(resource, formData)
      ElMessage.success('创建成功')
    }
    goBack()
  } catch (error) {
    ElMessage.error(isEdit ? '更新失败' : '创建失败')
    console.error(error)
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  router.push('/admin')
}

onMounted(() => {
  initForm()
  fetchData()
})
</script>

<style scoped>
.admin-editor {
  padding: 20px;
  background-color: white;
  min-height: 100vh;
}
.page-header {
  margin-bottom: 20px;
}
.editor-card {
  max-width: 800px;
  margin: 0 auto;
}
.work-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
