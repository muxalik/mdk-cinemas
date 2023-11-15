import { FC } from 'react'
import { ReactSVG } from 'react-svg'
import { motion } from 'framer-motion'

import { avatar, chevronDown } from '../../../assets'
import './styles.scss'
import Popup from '../../../components/UI/Popup'
import { profileLinks } from '../../../constants/profileLinks'
import { Link } from 'react-router-dom'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface props {
  active: boolean
  setActive: (id: null | string) => void
}

const User: FC<props> = ({ active, setActive }) => {
  const ref = useOutsideClick(() => {
    active && setActive(null)
  })

  return (
    <div ref={ref} className='user-wrapper'>
      <button
        className='user'
        onClick={() => setActive(active ? null : 'profile')}
      >
        <div className='avatar'>
          <img src={avatar} alt='Avatar' className='image' />
          <div className='circle' />
        </div>
        <div className='info'>
          <p className='name'>Jay Hargudson</p>
          <p className='position'>Main Admin</p>
        </div>
        <motion.div
          animate={active ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: 'tween', duration: 0.15 }}
          className='chevron'
        >
          <ReactSVG src={chevronDown} />
        </motion.div>
      </button>
      <Popup show={active}>
        <ul className='links'>
          {profileLinks.map((link) => (
            <li key={link.id} className='item'>
              <Link to={link.to} className='link'>
                <span className='text'>{link.title}</span>
                {link.icon && <ReactSVG src={link.icon} className='icon' />}
              </Link>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  )
}

export default User
