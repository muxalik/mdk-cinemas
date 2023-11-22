import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

import './styles.scss'
import { ReactSVG } from 'react-svg'
import { chevronDown } from '../../../assets'

interface props {
  children: ReactNode
  title: string
  opened: boolean
}

const FilterGroup: FC<props> = ({ children, title, opened }) => {
  return (
    <div className='filter-group'>
      <button className='filter-header'>
        <p className='title'>{title}</p>
        <motion.div
          initial={opened ? { rotate: 180 } : { rotate: 0 }}
          animate={opened ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: 'tween', duration: 0.15 }}
          className='chevron'
        >
          <ReactSVG src={chevronDown} className='icon' />
        </motion.div>
      </button>
      <div className='filter-body'>
        <div className='filter-inner'>{children}</div>
      </div>
    </div>
  )
}

export default FilterGroup
