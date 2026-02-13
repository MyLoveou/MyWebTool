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

