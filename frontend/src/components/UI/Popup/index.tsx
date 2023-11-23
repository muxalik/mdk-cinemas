import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

import './styles.scss'

interface props {
  children: ReactNode
  show: boolean
  props?: object
}

const Popup: FC<props> = ({ children, show, props }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, ...props }}
          animate={{ opacity: 1, scale: 1, ...props }}
          exit={{ opacity: 0, scale: 0.9, ...props }}
          transition={{ type: 'spring', duration: 0.2 }}
          className='popup'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default Popup
