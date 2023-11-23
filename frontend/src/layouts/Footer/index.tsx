import { FC, ReactNode } from 'react'

import './styles.scss'

interface props {
  children: ReactNode
}

const Footer: FC<props> = ({ children }) => {
  return (
    <div className='footer'>
      <div className='footer-inner'>{children}</div>
    </div>
  )
}

export default Footer
