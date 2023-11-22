import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { cinema, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import Exports from '../../components/Exports'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Table from '../../components/UI/Table'
import { cinemaCols } from '../../constants/tableCols'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Popup from '../../components/UI/Popup'
import Link from '../../components/UI/Link'
import FilterGroup from '../../components/UI/FilterGroup'
import Radio from '../../components/UI/Radio'

type filters = {
  minCapacity: number | null
  maxCapacity: number | null
  status: 'opened' | 'closed' | 'any'
}

const defaultFilters: filters = {
  minCapacity: null,
  maxCapacity: null,
  status: 'any',
}

const Cinemas = () => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [cinemas, setCinemas] = useState<cinema[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  const [appliedFilters, setAppliedFilters] = useState<filters>(defaultFilters)
  const [currentFilters, setCurrentFilters] = useState<filters>(defaultFilters)
  const [showFilters, setShowFilters] = useState(false)
  const filtersRef = useOutsideClick(() => setShowFilters(false))

  useEffect(() => {
    let params: any = {
      page: pagination.current,
      search: query,
      sort: sortBy,
      order: sortOrder,
      min_capacity: appliedFilters.minCapacity,
      max_capacity: appliedFilters.maxCapacity,
      status: appliedFilters.status,
    }

    api
      .get(baseURL + '/cinemas', { params })
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
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

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

  const onFiltersReset = () => {
    setAppliedFilters(defaultFilters)
    setCurrentFilters(defaultFilters)
  }

  const onFiltersApply = () => {
    setShowFilters(false)
    setAppliedFilters(currentFilters)
  }

  const onFiltersCancel = () => {
    setShowFilters(false)
    setAppliedFilters(defaultFilters)
    setCurrentFilters(defaultFilters)
  }

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
          <div ref={filtersRef} className='filters'>
            <Button
              type='tertiary'
              variant={Variants.primary}
              text='Filters'
              icon={slider}
              onClick={() => setShowFilters(!showFilters)}
            />
            <Popup show={showFilters}>
              <div className='filters-header'>
                <h4 className='filters-title'>Filters</h4>
                <Link
                  text='Reset'
                  icon={cross}
                  variant={Variants.primary}
                  to='#'
                  onClick={onFiltersReset}
                />
              </div>
              <div className='filters-body'>
                <FilterGroup title='Capacity' opened>
                  <div className='filters-group'>
                    <label className='input-label' htmlFor='min-capacity'>
                      Minimum capacity
                    </label>
                    <TextField
                      id='min-capacity'
                      type='number'
                      onChange={(e) =>
                        setCurrentFilters((prev) => {
                          const value = e.target.value

                          return {
                            ...prev,
                            minCapacity:
                              value === ''
                                ? null
                                : !isNaN(+value) && +value >= 0
                                ? +value
                                : prev.minCapacity,
                          }
                        })
                      }
                      value={
                        currentFilters.minCapacity === null
                          ? ''
                          : currentFilters.minCapacity?.toString()
                      }
                      placeholder='Minimum...'
                    />
                  </div>
                  <div className='filters-group'>
                    <label className='input-label' htmlFor='max-capacity'>
                      Maximun capacity
                    </label>
                    <TextField
                      id='max-capacity'
                      type='number'
                      onChange={(e) =>
                        setCurrentFilters((prev) => {
                          const value = e.target.value

                          return {
                            ...prev,
                            maxCapacity:
                              value === ''
                                ? null
                                : !isNaN(+value) && +value >= 0
                                ? +value
                                : prev.maxCapacity,
                          }
                        })
                      }
                      value={
                        currentFilters.maxCapacity === null
                          ? ''
                          : currentFilters.maxCapacity?.toString()
                      }
                      placeholder='Maximum...'
                    />
                  </div>
                </FilterGroup>
                <FilterGroup title='Status' opened>
                  <div className='filters-radio'>
                    <Radio
                      checked={currentFilters.status === 'opened'}
                      setChecked={() =>
                        setCurrentFilters((prev) => {
                          return {
                            ...prev,
                            status: 'opened',
                          }
                        })
                      }
                      value='opened'
                      label='Only opened'
                    />
                    <Radio
                      checked={currentFilters.status === 'closed'}
                      setChecked={() =>
                        setCurrentFilters((prev) => {
                          return {
                            ...prev,
                            status: 'closed',
                          }
                        })
                      }
                      value='closed'
                      label='Only closed'
                    />
                    <Radio
                      checked={currentFilters.status === 'any'}
                      setChecked={() =>
                        setCurrentFilters((prev) => {
                          return {
                            ...prev,
                            status: 'any',
                          }
                        })
                      }
                      value='any'
                      label='Any'
                    />
                  </div>
                </FilterGroup>
                <div className='filters-controls'>
                  <Button
                    type='tertiary'
                    variant={Variants.primary}
                    text='Cancel'
                    onClick={onFiltersCancel}
                  />
                  <Button
                    type='primary'
                    variant={Variants.primary}
                    text='Apply filters'
                    onClick={onFiltersApply}
                  />
                </div>
              </div>
            </Popup>
          </div>
        </div>
        <Table
          columns={cinemaCols}
          rows={rows}
          pagination={pagination}
          onPageChange={onPageChange}
          onColumnClick={(columnKey) => {
            setSortBy(columnKey)
            setSortOrder(
              columnKey === sortBy
                ? sortOrder === 'asc'
                  ? 'desc'
                  : 'asc'
                : 'asc'
            )
          }}
          sortedCol={sortBy}
          sortOrder={sortOrder}
        />
      </div>
    </Layout>
  )
}

export default Cinemas
