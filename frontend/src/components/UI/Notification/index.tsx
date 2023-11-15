import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import './styles.scss'
import { notification } from '../../../constants/notifications'
import { check, clock } from '../../../assets'
import Link from '../Link'
import { Variants } from '../../../enums'
import { AnimatePresence, motion } from 'framer-motion'

interface props {
  notification: notification
  isRead: boolean
  onClick: () => void
}

const Notification: FC<props> = ({ notification, isRead, onClick }) => {
  return (
    <div className={`notification notification-${isRead ? 'read' : ''}`}>
      <ul className='suptitle'>
        <li key='tabName' className='info'>
          <ReactSVG src={notification.icon} className='icon' />
          <span className='text'>{notification.tabName}</span>
        </li>
        <li key='when' className='info'>
          <ReactSVG src={clock} className='icon' />
          <span className='text'>{notification.when}</span>
        </li>
      </ul>
      <h3 className='title'>{notification.title}</h3>
      <p className='description'>{notification.text}</p>
      <AnimatePresence>
        {!isRead && (
          <motion.div
            initial={{ opacity: 1, marginTop: 0 }}
            exit={{ opacity: 0, marginTop: -20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className='footer'
          >
            <Link
              variant={Variants.primary}
              icon={check}
              text='Mark as Read'
              to='#'
              onClick={onClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Notification
