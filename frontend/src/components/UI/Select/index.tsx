import { FC, useState } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { check, chevronDown } from '../../../assets'
import Popup from '../Popup'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface props {
  id: string
  props?: any
  variant: 'outline' | 'filled' | 'none'
  placeholder?: string
  hasError?: boolean
  error?: string
  label?: string
  options: option[]
  selected?: string | number
  onChange: (option: option) => void
}

export type option = {
  value: string | number
  name: string
}

const Select: FC<props> = ({
  id,
  props,
  variant,
  placeholder,
  hasError,
  error,
  label,
  options,
  selected,
  onChange,
}) => {
  const [show, setShow] = useState(false)

  const selectedOption = options.filter(
    (option) => option.value === selected
  )[0]

  const selectRef = useOutsideClick(() => {
    show && setShow(false)
  })

  return (
    <div
      ref={selectRef}
      className={`select ${hasError ? 'select-error' : ''} select--${variant}`}
    >
      {label && (
        <label htmlFor={id} className='label'>
          {label}
        </label>
      )}
      <div className='select-inner'>
        <button className='input' onClick={() => setShow(!show)}>
          {selectedOption ? (
            <span className='value'>{selectedOption?.name}</span>
          ) : (
            <span className='placeholder'>{placeholder}</span>
          )}
          <ReactSVG
            src={chevronDown}
            className={`chevron ${show ? 'chevron--opened' : ''}`}
          />
        </button>
        <AnimatePresence>
          {error && (
            <motion.p {...errorMessageAnim} className='error'>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <Popup show={show} props={props}>
          <div className='options-wrapper'>
            <ul className='options scrollbar'>
              {options.map((option, index) => (
                <li key={option.value} className='item'>
                  <button
                    className={`option ${index === 0 ? 'option-first' : ''} ${
                      index === options.length - 1 ? 'option-last' : ''
                    } ${selected === option.value ? 'option-selected' : ''}`}
                    onClick={() => {
                      onChange(option)
                      setShow(false)
                    }}
                  >
                    <span className='name'>{option.name}</span>
                    {option.value === selected && (
                      <ReactSVG src={check} className='icon' />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default Select
