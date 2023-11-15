import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import './styles.scss'
import { check, minus } from '../../../assets'

type float = 'left' | 'right'

interface props {
  type?: 'default' | 'all'
  checked?: boolean
  onChange: (isChecked: boolean) => void
  label?: string
  labelFloat?: float
  icon?: string
  iconFloat?: float
  isColor?: boolean
}

const Checkbox: FC<props> = ({
  type,
  checked,
  onChange,
  label,
  labelFloat,
  icon,
  iconFloat,
  isColor,
}) => {
  type = type || 'default'
  labelFloat = labelFloat || 'right'
  iconFloat = iconFloat || 'right'

  return (
    <label className='checkbox'>
      <input
        type='checkbox'
        className='input'
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      {icon && !isColor && iconFloat === 'left' && (
        <ReactSVG src={icon} className='icon' />
      )}
      {icon && isColor && iconFloat === 'left' && (
        <div className='circle' style={{ backgroundColor: icon }} />
      )}
      {label && labelFloat === 'left' && <span className='label'>{label}</span>}
      <div className='box'>
        <ReactSVG
          src={type === 'default' ? check : minus}
          className='inner-icon'
        />
      </div>
      {icon && !isColor && iconFloat === 'right' && (
        <ReactSVG src={icon} className='icon' />
      )}
      {icon && isColor && iconFloat === 'right' && (
        <div className='circle' style={{ backgroundColor: icon }} />
      )}
      {label && labelFloat === 'right' && (
        <span className='label'>{label}</span>
      )}
    </label>
  )
}

export default Checkbox
