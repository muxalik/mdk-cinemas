import { FC, useState } from 'react'
import { ReactSVG } from 'react-svg'

import { check, cross, reload } from '../../../assets'
import './styles.scss'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../Button'
import { Variants } from '../../../enums'
import Label from '../Label'

interface props {
  image?: string
  alt?: string
  status: 'uploaded' | 'uploading' | 'error'
  progress?: number
  onRemove: () => void
  onReload: () => void
}

const Media: FC<props> = ({
  image,
  alt,
  status,
  progress,
  onRemove,
  onReload,
}) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`media media--${status}`}
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className='wrapper' />
      <img src={image} alt={alt} className='image' />
      <AnimatePresence>
        {hover && status === 'uploaded' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className='remove'
          >
            <Button
              onClick={onRemove}
              type='secondary'
              variant={Variants.primary}
              icon={cross}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {status === 'uploaded' && !hover && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className='success'
        >
          <ReactSVG src={check} className='icon' />
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className='reload-wrapper'
        >
          <Button
            onClick={onReload}
            type='secondary'
            variant={Variants.primary}
            icon={reload}
          />
        </motion.div>
      )}
      {status === 'uploading' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className='progress-wrapper'
        >
          <Label variant={Variants.primary} text={progress + '%'} size='md' />
        </motion.div>
      )}
    </div>
  )
}

export default Media
