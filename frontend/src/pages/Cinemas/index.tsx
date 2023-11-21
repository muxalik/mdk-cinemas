import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { cinema, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import Exports from '../../components/Exports'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Table from '../../components/UI/Table'
import { cinemaCols } from '../../constants/tableCols'

const Cinemas = () => {
  const [query, setQuery] = useState('')
  const [cinemas, setCinemas] = useState<cinema[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
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

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const rows = cinemas?.map((cinema) => {
    return [
      cinema.name,
      cinema.district,
      cinema.address,
      cinema.capacity.toString(),
      cinema.status,
    ]
  })

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
            <Exports
              items={[
                {
                  icon: xlsx,
                  text: 'Excel',
                  download: () =>
                    downloadFromUrl('/cinemas/excel', 'cinemas.xlsx'),
                },
                {
                  icon: pdf,
                  text: 'PDF',
                  download: () =>
                    downloadFromUrl('/cinemas/pdf', 'cinemas.pdf'),
                },
              ]}
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
        <Table
          columns={cinemaCols}
          rows={rows}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </Layout>
  )
}

export default Cinemas
