import { FC, useState } from 'react'
import MenuIcon from '../../../components/UI/MenuIcon'
import { arrowRight, check, gear, notification } from '../../../assets'
import Popup from '../../../components/UI/Popup'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { notifications } from '../../../constants/notifications'
import Notification from '../../../components/UI/Notification'
import MyLink from '../../../components/UI/Link'
import { Variants } from '../../../enums'
import './styles.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface props {
  active: boolean
  setActive: (id: string | null) => void
}

const Notifications: FC<props> = ({ active, setActive }) => {
  const [readMessages, setReadMessages] = useState(() => {
    return notifications.filter((item) => item.isRead).map((item) => item.id)
  })

  const ref = useOutsideClick(() => {
    active && setActive(null)
  })

  return (
    <li key='notifications' className='control notifications'>
      <div ref={ref}>
        <MenuIcon
          icon={notification}
          active={active}
          onClick={() => {
            setActive(active ? null : 'notifications')
          }}
          badge={3}
        />
        <Popup show={active} props={{ x: '50%' }}>
          <div className='header'>
            <h2 className='title'>Notifications</h2>
            <Link to='/settings' className='link'>
              <ReactSVG src={gear} className='icon' />
            </Link>
          </div>
          <div className='body scrollbar'>
            <ul className='list'>
              {notifications.map((item) => (
                <li key={item.id} className='item'>
                  <Notification
                    isRead={readMessages.includes(item.id)}
                    notification={item}
                    onClick={() => setReadMessages([...readMessages, item.id])}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className='actions'>
            <MyLink
              icon={check}
              to='#'
              text='Mark All as Read'
              variant={Variants.primary}
              onClick={() =>
                setReadMessages(notifications.map((item) => item.id))
              }
            />
            <MyLink
              icon={arrowRight}
              to='/notifications'
              text='See More'
              variant={Variants.primary}
            />
          </div>
        </Popup>
      </div>
    </li>
  )
}

export default Notifications
