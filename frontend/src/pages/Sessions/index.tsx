import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { pagination, session, sessionDefaultFilters } from '../../types'
import api, { baseURL } from '../../utils/api'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { sessionCols } from '../../constants/tableCols'
import Filters from '../../components/Filters'
import Link from '../../components/UI/Link'
import FilterGroup from '../../components/UI/FilterGroup'
import useFilters from '../../hooks/useFilters'

const Sessions = () => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [sessions, setSessions] = useState<session[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  const {
    appliedFilters,
    currentFilters,
    setCurrentFilters,
    showFilters,
    setShowFilters,
    filtersRef,
    onFiltersReset,
    onFiltersApply,
    onFiltersCancel,
    newFiltersAdded,
  } = useFilters(sessionDefaultFilters)

  useEffect(() => {
    api
      .get(baseURL + '/sessions', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          min_ticket_price: appliedFilters.minTicketPrice,
          max_ticket_price: appliedFilters.maxTicketPrice,
          min_free_places: appliedFilters.minFreePlaces,
          max_free_places: appliedFilters.maxFreePlaces,
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
  }, [pagination.current, query, sortBy, sortOrder, appliedFilters])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const rows = sessions?.map((session) => {
    return [
      session.cinema,
      session.movie,
      session.ticket_price,
      session.free_places.toString(),
      session.starts_at,
    ]
  })

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
            <Exports
              items={[
                {
                  icon: xlsx,
                  text: 'Excel',
                  download: () =>
                    downloadFromUrl('/sessions/excel', 'sessions.xlsx'),
                },
                {
                  icon: pdf,
                  text: 'PDF',
                  download: () =>
                    downloadFromUrl('/sessions/pdf', 'sessions.pdf'),
                },
              ]}
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
          <div ref={filtersRef} className='filters'>
            <Button
              type='tertiary'
              variant={Variants.primary}
              text='Filters'
              icon={slider}
              onClick={() => setShowFilters(!showFilters)}
            />
            <Filters show={showFilters}>
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
              <div className='filters-body scrollbar'>
                <div className='filters-inner'>
                  <FilterGroup title='Ticket price' opened>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='min-price'>
                        Minimum ticket price
                      </label>
                      <TextField
                        id='min-price'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              minTicketPrice:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.minTicketPrice,
                            }
                          })
                        }
                        value={
                          currentFilters.minTicketPrice === null
                            ? ''
                            : currentFilters.minTicketPrice?.toString()
                        }
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='max-ticket-price'>
                        Maximun ticket price
                      </label>
                      <TextField
                        id='max-ticket-price'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              maxTicketPrice:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.maxTicketPrice,
                            }
                          })
                        }
                        value={
                          currentFilters.maxTicketPrice === null
                            ? ''
                            : currentFilters.maxTicketPrice?.toString()
                        }
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Ticket price' opened>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='min-free-places'>
                        Minimum free places
                      </label>
                      <TextField
                        id='min-free-places'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              minFreePlaces:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.minFreePlaces,
                            }
                          })
                        }
                        value={
                          currentFilters.minFreePlaces === null
                            ? ''
                            : currentFilters.minFreePlaces?.toString()
                        }
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='max-free-places'>
                        Maximun free places
                      </label>
                      <TextField
                        id='max-free-places'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              maxFreePlaces:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.maxFreePlaces,
                            }
                          })
                        }
                        value={
                          currentFilters.maxFreePlaces === null
                            ? ''
                            : currentFilters.maxFreePlaces?.toString()
                        }
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                </div>
              </div>
              <div className='filters-controls'>
                <Button
                  type='tertiary'
                  variant={Variants.primary}
                  disabled={!newFiltersAdded}
                  text='Cancel'
                  onClick={onFiltersCancel}
                />
                <Button
                  type='primary'
                  variant={Variants.primary}
                  disabled={!newFiltersAdded}
                  text='Apply filters'
                  onClick={onFiltersApply}
                />
              </div>
            </Filters>
          </div>
        </div>
        <Table
          columns={sessionCols}
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

export default Sessions
