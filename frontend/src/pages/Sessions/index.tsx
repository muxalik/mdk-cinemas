import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { exportIcon, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Pagination from '../../components/UI/Pagination'
import { session } from '../../types'
import api, { baseURL } from '../../utils/api'
import downloadFromUrl from '../../utils/downloadFromUrl'

const Sessions = () => {
  const [query, setQuery] = useState('')
  const [sessions, setSessions] = useState<session[] | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/sessions', {
        params: {
          page: pagination.current,
          search: query,
        },
      })
      .then((response) => {
        setSessions(response.data.data)
        setPagination({
          current:
            response.data.current_page || response.data.meta.current_page,
          total: response.data.total || response.data.meta.total,
          from: response.data.from || response.data.meta.from,
          to: response.data.to || response.data.meta.to,
          perPage: response.data.per_page || response.data.meta.per_page,
        })
      })
      .catch(console.log)
  }, [pagination.current, query])

  return (
    <Layout>
      <div className='actors'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Sessions</h1>
            <Breadcrumbs
              links={[
                {
                  title: 'Home',
                  to: '/',
                },
                {
                  title: 'Sessions',
                  to: '/sessions',
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
              onClick={() => downloadFromUrl('/sessions/pdf', 'sessions.pdf')}
            />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add actor'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search session'
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
                <th className='table-header-cell'>
                  <span className='table-title'>Cinema</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Movie</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Ticket price</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Free places</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Starts</span>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {sessions?.map((session) => (
                <tr className='table-row' key={session.id}>
                  <td className='table-cell'>
                    <span>{session.cinema}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{session.movie}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{session.ticket_price}$</span>
                  </td>
                  <td className='table-cell'>
                    <span>{session.free_places}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{session.starts_at}</span>
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

export default Sessions
