import {
  building,
  cart,
  earphone,
  gear,
  gridAlt,
  lineChartUp,
  movie,
  shoppingBag,
  store,
  user,
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
    icon: building,
    text: 'Cinemas',
    link: '/cinemas',
    float: 'left',
  },
  {
    id: 3,
    icon: movie,
    text: 'Movies',
    link: '/movies',
    float: 'left',
  },
  {
    id: 4,
    icon: user,
    text: 'Performers',
    link: '/performers',
    float: 'left',
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
