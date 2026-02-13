// Shared configuration for admin resources
export interface FormField {
  prop: string
  label: string
  type?: 'text' | 'textarea' | 'tags' | 'json' | 'markdown' | 'works-list'
}

export const adminConfigs: Record<string, { label: string; formFields: FormField[] }> = {
  authors: {
    label: '作者',
    formFields: [
      { prop: 'name', label: '姓名' },
      { prop: 'category', label: '分类' },
      { prop: 'life_span', label: '生卒年' },
      { prop: 'avatar_url', label: '头像链接' },
      { prop: 'desc', label: '简介', type: 'textarea' },
      { prop: 'details', label: '详细介绍', type: 'markdown' },
      { prop: 'honors', label: '荣誉' },
      { prop: 'tags', label: '标签', type: 'tags' },
      { prop: 'works', label: '代表作', type: 'works-list' }
    ]
  },
  novels: {
    label: '小说',
    formFields: [
      { prop: 'name', label: '书名' },
      { prop: 'author', label: '作者' },
      { prop: 'category', label: '分类' },
      { prop: 'desc', label: '简介', type: 'textarea' },
      { prop: 'details', label: '详细介绍', type: 'markdown' },
      { prop: 'tags', label: '标签', type: 'tags' }
    ]
  },
  software: {
    label: '软件',
    formFields: [
      { prop: 'name', label: '软件名' },
      { prop: 'category', label: '分类' },
      { prop: 'link', label: '链接' },
      { prop: 'desc', label: '描述', type: 'textarea' },
      { prop: 'details', label: '详细介绍', type: 'markdown' },
      { prop: 'tags', label: '标签', type: 'tags' }
    ]
  },
  'quick-links': {
    label: '网站导航',
    formFields: [
      { prop: 'name', label: '网站名' },
      { prop: 'category', label: '分类' },
      { prop: 'url', label: '链接' },
      { prop: 'icon', label: '图标链接' },
      { prop: 'desc', label: '简述' },
      { prop: 'detailed_desc', label: '详细描述', type: 'textarea' }
    ]
  }
}
