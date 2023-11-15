import { FC } from 'react'

import './styles.scss'
import { Variants } from '../../../enums'
import { ReactSVG } from 'react-svg'

interface props {
  variant: Variants
  size: 'sm' | 'md'
  icon: string
}

const CircleIcon: FC<props> = ({ variant, icon, size }) => (
  <div className={`circle-icon icon-${variant} icon-${size}`}>
    <ReactSVG src={icon} className='icon' />
  </div>
)

export default CircleIcon
