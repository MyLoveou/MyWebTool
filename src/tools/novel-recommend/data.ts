export interface Novel {
  name: string
  author: string
  desc: string
  category: string
  tags: string[]
}

export const novels: Novel[] = [
  { name: '三体', author: '刘慈欣', desc: '中国科幻的巅峰之作，讲述了人类与三体文明的博弈。', category: '科幻', tags: ['硬科幻', '中国', '雨果奖'] },
  { name: '银河帝国', author: '阿西莫夫', desc: '宏大的太空歌剧，描绘了银河帝国的兴衰。', category: '科幻', tags: ['太空歌剧', '经典', '美国'] },
  { name: '沙丘', author: '弗兰克·赫伯特', desc: '融合了政治、宗教、生态的史诗巨著。', category: '科幻', tags: ['史诗', '政治', '生态'] },
  { name: '魔戒', author: 'J.R.R. 托尔金', desc: '现代奇幻文学的鼻祖，构建了宏大的中土世界。', category: '奇幻', tags: ['史诗', '魔法', '经典'] },
  { name: '冰与火之歌', author: '乔治·R·R·马丁', desc: '史诗般的奇幻小说，充满了政治斗争和权力游戏。', category: '奇幻', tags: ['权谋', '史诗', 'HBO改编'] },
  { name: '哈利·波特', author: 'J.K. 罗琳', desc: '风靡全球的魔法世界冒险故事。', category: '奇幻', tags: ['魔法', '校园', '成长'] },
  { name: '百年孤独', author: '加西亚·马尔克斯', desc: '魔幻现实主义文学的代表作，讲述了布恩迪亚家族七代人的传奇故事。', category: '魔幻现实', tags: ['诺贝尔奖', '家族史', '拉美文学'] },
  { name: '1984', author: '乔治·奥威尔', desc: '著名的反乌托邦小说，描绘了一个极权主义社会。', category: '反乌托邦', tags: ['政治', '经典', '讽刺'] }
]
