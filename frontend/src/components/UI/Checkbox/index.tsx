import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import './styles.scss'
import { check, minus } from '../../../assets'

type float = 'left' | 'right'

interface props {
  id?: string | number
  type?: 'default' | 'all'
  checked?: boolean
  onChange: (isChecked: boolean) => void
  label?: string
  labelFloat?: float
  icon?: string
  iconFloat?: float
  isColor?: boolean
  labelOneLine?: boolean
}

const Checkbox: FC<props> = ({
  id,
  type,
  checked,
  onChange,
  label,
  labelFloat,
  icon,
  iconFloat,
  isColor,
  labelOneLine,
}) => {
  type = type || 'default'
  labelFloat = labelFloat || 'right'
  iconFloat = iconFloat || 'right'

  return (
    <label className='checkbox' key={id}>
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
      {label && labelFloat === 'left' && (
        <span
          className='label'
          style={labelOneLine ? { whiteSpace: 'nowrap' } : {}}
        >
          {label}
        </span>
      )}
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
        <span
          className='label'
          style={labelOneLine ? { whiteSpace: 'nowrap' } : {}}
        >
          {label}
        </span>
      )}
    </label>
  )
}

export default Checkbox
