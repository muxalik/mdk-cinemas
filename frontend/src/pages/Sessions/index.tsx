import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import { sessionDefaultFilters } from '../../types'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { sessionCols } from '../../constants/tableCols'
import Filters from '../../components/Filters'
import Link from '../../components/UI/Link'
import FilterGroup from '../../components/UI/FilterGroup'
import useFilters from '../../hooks/useFilters'
import useSessions from '../../hooks/useSessions'
import { sessionsBreadcrumbs } from '../../constants/breadcrumbs'
import { sessionsExports } from '../../constants/exports'

const Sessions = () => {
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

  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    pagination,
    setPagination,
    onPageChange,
    sessions,
  } = useSessions(appliedFilters)

  return (
    <Layout>
      <div className='sessions'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Sessions</h1>
            <Breadcrumbs links={sessionsBreadcrumbs} />
          </div>
          <div className='actions'>
            <Exports items={sessionsExports} />
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
          rows={sessions}
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
