import {
  cart,
  earphone,
  gear,
  gridAlt,
  lineChartUp,
  shoppingBag,
  store,
  users,
} from '../assets'

export type link = {
  id: number
  icon?: string
  text: string
  link: string
  badge?: number
  float: 'left' | 'right'
  items?: {
    id: number
    text: string
    link: string
    badge?: number
  }[]
}

export const sidebarTopLinks: link[] = [
  {
    id: 1,
    icon: gridAlt,
    text: 'Dashboard',
    link: '/',
    float: 'left',
  },
  {
    id: 2,
    icon: shoppingBag,
    text: 'Products',
    link: '/products',
    items: [
      {
        id: 1,
        text: 'Product List',
        link: '/products/list',
      },
      {
        id: 2,
        text: 'Add Product',
        link: '/products/create',
      },
    ],
    float: 'left',
  },
  {
    id: 3,
    icon: cart,
    text: 'Orders',
    link: '/orders',
    float: 'left',
  },
  {
    id: 4,
    icon: users,
    text: 'Customers',
    link: '/customers',
    float: 'left',
  },
  {
    id: 5,
    icon: store,
    text: 'Sellers',
    link: '/sellers',
    float: 'left',
    badge: 1000,
  },
  {
    id: 6,
    icon: lineChartUp,
    text: 'Analytics',
    link: '/analytics',
    float: 'left',
    badge: 100,
  },
]

export const sidebarBottomLinks: link[] = [
  {
    id: 1,
    icon: earphone,
    text: 'Support',
    link: '/support',
    float: 'left',
  },
  {
    id: 2,
    icon: gear,
    text: 'Settings',
    link: '/settings',
    float: 'left',
  },
]
