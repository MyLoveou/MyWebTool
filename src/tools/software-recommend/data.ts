export interface App {
  name: string
  desc: string
  link: string
  tags: string[]
  category: string
}

export const allApps: App[] = [
  { name: 'Visual Studio Code', desc: '微软出品的轻量级代码编辑器，插件生态丰富。', link: 'https://code.visualstudio.com/', tags: ['编辑器', '微软', '开源'], category: '开发工具' },
  { name: 'Git', desc: '分布式版本控制系统，开发者必备。', link: 'https://git-scm.com/', tags: ['VCS', '命令行', 'Linux'], category: '开发工具' },
  { name: 'Docker Desktop', desc: '容器化平台，快速构建和部署应用。', link: 'https://www.docker.com/', tags: ['容器', '虚拟化', '部署'], category: '开发工具' },
  { name: 'Postman', desc: 'API 开发和测试工具。', link: 'https://www.postman.com/', tags: ['API', '测试', '调试'], category: '开发工具' },
  { name: 'Notion', desc: '全能笔记与协作工具。', link: 'https://www.notion.so/', tags: ['笔记', '文档', '协作'], category: '效率办公' },
  { name: 'Snipaste', desc: '简单强大的截图贴图工具。', link: 'https://www.snipaste.com/', tags: ['截图', '贴图', 'Windows'], category: '效率办公' },
  { name: 'Figma', desc: '基于浏览器的协作界面设计工具。', link: 'https://www.figma.com/', tags: ['设计', 'UI/UX', '协作'], category: '设计创意' },
  { name: 'Obsidian', desc: '基于本地 Markdown 文件的知识管理工具。', link: 'https://obsidian.md/', tags: ['笔记', 'Markdown', '知识库'], category: '效率办公' }
]
