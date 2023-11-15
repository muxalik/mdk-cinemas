import './styles.scss'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { logo } from '../../assets'
import {
  link,
  sidebarBottomLinks,
  sidebarTopLinks,
} from '../../constants/sidebarLinks'
import 'rc-tree/assets/index.css'
import MenuTab from '../../components/UI/MenuTab'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='header'>
        <Link to='/' className='link'>
          <ReactSVG src={logo} className='logo' />
          <h2 className='title'>Admin</h2>
        </Link>
      </div>
      <div className='content'>
        <nav className='nav'>
          <List links={sidebarTopLinks} />
          <List links={sidebarBottomLinks} />
        </nav>
      </div>
    </div>
  )
}

interface listProps {
  links: link[]
}

const List = ({ links }: listProps) => {
  return (
    <ul className='list'>
      {links.map((link) => (
        <MenuTab link={link} />
      ))}
    </ul>
  )
}

export default Sidebar
