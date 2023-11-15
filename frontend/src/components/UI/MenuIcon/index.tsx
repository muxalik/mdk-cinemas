import { FC } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import NotificationBadge from '../NotificationBadge'
import { Variants } from '../../../enums'

interface props {
  icon: string
  badge?: number
  active?: boolean
  onClick: () => void
}

const MenuIcon: FC<props> = ({ icon, badge, active, onClick }) => {
  return (
    <button
      className={`menu-icon ${active ? 'button-active' : ''}`}
      onClick={onClick}
    >
      <ReactSVG src={icon} className='icon' />
      <div className='badge'>
        {badge && (
          <NotificationBadge
            variant={Variants.danger}
            type='solid'
            value={badge}
          />
        )}
      </div>
    </button>
  )
}

export default MenuIcon
