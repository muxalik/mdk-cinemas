import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { cinemaDefaultFilters } from '../../types'
import Exports from '../../components/Exports'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Table from '../../components/UI/Table'
import { cinemaCols } from '../../constants/tableCols'
import Link from '../../components/UI/Link'
import FilterGroup from '../../components/UI/FilterGroup'
import Radio from '../../components/UI/Radio'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useCinemas from '../../hooks/useCinemas'

const Cinemas = () => {
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
  } = useFilters(cinemaDefaultFilters)

  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    cinemas,
    pagination,
    setPagination,
    onPageChange,
  } = useCinemas(appliedFilters)

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
              <div className='filters-body'>
                <div className='filters-inner'>
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
                        onChange={() =>
                          setCurrentFilters((prev) => {
                            return {
                              ...prev,
                              status: 'opened',
                            }
                          })
                        }
                        label='Only opened'
                      />
                      <Radio
                        checked={currentFilters.status === 'closed'}
                        onChange={() =>
                          setCurrentFilters((prev) => {
                            return {
                              ...prev,
                              status: 'closed',
                            }
                          })
                        }
                        label='Only closed'
                      />
                      <Radio
                        checked={currentFilters.status === 'any'}
                        onChange={() =>
                          setCurrentFilters((prev) => {
                            return {
                              ...prev,
                              status: 'any',
                            }
                          })
                        }
                        label='Any'
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
