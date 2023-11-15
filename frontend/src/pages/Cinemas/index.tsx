import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { exportIcon, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Pagination from '../../components/UI/Pagination'
import { cinema } from '../../types'
import api, { baseURL } from '../../utils/api'

const Cinemas = () => {
  const [query, setQuery] = useState('')
  const [cinemas, setCinemas] = useState<cinema[] | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/cinemas', {
        params: {
          page: pagination.current,
          search: query,
        },
      })
      .then((response) => {
        setCinemas(response.data.data)
        setPagination({
          current: response.data.current_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to,
          perPage: response.data.per_page,
        })
      })
      .catch(console.log)
  }, [pagination.current, query])

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Cinemas</h1>
            <Breadcrumbs
              links={[
                {
                  title: 'Home',
                  to: '/',
                },
                {
                  title: 'Cinemas',
                  to: '/cinemas',
                },
              ]}
            />
          </div>
          <div className='actions'>
            <Button
              type='secondary'
              variant={Variants.primary}
              text='Export'
              icon={exportIcon}
            />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add cinema'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search cinema'
            icon={search}
            value={query}
            onChange={(e) => {
              setPagination((prev) => {
                return {
                  ...prev,
                  current: 1,
                }
              })
              setQuery(e.target.value)
            }}
          />
          <Button
            type='tertiary'
            variant={Variants.primary}
            text='Filters'
            icon={slider}
          />
        </div>
        <div className='table-wrapper'>
          <table className='table'>
            <thead className='table-header'>
              <tr className='table-header-row'>
                <th className='table-header-cell cinema'>
                  <span className='table-title'>Cinema</span>
                </th>
                <th className='table-header-cell district'>
                  <span className='table-title'>District</span>
                </th>
                <th className='table-header-cell district'>
                  <span className='table-title'>Address</span>
                </th>
                <th className='table-header-cell capacity'>
                  <span className='table-title'>Capacity</span>
                </th>
                <th className='table-header-cell status'>
                  <span className='table-title'>Status</span>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {cinemas?.map((cinema) => (
                <tr className='table-row' key={cinema.id}>
                  <td className='table-cell'>
                    <span className='cinema-name'>{cinema.name}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{cinema.district}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{cinema.address}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{cinema.capacity}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{cinema.is_opened ? 'Opened' : 'Closed'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='table-footer'>
            <p className='progress'>
              Showing {pagination.from}-{pagination.to} from {pagination.total}
            </p>
            <Pagination
              total={Math.ceil(pagination.total / pagination.perPage)}
              current={pagination.current}
              onChange={(page) =>
                setPagination((prev) => {
                  return {
                    ...prev,
                    current: page,
                  }
                })
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cinemas
