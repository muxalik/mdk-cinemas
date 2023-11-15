import { FC } from 'react'

import './styles.scss'

interface props {
  value: string | number
  checked?: boolean
  setChecked: (value: string | number) => void
  label?: string
  labelFloat?: 'left' | 'right'
}

const Radio: FC<props> = ({
  value,
  checked,
  setChecked,
  label,
  labelFloat,
}) => {
  labelFloat = labelFloat || 'right'
  
  return (
    <label className='radio'>
      <input
        value={value}
        type='radio'
        className='input'
        checked={checked}
        onChange={() => setChecked(value)}
      />
      {label && labelFloat === 'left' && <span className='label'>{label}</span>}
      <div className='circle'>
        <div className='inner-circle' />
      </div>
      {label && labelFloat === 'right' && (
        <span className='label'>{label}</span>
      )}
    </label>
  )
}

export default Radio
