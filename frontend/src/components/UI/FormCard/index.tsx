import { FC, ReactNode } from 'react'

import './styles.scss'

interface props {
  title: string
  children: ReactNode
}

const FormCard: FC<props> = ({ title, children }) => {
  return (
    <div className='form-card card'>
      <h3 className='form-card-title'>{title}</h3>
      <div className='form-card-body'>{children}</div>
    </div>
  )
}

export default FormCard
