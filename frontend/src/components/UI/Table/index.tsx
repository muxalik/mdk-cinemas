import { FC } from 'react'
import { motion } from 'framer-motion'

import './styles.scss'
import { pagination } from '../../../types'
import Pagination from '../Pagination'
import { ReactSVG } from 'react-svg'
import { chevronDown, pen, trash } from '../../../assets'
import { tableCol } from '../../../constants/tableCols'

interface props {
  columns: tableCol[]
  onColumnClick: (columnKey: string) => void
  sortedCol?: string | null
  sortOrder: 'asc' | 'desc'
  rows:
    | {
        [key: string]: number | string
      }[]
    | null
  pagination: pagination
  onPageChange: (page: number) => void
}

const Table: FC<props> = ({
  columns,
  onColumnClick,
  sortedCol,
  sortOrder,
  rows,
  pagination,
  onPageChange,
}) => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead className='table-header'>
          <tr className='table-header-row'>
            {columns.map((column, index) => (
              <th key={index} className='table-header-cell'>
                <button
                  className='table-header-button'
                  onClick={() => onColumnClick(column.key)}
                >
                  <span className='table-title'>{column.value}</span>
                  <motion.div
                    animate={
                      sortedCol === column.key && sortOrder === 'asc'
                        ? { rotate: 180 }
                        : { rotate: 0 }
                    }
                    transition={{ type: 'tween', duration: 0.15 }}
                    className='chevron'
                  >
                    <ReactSVG src={chevronDown} className='icon' />
                  </motion.div>
                </button>
              </th>
            ))}
            <th key='actions' className='table-header-cell'>
              <button className='table-header-button no-hover'>
                <span className='table-title'>Actions</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {rows?.map((row, i) => (
            <tr className='table-row' key={i}>
              {columns.map((col, j) => (
                <td
                  className='table-cell'
                  style={columns[j].oneLine ? { whiteSpace: 'nowrap' } : {}}
                  key={j}
                >
                  <span>{row[col.key]}</span>
                </td>
              ))}
              <td
                className='table-cell actions-cell'
                style={{ whiteSpace: 'nowrap' }}
                key='actions'
              >
                <ul className='actions'>
                  <li className='actions-item'>
                    <button className='actions-button'>
                      <ReactSVG src={pen} className='actions-icon' />
                    </button>
                  </li>
                  <li className='actions-item'>
                    <button
                      className='actions-button button-danger'
                      onClick={() => console.log(row.id)}
                    >
                      <ReactSVG src={trash} className='actions-icon' />
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='table-footer'>
        <p className='progress'>
          Showing {pagination.from || 0}-{pagination.to || 0} from{' '}
          {pagination.total}
        </p>
        <Pagination
          total={Math.ceil((pagination.total || 0) / (pagination.perPage || 0))}
          current={pagination.current || 0}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}
export default Table
