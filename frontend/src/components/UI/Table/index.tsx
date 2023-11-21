import { FC } from 'react'

import './styles.scss'
import { pagination } from '../../../types'
import Pagination from '../Pagination'

interface props {
  columns: string[]
  rows?: string[][]
  pagination: pagination
  onPageChange: (page: number) => void
}

const Table: FC<props> = ({ columns, rows, pagination, onPageChange }) => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead className='table-header'>
          <tr className='table-header-row'>
            {columns.map((column, index) => (
              <th key={index} className='table-header-cell'>
                <span className='table-title'>{column}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {rows?.map((row, i) => (
            <tr className='table-row' key={i}>
              {row.map((cell, j) => (
                <td className='table-cell' key={j}>
                  <span>{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='table-footer'>
        <p className='progress'>
          Showing {pagination.from}-{pagination.to} from {pagination.total}
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
