import { FC, ChangeEventHandler } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'

interface props {
  id?: string
  type?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  value?: string | number
  placeholder?: string
  label?: string
  secondaryLabel?: string
  icon?: string
  iconFloat?: 'left' | 'right'
  disabled?: boolean
  hasError?: boolean
  error?: string
}

const TextField: FC<props> = ({
  id,
  type,
  onChange,
  value,
  placeholder,
  label,
  secondaryLabel,
  icon,
  iconFloat,
  disabled,
  hasError,
  error,
}) => {
  type = type || 'text'
  iconFloat = iconFloat || 'left'

  return (
    <div className='text-field-wrapper'>
      {label && (
        <label htmlFor={id} className='label'>
          {label}
        </label>
      )}
      <div
        className={`text-field ${disabled ? 'text-field-disabled' : ''} ${
          hasError ? 'text-field-has-error' : ''
        }`}
      >
        {icon && iconFloat === 'left' && (
          <ReactSVG src={icon} className='icon' style={{ left: 12 }} />
        )}
        <input
          type={type}
          id={id}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className='input'
          disabled={disabled}
          style={
            icon
              ? iconFloat === 'right' || secondaryLabel
                ? { paddingRight: 40 }
                : { paddingLeft: 40 }
              : {}
          }
        />
        <AnimatePresence>
          {error && (
            <motion.p {...errorMessageAnim} className='error'>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {secondaryLabel && (
          <label htmlFor={id} className='secondary-label'>
            {secondaryLabel}
          </label>
        )}
        {icon && iconFloat === 'right' && (
          <ReactSVG src={icon} className='icon' style={{ right: 12 }} />
        )}
      </div>
    </div>
  )
}

export default TextField
