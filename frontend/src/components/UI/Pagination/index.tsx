import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import { chevronDown } from '../../../assets'
import './styles.scss'
import { DOTS, usePagination } from '../../../hooks/usePagination'

interface props {
  current: number
  onChange: (page: number) => void
  total: number
  siblings?: number
  start?: number
}

const Pagination: FC<props> = ({ current, total, siblings, onChange }) => {
  siblings = siblings || 1

  const paginationRange = usePagination({
    total,
    siblings,
    current,
  })

  if (current === 0 || paginationRange?.length < 2) {
    return null
  }

  const onPrevClick = () => {
    if (current > 1) {
      onChange(current - 1)
    }
  }

  const onNextClick = () => {
    if (current < total) {
      onChange(current + 1)
    }
  }

  const last = paginationRange[paginationRange.length - 1]

  return (
    <div className='pagination'>
      <button
        className={`button ${current === 1 ? 'button-disabled' : ''} prev`}
        onClick={onPrevClick}
      >
        <ReactSVG src={chevronDown} className='chevron' />
      </button>
      <ul className='list'>
        {paginationRange.map((num) => {
          if (num === DOTS) {
            return (
              <li className='list-num dots'>
                <button className='button'>{num}</button>
              </li>
            )
          }

          return (
            <li
              key={num}
              className={`list-item ${
                num === current ? 'list-item-current' : ''
              }`}
            >
              <button
                className='button'
                onClick={() => current !== num && onChange(num)}
              >
                {num}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        className={`button ${current === last ? 'button-disabled' : ''} next`}
        onClick={onNextClick}
      >
        <ReactSVG src={chevronDown} className='chevron' />
      </button>
    </div>
  )
}

export default Pagination
