import { FC, ReactNode } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { Variants } from '../../../enums'

interface props {
  type: 'primary' | 'secondary' | 'tertiary'
  variant: Variants
  text?: string
  icon?: string
  onClick?: () => void
  disabled?: boolean
  iconFloat?: 'left' | 'right'
  badge?: ReactNode
}

const Button: FC<props> = ({
  type,
  variant,
  text,
  icon,
  iconFloat,
  onClick,
  disabled,
  badge,
}) => {
  iconFloat = iconFloat || 'left'

  return (
    <button
      className={`btn btn-${type} btn-variant-${variant} ${
        disabled ? 'btn-disabled' : ''
      } ${!text ? 'btn-icon' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconFloat === 'left' && <ReactSVG src={icon} className='icon' />}
      {text && <span className='text'>{text}</span>}
      {icon && iconFloat === 'right' && (
        <ReactSVG src={icon} className='icon' />
      )}
      {badge ? <div className='badge'>{badge}</div> : ''}
    </button>
  )
}

export default Button
