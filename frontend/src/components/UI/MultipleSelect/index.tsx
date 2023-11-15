import { FC, useState } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { check, chevronDown, cross } from '../../../assets'
import Popup from '../Popup'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'

interface props {
  variant: 'outline' | 'filled'
  placeholder?: string
  hasError?: boolean
  error?: string
  options: option[]
  selected?: (string | number)[]
  onChange: (values: (string | number)[]) => void
}

export type option = {
  value: string | number
  name: string
}

const MultipleSelect: FC<props> = ({
  variant,
  placeholder,
  hasError,
  error,
  options,
  selected,
  onChange,
}) => {
  const [show, setShow] = useState(false)

  const isSelected = (value: string | number) => {
    return !!selected?.includes(value)
  }

  return (
    <div
      className={`mutiple-select ${
        hasError ? 'mutiple-select-error' : ''
      } mutiple-select--${variant}`}
    >
      <button
        className='input'
        onClick={() => setShow(true)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {selected?.length !== 0 ? (
          <ul className='selected-list'>
            <AnimatePresence>
              {selected?.map((value) => {
                const selectedItem = options.filter(
                  (item) => item.value === value
                )[0]

                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.2 }}
                    key={value}
                    className='selected'
                  >
                    <span className='name'>{selectedItem.value}</span>
                    <button
                      className='remove'
                      onClick={() =>
                        onChange(
                          selected.filter(
                            (value) => value !== selectedItem.value
                          )
                        )
                      }
                    >
                      <ReactSVG src={cross} className='icon' />
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
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
      <Popup show={show}>
        <div className='options-wrapper'>
          <ul className='options scrollbar'>
            {options.map((option, index) => (
              <li key={option.value} className='item'>
                <button
                  className={`option ${index === 0 ? 'option-first' : ''} ${
                    index === options.length - 1 ? 'option-last' : ''
                  } ${isSelected(option.value) ? 'option-selected' : ''}`}
                  onClick={() =>
                    onChange(
                      isSelected(option.value)
                        ? selected!.filter((value) => value !== option.value)
                        : [...selected!, option.value]
                    )
                  }
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <span className='name'>{option.name}</span>
                  {isSelected(option.value) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', duration: 0.2 }}
                    >
                      <ReactSVG src={check} className='icon' />
                    </motion.div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Popup>
    </div>
  )
}

export default MultipleSelect
