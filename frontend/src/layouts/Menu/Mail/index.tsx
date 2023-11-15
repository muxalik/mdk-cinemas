import { FC } from 'react'
import MenuIcon from '../../../components/UI/MenuIcon'
import { envelope } from '../../../assets'
import Popup from '../../../components/UI/Popup'
import { mailLinks } from '../../../constants/mailLinks'
import { Link } from 'react-router-dom'
import NotificationBadge from '../../../components/UI/NotificationBadge'
import { Variants } from '../../../enums'
import './styles.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface props {
  active: boolean
  setActive: (id: string | null) => void
}

const Mail: FC<props> = ({ active, setActive }) => {
  const ref = useOutsideClick(() => {
    active && setActive(null)
  })

  return (
    <li key='envelope' className='control mail'>
      <div ref={ref}>
        <MenuIcon
          icon={envelope}
          active={active}
          onClick={() => {
            setActive(active ? null : 'mail')
          }}
          badge={64}
        />
        <Popup show={active} props={{ x: '50%' }}>
          <ul className='links'>
            {mailLinks.map((link) => (
              <li key={link.id} className='item'>
                <Link to={link.to} className='link'>
                  <span className='text'>{link.text}</span>
                  {link.badge && (
                    <NotificationBadge
                      variant={Variants.danger}
                      type='solid'
                      value={link.badge}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Popup>
      </div>
    </li>
  )
}

export default Mail
