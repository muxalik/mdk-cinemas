import { FC } from 'react'

import './styles.scss'
import { Variants } from '../../../enums'

interface props {
  variant: Variants
  size: 'sm' | 'md'
  text: string
}

const Label: FC<props> = ({ variant, size, text }) => {
  return <span className={`label label-${variant} label-${size}`}>{text}</span>
}

export default Label