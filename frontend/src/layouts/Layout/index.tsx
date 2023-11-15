import { FC, ReactNode } from 'react'

import './styles.scss'
import Sidebar from '../Sidebar'
import Menu from '../Menu'

interface props {
  children: ReactNode
}

const Layout: FC<props> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Menu />
      <main className='main'>
        <div className='main-inner'>{children}</div>
      </main>
    </>
  )
}

export default Layout
