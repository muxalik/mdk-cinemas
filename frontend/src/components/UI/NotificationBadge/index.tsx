import { FC } from 'react'

import './styles.scss'
import { formatNotificationNumber } from '../../../utils/formatNotificationNumber'
import { Variants } from '../../../enums'

export interface notificationProps {
  type: 'solid' | 'soft'
  variant: Variants
  value: number
}

const NotificationBadge: FC<notificationProps> = ({ type, variant, value }) => {
  return (
    <div
      className={`notification-badge notification-${type} notification-${variant}`}
    >
      {formatNotificationNumber(value)}
    </div>
  )
}

export default NotificationBadge
