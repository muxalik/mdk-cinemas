import { FC } from 'react'

import './styles.scss'

interface props {
  active: string | number
  type?: 'button' | 'underline'
  tabs: {
    id: number | string
    title: string
    active?: boolean
  }[]
  onChange: (id: number | string) => void
}

const TabGroup: FC<props> = ({ active, type, tabs, onChange }) => {
  type = type || 'button'

  return (
    <div className={`tab-group tab-group--${type}`}>
      <ul className='list'>
        {tabs.map((tab) => (
          <li key={tab.id} className='tab'>
            <button
              className={`button ${tab.id === active ? 'button--active' : ''}`}
              onClick={() => tab.id !== active && onChange(tab.id)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabGroup
