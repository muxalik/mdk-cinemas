import { FC } from 'react'

import './styles.scss'

interface props {
  checked?: boolean
  onChange: () => void
  label?: string
  labelFloat?: 'left' | 'right'
}

const Radio: FC<props> = ({ checked, onChange, label, labelFloat }) => {
  labelFloat = labelFloat || 'right'

  return (
    <label className='radio'>
      <input
        type='radio'
        className='input'
        checked={checked}
        onChange={onChange}
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
