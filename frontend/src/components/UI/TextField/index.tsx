import { FC, ChangeEventHandler } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'

interface props {
  id?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  value?: string
  placeholder?: string
  label?: string
  icon?: string
  iconFloat?: 'left' | 'right'
  disabled?: boolean
  hasError?: boolean
  error?: string
}

const TextField: FC<props> = ({
  id,
  onChange,
  value,
  placeholder,
  label,
  icon,
  iconFloat,
  disabled,
  hasError,
  error,
}) => {
  iconFloat = iconFloat || 'left'

  return (
    <div
      className={`text-field ${disabled ? 'text-field-disabled' : ''} ${
        hasError ? 'text-field-has-error' : ''
      }`}
    >
      {icon && iconFloat === 'left' && (
        <ReactSVG src={icon} className='icon' style={{ left: 12 }} />
      )}
      <input
        type='text'
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className='input'
        disabled={disabled}
        style={
          iconFloat === 'right' || label
            ? { paddingRight: 40 }
            : { paddingLeft: 40 }
        }
      />
      <AnimatePresence>
        {error && (
          <motion.p {...errorMessageAnim} className='error'>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {label && (
        <label htmlFor={id} className='label'>
          {label}
        </label>
      )}
      {icon && iconFloat === 'right' && (
        <ReactSVG src={icon} className='icon' style={{ right: 12 }} />
      )}
    </div>
  )
}

export default TextField
