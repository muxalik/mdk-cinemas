import { logout } from '../assets'

type link = {
  id: number
  title: string
  to: string
  icon?: string
}

export const profileLinks: link[] = [
  {
    id: 1,
    title: 'Profile',
    to: '/profile',
  },
  {
    id: 2,
    title: 'Settings',
    to: '/settings',
  },
  {
    id: 3,
    title: 'Sign Out',
    to: '/logout',
    icon: logout,
  },
]
