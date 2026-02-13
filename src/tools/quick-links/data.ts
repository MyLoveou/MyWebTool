export interface BaseLinkItem {
  name: string
  url: string
  desc: string
  icon?: string
  detailedDesc?: string
}

export interface LinkItem extends BaseLinkItem {
  category: string
}

export const linkCategories: { title: string; links: BaseLinkItem[] }[] = [
  {
    title: '开发社区',
    links: [
      { 
        name: 'GitHub', 
        url: 'https://github.com', 
        desc: '全球最大的代码托管平台',
        detailedDesc: 'GitHub 是一个面向开源及私有软件项目的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。'
      },
      { 
        name: 'Stack Overflow', 
        url: 'https://stackoverflow.com', 
        desc: '开发者问答社区',
        detailedDesc: 'Stack Overflow 是一个与程序设计相关的IT技术问答网站。用户可以在网站免费提交问题，浏览问题，索引相关内容，在创建主页的时候使用简单的HTML。'
      },
      { 
        name: '掘金', 
        url: 'https://juejin.cn', 
        desc: '中文技术社区',
        detailedDesc: '掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。'
      },
      { 
        name: 'V2EX', 
        url: 'https://www.v2ex.com', 
        desc: '创意工作者社区',
        detailedDesc: 'V2EX 是一个汇集了各类奇妙好玩的话题和流行动向的网站。'
      }
    ]
  },
  {
    title: '文档与资源',
    links: [
      { 
        name: 'MDN Web Docs', 
        url: 'https://developer.mozilla.org', 
        desc: 'Web 开发权威文档',
        detailedDesc: 'MDN Web Docs（旧称Mozilla Developer Network、Mozilla Developer Center，简称MDN）是一个汇集众多Mozilla基金会产品和网络技术开发文档的免费网站。'
      },
      { 
        name: 'Vue.js', 
        url: 'https://vuejs.org', 
        desc: '渐进式 JavaScript 框架',
        detailedDesc: 'Vue.js 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型。'
      },
      { 
        name: 'Element Plus', 
        url: 'https://element-plus.org', 
        desc: '基于 Vue 3 的组件库',
        detailedDesc: 'Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。'
      }
    ]
  },
  {
    title: '设计与灵感',
    links: [
      { 
        name: 'Dribbble', 
        url: 'https://dribbble.com', 
        desc: '设计师灵感社区',
        detailedDesc: 'Dribbble 是一个面向创作家、艺术工作者、设计师等创意类作品的人群，提供作品在线服务，供网友在线查看已经完成的作品或者正在创作的作品的交流网站。'
      },
      { 
        name: 'Behance', 
        url: 'https://www.behance.net', 
        desc: 'Adobe 旗下创意展示',
        detailedDesc: 'Behance 是 2006 年创立的著名设计社区，在 2012 年被 Adobe 收购。'
      }
    ]
  }
]

// Helper to get flat list if needed
export const allLinks = linkCategories.flatMap(cat => 
  cat.links.map(link => ({
    ...link,
    category: cat.title
  }))
)
