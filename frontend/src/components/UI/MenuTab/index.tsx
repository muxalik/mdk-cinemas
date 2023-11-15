import { FC, MouseEventHandler, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { link } from '../../../constants/sidebarLinks'
import { ReactSVG } from 'react-svg'
import { chevronDown } from '../../../assets'
import NotificationBadge from '../NotificationBadge'
import './styles.scss'
import { Variants } from '../../../enums'
import { useSnapshot } from 'valtio'
import { state } from '../../../storage'

interface props {
  link: link
}

const MenuTab: FC<props> = ({ link }) => {
  const snap = useSnapshot(state)
  const location = useLocation()

  const [showTree, setShowTree] = useState(
    location.pathname.startsWith(link.link)
  )

  const handleClick: MouseEventHandler = (e) => {
    if (link.items) {
      setShowTree(!showTree)
      e.preventDefault()
    }
  }

  return (
    <MotionConfig
      transition={{
        type: 'tween',
        duration: 0.25,
      }}
    >
      <li key={link.id} className='menu-tab'>
        <NavLink
          to={link.link}
          className={`link ${link.items ? 'has-tree' : ''}`}
          onClick={handleClick}
        >
          {link.icon && link.float === 'left' && (
            <ReactSVG src={link.icon} className='icon' />
          )}
          <p className='text'>{link.text}</p>
          {link.icon && link.float === 'right' && (
            <ReactSVG src={link.icon} className='icon' />
          )}
          {link.items && (
            <motion.div
              animate={showTree ? { rotate: 180 } : { rotate: 0 }}
              className='chevron-wrapper'
            >
              <ReactSVG src={chevronDown} className='icon-chevron' />
            </motion.div>
          )}
          {link.badge && (
            <div className='badge'>
              <NotificationBadge
                variant={Variants.danger}
                type='solid'
                value={link.badge}
              />
            </div>
          )}
        </NavLink>
        {link.items && (
          <motion.ul
            variants={{
              hidden: {
                height: 0,
                opacity: 0,
                marginTop: 0,
                paddingTop: 0,
                paddingBottom: 0,
              },
              show: {
                height:
                  link.items.length * 40 + (link.items.length - 1) * 8 + 4,
                opacity: 1,
                marginTop: 8,
                paddingTop: 2,
                paddingBottom: 2,
              },
            }}
            initial='hidden'
            animate={showTree && !snap.sidebarCollapsed ? 'show' : 'hidden'}
            className='list tree'
          >
            {link.items.map((sublink) => (
              <li key={sublink.id} className='item'>
                <NavLink
                  to={sublink.link}
                  className='link'
                  {...(showTree ? {} : { tabIndex: -1 })}
                >
                  <p className='text'>{sublink.text}</p>
                  {link.badge && (
                    <div className='badge'>
                      <NotificationBadge
                        variant={Variants.danger}
                        type='solid'
                        value={link.badge}
                      />
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </li>
    </MotionConfig>
  )
}

export default MenuTab
