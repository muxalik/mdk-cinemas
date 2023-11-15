import { FC, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import CircleIcon from '../CircleIcon'
import { Variants } from '../../../enums'
import { img, media } from '../../../assets'
import './styles.scss'
import Button from '../Button'

interface props {
  type: 'video' | 'image'
  children?: ReactNode
}

const MediaUpload: FC<props> = ({ type, children }) => {
  return (
    <div className='media-upload'>
      <AnimatePresence>
        {children ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className='list'
          >
            {children}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className='placeholder'
          >
            <CircleIcon
              variant={Variants.primary}
              size='md'
              icon={type === 'image' ? img : media}
            />
          </motion.div>
        )}
        <p className='label'>
          {type === 'image'
            ? 'Drag and drop image here, or click add image'
            : 'Drag and drop video here, or click add video'}
        </p>
        <div className='add'>
          <Button
            type='secondary'
            variant={Variants.primary}
            text={type === 'image' ? 'Add Image' : 'Add Video'}
          />
        </div>
      </AnimatePresence>
    </div>
  )
}

export default MediaUpload
