import { FC } from 'react'
import { motion } from 'framer-motion'

import './styles.scss'
import { pagination } from '../../../types'
import Pagination from '../Pagination'
import { ReactSVG } from 'react-svg'
import { chevronDown } from '../../../assets'
import { tableCol } from '../../../constants/tableCols'

interface props {
  columns: tableCol[]
  onColumnClick: (columnKey: string) => void
  sortedCol?: string | null
  sortOrder: 'asc' | 'desc'
  rows?: string[][]
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
          </tr>
        </thead>
        <tbody className='table-body'>
          {rows?.map((row, i) => (
            <tr className='table-row' key={i}>
              {row.map((cell, j) => (
                <td
                  className='table-cell'
                  style={columns[j].oneLine ? { whiteSpace: 'nowrap' } : {}}
                  key={j}
                >
                  <span>{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='table-footer'>
        <p className='progress'>
          Showing {pagination.from || 0}-{pagination.to || 0} from {pagination.total}
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
