import { ChangeEvent, forwardRef } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'
import onlyDigits from '../../../utils/onlyDigits'

interface props {
  id?: string
  type?: string
  onChange?: (value: string) => void
  onlyNumbers?: boolean
  value?: string | number | null
  placeholder?: string
  label?: string
  secondaryLabel?: string
  icon?: string
  iconFloat?: 'left' | 'right'
  disabled?: boolean
  hasError?: boolean
  error?: string
  readOnly?: boolean
  onIcon?: () => void
}

const TextField = forwardRef<HTMLInputElement, props>(
  (
    {
      id,
      type,
      onChange,
      onlyNumbers,
      value,
      placeholder,
      label,
      secondaryLabel,
      icon,
      iconFloat,
      disabled,
      hasError,
      error,
      readOnly,
      onIcon,
    },
    forwaredRef: any
  ) => {
    type = type || 'text'
    iconFloat = iconFloat || 'left'

    const validateOnlyNumbers = (input: string) => {
      const digits = onlyDigits(input)

      onChange && onChange(digits)
    }

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
            <button
              onClick={onIcon}
              className={`icon-button ${onIcon ? 'interactive' : ''}`}
              style={{ left: 12 }}
            >
              <ReactSVG src={icon} className='icon' />
            </button>
          )}
          <input
            ref={forwaredRef}
            type={type}
            id={id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onlyNumbers
                ? validateOnlyNumbers(e.target.value)
                : onChange && onChange(e.target.value)
            }}
            value={value || ''}
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
            readOnly={readOnly}
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
            <button
              onClick={onIcon}
              className={`icon-button ${onIcon ? 'interactive' : ''}`}
              style={{ right: 12 }}
            >
              <ReactSVG src={icon} className='icon' />
            </button>
          )}
        </div>
      </div>
    )
  }
)

export default TextField
