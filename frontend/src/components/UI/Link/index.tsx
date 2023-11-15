import { FC } from 'react'
import { Link as ReactLink } from 'react-router-dom'

import './styles.scss'
import { Variants } from '../../../enums'
import { ReactSVG } from 'react-svg'

interface props {
  text: string
  icon?: string
  iconFloat?: 'left' | 'right'
  variant: Variants
  to: string
  onClick?: () => void
}

const Link: FC<props> = ({ text, icon, iconFloat, variant, to, onClick }) => {
  iconFloat = iconFloat || 'left'
  
  return (
    <ReactLink
      to={to}
      className={`custom-link link-${variant}`}
      onClick={onClick}
    >
      {icon && iconFloat === 'left' && <ReactSVG src={icon} className='icon' />}
      <span className='text'>{text}</span>
      {icon && iconFloat === 'right' && (
        <ReactSVG src={icon} className='icon' />
      )}
    </ReactLink>
  )
}

export default Link
