import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { exportIcon, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Pagination from '../../components/UI/Pagination'
import { actor } from '../../types'
import api, { baseURL } from '../../utils/api'

const Actors = () => {
  const [query, setQuery] = useState('')
  const [actors, setActors] = useState<actor[] | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/actors', {
        params: {
          page: pagination.current,
          search: query,
        },
      })
      .then((response) => {
        setActors(response.data.data)
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
            <h1 className='title'>Movies</h1>
            <Breadcrumbs
              links={[
                {
                  title: 'Home',
                  to: '/',
                },
                {
                  title: 'Actors',
                  to: '/actors',
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
              text='Add actor'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search actor'
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
                  <span className='table-title'>Name</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Total Movies</span>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {actors?.map((actor) => (
                <tr className='table-row' key={actor.id}>
                  <td className='table-cell'>
                    <span>{actor.name}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{actor.movies_count}</span>
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

export default Actors
