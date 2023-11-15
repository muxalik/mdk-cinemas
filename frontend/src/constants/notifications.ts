import { cart, shoppingBag } from '../assets'

export type notification = {
  id: number
  icon: string
  tabName: string
  when: string
  title: string
  text: string
  isRead: boolean
}

export const notifications: notification[] = [
  {
    id: 1,
    icon: cart,
    tabName: 'Orders',
    when: '1 min ago',
    title: 'New Order #30854',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.',
    isRead: false,
  },
  {
    id: 2,
    icon: cart,
    tabName: 'Orders',
    when: '2 hour ago',
    title: 'Order #30851 Has Been Shiped',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.',
    isRead: false,
  },
  {
    id: 3,
    icon: shoppingBag,
    tabName: 'Products',
    when: '1 day ago',
    title: 'Your Product “Imac 2021” Out of Stock',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.',
    isRead: false,
  },
  {
    id: 4,
    icon: shoppingBag,
    tabName: 'Products',
    when: '2 day ago',
    title: 'New product available',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.',
    isRead: false,
  },
]
