import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tool_platform.settings')
django.setup()

from api.models import Author, Novel, Software, QuickLink

def seed_authors():
    if Author.objects.exists():
        return
    print("Seeding Authors...")
    authors_data = [
      { 
        "name": '刘慈欣', 
        "category": '科幻',
        "tags": ['硬科幻', '雨果奖', '中国作家'],
        "desc": '中国科幻第一人，雨果奖得主，擅长宏大叙事和硬科幻。',
        "works": [
          { "title": '三体', "url": 'https://book.douban.com/subject/2567698/' },
          { "title": '流浪地球', "url": 'https://book.douban.com/subject/3034870/' },
          { "title": '球状闪电', "url": 'https://book.douban.com/subject/1075014/' }
        ],
        "avatar_url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Liu_Cixin_2023_%28cropped%29.jpg/440px-Liu_Cixin_2023_%28cropped%29.jpg',
        "details": '刘慈欣（1963年6月23日－），中国当代科幻作家，自1990年代开始发表科幻作品，曾连续九次获得中国科幻银河奖。2015年，凭借《三体》获第73届世界科幻大会颁发的雨果奖最佳长篇小说奖，为亚洲首次获奖。他的作品宏伟大气、想象绚丽，既注重极端空灵和厚重现实的结合，也讲求科学的内涵和美感，具有浓郁的中国特色和鲜明的个人风格。',
        "life_span": '1963 - 至今',
        "honors": '雨果奖最佳长篇小说奖、中国科幻银河奖特别奖、华语科幻星云奖终身成就奖'
      },
      { 
        "name": '金庸', 
        "category": '武侠',
        "tags": ['传统文学', '历史', '中国作家'],
        "desc": '武侠小说泰斗，作品影响了几代华人，构建了独特的江湖世界。',
        "works": [
          { "title": '射雕英雄传', "url": 'https://book.douban.com/subject/1004183/' },
          { "title": '神雕侠侣', "url": 'https://book.douban.com/subject/1005886/' },
          { "title": '天龙八部', "url": 'https://book.douban.com/subject/1003479/' },
          { "title": '笑傲江湖', "url": 'https://book.douban.com/subject/1004245/' },
          { "title": '鹿鼎记', "url": 'https://book.douban.com/subject/1003445/' }
        ],
        "avatar_url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Jin_Yong_%28Louis_Cha%29_20070723.jpg/440px-Jin_Yong_%28Louis_Cha%29_20070723.jpg',
        "details": '金庸（1924年3月10日－2018年10月30日），本名查良镛，生于浙江海宁，是华人界最知名的武侠小说作家、新闻学家、企业家、政治评论家、社会活动家。他被誉为“香港四大才子”之一。金庸的武侠小说在华人世界影响深远，被誉为“有华人的地方，就有金庸的武侠小说”。他的作品多次被改编为电视剧、电影、广播剧等，对中国流行文化产生了巨大的影响。',
        "life_span": '1924 - 2018',
        "honors": '大紫荆勋章、法国荣誉军团骑士勋章、剑桥大学荣誉博士'
      },
      { 
        "name": '阿加莎·克里斯蒂', 
        "category": '推理',
        "tags": ['经典', '悬疑', '英国作家'],
        "desc": '推理小说女王，作品销量仅次于圣经和莎士比亚。',
        "works": [
          { "title": '无人生还', "url": 'https://book.douban.com/subject/1162982/' },
          { "title": '东方快车谋杀案', "url": 'https://book.douban.com/subject/1291809/' },
          { "title": '尼罗河上的惨案', "url": 'https://book.douban.com/subject/1473209/' },
          { "title": '罗杰疑案', "url": 'https://book.douban.com/subject/3116843/' }
        ],
        "avatar_url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Agatha_Christie.png/440px-Agatha_Christie.png',
        "details": '阿加莎·玛丽·克拉丽莎·克里斯蒂（Dame Agatha Mary Clarissa Christie，1890年9月15日－1976年1月12日），英国侦探小说作家。她创作了80部侦探小说和短篇故事集，19部剧本，以及以玛丽·维斯特马科特（Mary Westmacott）为笔名创作的6部爱情小说。她的作品已被翻译成103种语言，总销量突破20亿本。她创造了赫尔克里·波洛和简·马普尔这两位世界著名的侦探形象。',
        "life_span": '1890 - 1976',
        "honors": '大英帝国爵级司令勋章 (DBE)、推理大师奖'
      }
    ]
    for data in authors_data:
        Author.objects.create(**data)

def seed_novels():
    if Novel.objects.exists():
        return
    print("Seeding Novels...")
    novels_data = [
      { "name": '三体', "author": '刘慈欣', "desc": '中国科幻的巅峰之作，讲述了人类与三体文明的博弈。', "category": '科幻', "tags": ['硬科幻', '中国', '雨果奖'] },
      { "name": '银河帝国', "author": '阿西莫夫', "desc": '宏大的太空歌剧，描绘了银河帝国的兴衰。', "category": '科幻', "tags": ['太空歌剧', '经典', '美国'] },
      { "name": '沙丘', "author": '弗兰克·赫伯特', "desc": '融合了政治、宗教、生态的史诗巨著。', "category": '科幻', "tags": ['史诗', '政治', '生态'] },
      { "name": '魔戒', "author": 'J.R.R. 托尔金', "desc": '现代奇幻文学的鼻祖，构建了宏大的中土世界。', "category": '奇幻', "tags": ['史诗', '魔法', '经典'] },
      { "name": '冰与火之歌', "author": '乔治·R·R·马丁', "desc": '史诗般的奇幻小说，充满了政治斗争和权力游戏。', "category": '奇幻', "tags": ['权谋', '史诗', 'HBO改编'] },
      { "name": '哈利·波特', "author": 'J.K. 罗琳', "desc": '风靡全球的魔法世界冒险故事。', "category": '奇幻', "tags": ['魔法', '校园', '成长'] },
      { "name": '百年孤独', "author": '加西亚·马尔克斯', "desc": '魔幻现实主义文学的代表作，讲述了布恩迪亚家族七代人的传奇故事。', "category": '魔幻现实', "tags": ['诺贝尔奖', '家族史', '拉美文学'] },
      { "name": '1984', "author": '乔治·奥威尔', "desc": '著名的反乌托邦小说，描绘了一个极权主义社会。', "category": '反乌托邦', "tags": ['政治', '经典', '讽刺'] }
    ]
    for data in novels_data:
        Novel.objects.create(**data)

