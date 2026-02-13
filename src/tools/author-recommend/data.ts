export interface Work {
  title: string
  url: string
}

export interface Author {
  name: string
  category: string
  tags: string[]
  desc: string
  works: Work[]
  avatarUrl: string
  details: string
  lifeSpan?: string
  honors?: string
}

export const authors: Author[] = [
  { 
    name: '刘慈欣', 
    category: '科幻',
    tags: ['硬科幻', '雨果奖', '中国作家'],
    desc: '中国科幻第一人，雨果奖得主，擅长宏大叙事和硬科幻。',
    works: [
      { title: '三体', url: 'https://book.douban.com/subject/2567698/' },
      { title: '流浪地球', url: 'https://book.douban.com/subject/3034870/' },
      { title: '球状闪电', url: 'https://book.douban.com/subject/1075014/' }
    ],
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Liu_Cixin_2023_%28cropped%29.jpg/440px-Liu_Cixin_2023_%28cropped%29.jpg',
    details: '刘慈欣（1963年6月23日－），中国当代科幻作家，自1990年代开始发表科幻作品，曾连续九次获得中国科幻银河奖。2015年，凭借《三体》获第73届世界科幻大会颁发的雨果奖最佳长篇小说奖，为亚洲首次获奖。他的作品宏伟大气、想象绚丽，既注重极端空灵和厚重现实的结合，也讲求科学的内涵和美感，具有浓郁的中国特色和鲜明的个人风格。',
    lifeSpan: '1963 - 至今',
    honors: '雨果奖最佳长篇小说奖、中国科幻银河奖特别奖、华语科幻星云奖终身成就奖'
  },
  { 
    name: '金庸', 
    category: '武侠',
    tags: ['传统文学', '历史', '中国作家'],
    desc: '武侠小说泰斗，作品影响了几代华人，构建了独特的江湖世界。',
    works: [
      { title: '射雕英雄传', url: 'https://book.douban.com/subject/1004183/' },
      { title: '神雕侠侣', url: 'https://book.douban.com/subject/1005886/' },
      { title: '天龙八部', url: 'https://book.douban.com/subject/1003479/' },
      { title: '笑傲江湖', url: 'https://book.douban.com/subject/1004245/' },
      { title: '鹿鼎记', url: 'https://book.douban.com/subject/1003445/' }
    ],
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Jin_Yong_%28Louis_Cha%29_20070723.jpg/440px-Jin_Yong_%28Louis_Cha%29_20070723.jpg',
    details: '金庸（1924年3月10日－2018年10月30日），本名查良镛，生于浙江海宁，是华人界最知名的武侠小说作家、新闻学家、企业家、政治评论家、社会活动家。他被誉为“香港四大才子”之一。金庸的武侠小说在华人世界影响深远，被誉为“有华人的地方，就有金庸的武侠小说”。他的作品多次被改编为电视剧、电影、广播剧等，对中国流行文化产生了巨大的影响。',
    lifeSpan: '1924 - 2018',
    honors: '大紫荆勋章、法国荣誉军团骑士勋章、剑桥大学荣誉博士'
  },
  { 
    name: '阿加莎·克里斯蒂', 
    category: '推理',
    tags: ['经典', '悬疑', '英国作家'],
    desc: '推理小说女王，作品销量仅次于圣经和莎士比亚。',
    works: [
      { title: '无人生还', url: 'https://book.douban.com/subject/1162982/' },
      { title: '东方快车谋杀案', url: 'https://book.douban.com/subject/1291809/' },
      { title: '尼罗河上的惨案', url: 'https://book.douban.com/subject/1473209/' },
      { title: '罗杰疑案', url: 'https://book.douban.com/subject/3116843/' }
    ],
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Agatha_Christie.png/440px-Agatha_Christie.png',
    details: '阿加莎·玛丽·克拉丽莎·克里斯蒂（Dame Agatha Mary Clarissa Christie，1890年9月15日－1976年1月12日），英国侦探小说作家。她创作了80部侦探小说和短篇故事集，19部剧本，以及以玛丽·维斯特马科特（Mary Westmacott）为笔名创作的6部爱情小说。她的作品已被翻译成103种语言，总销量突破20亿本。她创造了赫尔克里·波洛和简·马普尔这两位世界著名的侦探形象。',
    lifeSpan: '1890 - 1976',
    honors: '大英帝国爵级司令勋章 (DBE)、推理大师奖'
  }
]
