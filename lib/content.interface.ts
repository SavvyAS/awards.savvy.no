export interface Content {
  pages: Pages
  globals: Globals
}

export interface Globals {
  footer: FooterContent
}

export interface FooterContent {
  address: string
  postal: string
  email: string
  telephone: string
}

export interface Pages {
  home: Home
}

export interface Home {
  metaTitle: string
  metaDescription: string
  heading: string
  ingress: string
  registerContribution: string
  contributions: { points: string, title: string, description: string}[]
  prices: {
    title: string,
    description: string
    yearEnd: PriceItem
    quarterly: PriceItem[]
  }
  points: {
    title: string
    categories: any
    people: any
    items: {
      category: string
      contributor: string
      date: string
    }[]
  }
}
export interface PriceItem {
  imagePath: string,
  title: string,
  description: string
}
