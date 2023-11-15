import { FC, ChangeEvent } from 'react'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { AnimatePresence, motion } from 'framer-motion'
import { errorMessageAnim } from '../../../utils/motion'

interface props {
  id?: string
  onChange?: (e: ChangeEvent) => void
  value?: string
  placeholder?: string
  disabled?: boolean
  hasError?: boolean
  error?: string
  rows?: number
}

const TextArea: FC<props> = ({
  id,
  onChange,
  value,
  placeholder,
  disabled,
  hasError,
  error,
  rows,
}) => {
  return (
    <div
      className={`text-area ${disabled ? 'text-area-disabled' : ''} ${
        hasError ? 'text-area-has-error' : ''
      }`}
    >
      <textarea
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className='input scrollbar scrollbar-rounded'
        disabled={disabled}
        rows={rows}
      ></textarea>
      <AnimatePresence>
        {error && (
          <motion.p {...errorMessageAnim} className='error'>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TextArea
