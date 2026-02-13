import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { MdEditor, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import '@/core/styles/main.scss'

import App from './App.vue'
import router from '@/core/router'
import pinia from '@/core/store'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('MdEditor', MdEditor)
app.component('MdPreview', MdPreview)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
