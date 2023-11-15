import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import './styles.scss'
import { calendarAlt, menu, search } from '../../assets'
import User from './User'
import MenuIcon from '../../components/UI/MenuIcon'
import Notifications from './Notifications'
import Mail from './Mail'
import { state } from '../../storage'

const Menu = () => {
  const [activeTab, setActiveTab] = useState<null | string>(null)

  const onBurgerClick = () => {
    state.sidebarCollapsed = !state.sidebarCollapsed
    document.body.classList.toggle('sidebar-collapsed')
  }

  return (
    <div className='menu'>
      <div className='inner'>
        <button className='burger' onClick={onBurgerClick}>
          <ReactSVG src={menu} className='icon' />
        </button>
        <div className='content'>
          <ul className='controls'>
            <li key='search' className='control'>
              <MenuIcon
                icon={search}
                active={activeTab === 'search'}
                onClick={() => {}}
              />
            </li>
            <li key='calendar' className='control'>
              <MenuIcon
                icon={calendarAlt}
                active={activeTab === 'calendar'}
                onClick={() => {}}
              />
            </li>
            <Notifications
              active={activeTab === 'notifications'}
              setActive={setActiveTab}
            />
            <Mail active={activeTab === 'mail'} setActive={setActiveTab} />
          </ul>
          <div className='divider' />
          <User active={activeTab === 'profile'} setActive={setActiveTab} />
        </div>
      </div>
    </div>
  )
}

export default Menu
