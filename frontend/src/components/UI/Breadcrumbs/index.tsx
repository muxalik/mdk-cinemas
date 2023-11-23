import { FC } from 'react'

import './styles.scss'
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { chevronDown } from '../../../assets'
import { breadcrumbLink } from '../../../types'

interface props {
  type?: 'chevron' | 'slash'
  links: breadcrumbLink[]
}

const Breadcrumbs: FC<props> = ({ type, links }) => {
  return (
    <ul className='breadcrumbs'>
      {links.map((link, index) => (
        <>
          <li key={index} className='breadcrumb'>
            <NavLink to={link.to} className='link'>
              {link.title}
            </NavLink>
          </li>
          {index !== links.length - 1 && (
            <span className='separator'>
              {type === 'chevron' ? (
                <ReactSVG src={chevronDown} className='chevron' />
              ) : (
                '/'
              )}
            </span>
          )}
        </>
      ))}
    </ul>
  )
}

export default Breadcrumbs
