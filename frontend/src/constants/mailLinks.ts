type link = {
  id: number
  text: string
  to: string
  badge?: number
}

export const mailLinks: link[] = [
  {
    id: 1,
    text: 'Chat',
    to: '/chat',
    badge: 16,
  },
  {
    id: 2,
    text: 'Discussion',
    to: '/discussion',
    badge: 48,
  },
  {
    id: 3,
    text: 'Reviews',
    to: '/reviews',
  },
  {
    id: 4,
    text: 'Support',
    to: '/support',
  },
]
