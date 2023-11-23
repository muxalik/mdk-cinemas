import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { actorDefaultFilters } from '../../types'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { actorCols } from '../../constants/tableCols'
import FilterGroup from '../../components/UI/FilterGroup'
import Link from '../../components/UI/Link'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useActors from '../../hooks/useActors'

const Actors = () => {
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
  } = useFilters(actorDefaultFilters)

  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    actors,
    pagination,
    setPagination,
    onPageChange,
  } = useActors(appliedFilters)

  const rows = actors?.map((actor) => {
    return [
      actor.name,
      actor.total_movies.toString(),
      actor.main_role_movies.toString(),
    ]
  })

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
            <Exports
              items={[
                {
                  icon: xlsx,
                  text: 'Excel',
                  download: () =>
                    downloadFromUrl('/actors/excel', 'actors.xlsx'),
                },
                {
                  icon: pdf,
                  text: 'PDF',
                  download: () => downloadFromUrl('/actors/pdf', 'actors.pdf'),
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
                  <FilterGroup title='Movies' opened>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='min-movies'>
                        Minimum movies
                      </label>
                      <TextField
                        id='min-movies'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              minMovies:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.minMovies,
                            }
                          })
                        }
                        value={
                          currentFilters.minMovies === null
                            ? ''
                            : currentFilters.minMovies?.toString()
                        }
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='max-movies'>
                        Maximun movies
                      </label>
                      <TextField
                        id='max-movies'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              maxMovies:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.maxMovies,
                            }
                          })
                        }
                        value={
                          currentFilters.maxMovies === null
                            ? ''
                            : currentFilters.maxMovies?.toString()
                        }
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Main roles' opened>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='min-main-roles'>
                        Minimum main roles
                      </label>
                      <TextField
                        id='min-main-roles'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              minMainRoles:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.minMainRoles,
                            }
                          })
                        }
                        value={
                          currentFilters.minMainRoles === null
                            ? ''
                            : currentFilters.minMainRoles?.toString()
                        }
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='max-main-roles'>
                        Maximun main roles
                      </label>
                      <TextField
                        id='max-main-roles'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              maxMainRoles:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.maxMainRoles,
                            }
                          })
                        }
                        value={
                          currentFilters.maxMainRoles === null
                            ? ''
                            : currentFilters.maxMainRoles?.toString()
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
          columns={actorCols}
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

export default Actors
