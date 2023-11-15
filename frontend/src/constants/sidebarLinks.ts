import {
  building,
  calendarAlt,
  earphone,
  gear,
  movie,
  user,
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
    id: 2,
    icon: movie,
    text: 'Movies',
    link: '/movies',
    float: 'left',
  },
  {
    id: 3,
    icon: user,
    text: 'Actors',
    link: '/actors',
    float: 'left',
  },
  {
    id: 4,
    icon: calendarAlt,
    text: 'Sessions',
    link: '/sessions',
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
