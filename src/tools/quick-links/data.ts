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

