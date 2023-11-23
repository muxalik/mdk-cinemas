import { FC, ReactNode } from 'react'

import './styles.scss'
import Popup from '../UI/Popup'

interface props {
  show: boolean
  children: ReactNode
}

const Filters: FC<props> = ({ show, children }) => {
  return (
    <Popup show={show}>
      <div className='filters-popup'>{children}</div>
    </Popup>
  )
}

export default Filters