def seed_software():
    if Software.objects.exists():
        return
    print("Seeding Software...")
    software_data = [
      { "name": 'Visual Studio Code', "desc": '微软出品的轻量级代码编辑器，插件生态丰富。', "link": 'https://code.visualstudio.com/', "tags": ['编辑器', '微软', '开源'], "category": '开发工具' },
      { "name": 'Git', "desc": '分布式版本控制系统，开发者必备。', "link": 'https://git-scm.com/', "tags": ['VCS', '命令行', 'Linux'], "category": '开发工具' },
      { "name": 'Docker Desktop', "desc": '容器化平台，快速构建和部署应用。', "link": 'https://www.docker.com/', "tags": ['容器', '虚拟化', '部署'], "category": '开发工具' },
      { "name": 'Postman', "desc": 'API 开发和测试工具。', "link": 'https://www.postman.com/', "tags": ['API', '测试', '调试'], "category": '开发工具' },
      { "name": 'Notion', "desc": '全能笔记与协作工具。', "link": 'https://www.notion.so/', "tags": ['笔记', '文档', '协作'], "category": '效率办公' },
      { "name": 'Snipaste', "desc": '简单强大的截图贴图工具。', "link": 'https://www.snipaste.com/', "tags": ['截图', '贴图', 'Windows'], "category": '效率办公' },
      { "name": 'Figma', "desc": '基于浏览器的协作界面设计工具。', "link": 'https://www.figma.com/', "tags": ['设计', 'UI/UX', '协作'], "category": '设计创意' },
      { "name": 'Obsidian', "desc": '基于本地 Markdown 文件的知识管理工具。', "link": 'https://obsidian.md/', "tags": ['笔记', 'Markdown', '知识库'], "category": '效率办公' }
    ]
    for data in software_data:
        Software.objects.create(**data)

def seed_quick_links():
    if QuickLink.objects.exists():
        return
    print("Seeding Quick Links...")
    # Flattened data based on what I saw in data.ts
    links_data = [
      # 开发社区
      { 
        "name": 'GitHub', 
        "url": 'https://github.com', 
        "desc": '全球最大的代码托管平台',
        "detailed_desc": 'GitHub 是一个面向开源及私有软件项目的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。',
        "category": '开发社区'
      },
      { 
        "name": 'Stack Overflow', 
        "url": 'https://stackoverflow.com', 
        "desc": '开发者问答社区',
        "detailed_desc": 'Stack Overflow 是一个与程序设计相关的IT技术问答网站。用户可以在网站免费提交问题，浏览问题，索引相关内容，在创建主页的时候使用简单的HTML。',
        "category": '开发社区'
      },
      { 
        "name": '掘金', 
        "url": 'https://juejin.cn', 
        "desc": '中文技术社区',
        "detailed_desc": '掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。',
        "category": '开发社区'
      },
      { 
        "name": 'V2EX', 
        "url": 'https://www.v2ex.com', 
        "desc": '创意工作者社区',
        "detailed_desc": 'V2EX 是一个汇集了各类奇妙好玩的话题和流行动向的网站。',
        "category": '开发社区'
      },
      # 文档与资源
      { 
        "name": 'MDN Web Docs', 
        "url": 'https://developer.mozilla.org', 
        "desc": 'Web 开发权威文档',
        "detailed_desc": 'MDN Web Docs（旧称Mozilla Developer Network、Mozilla Developer Center，简称MDN）是一个汇集众多Mozilla基金会产品和网络技术开发文档的免费网站。',
        "category": '文档与资源'
      },
      { 
        "name": 'Vue.js', 
        "url": 'https://vuejs.org', 
        "desc": '渐进式 JavaScript 框架',
        "detailed_desc": 'Vue.js 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型。',
        "category": '文档与资源'
      },
      { 
        "name": 'Element Plus', 
        "url": 'https://element-plus.org', 
        "desc": '基于 Vue 3 的组件库',
        "detailed_desc": 'Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。',
        "category": '文档与资源'
      },
      # 设计与灵感
      { 
        "name": 'Dribbble', 
        "url": 'https://dribbble.com', 
        "desc": '设计师灵感社区',
        "detailed_desc": 'Dribbble 是一个面向创作家、艺术工作者、设计师等创意类作品的人群，提供作品在线服务，供网友在线查看已经完成的作品或者正在创作的作品的交流网站。',
        "category": '设计与灵感'
      },
      { 
        "name": 'Behance', 
        "url": 'https://www.behance.net', 
        "desc": 'Adobe 旗下创意展示',
        "detailed_desc": 'Behance 是 2006 年创立的著名设计社区，在 2012 年被 Adobe 收购。',
        "category": '设计与灵感'
      }
    ]
    for data in links_data:
        QuickLink.objects.create(**data)

if __name__ == '__main__':
    seed_authors()
    seed_novels()
    seed_software()
    seed_quick_links()
    print("Done.")
