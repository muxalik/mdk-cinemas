import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import { movieDefaultFilters } from '../../types'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { movieCols } from '../../constants/tableCols'
import FilterGroup from '../../components/UI/FilterGroup'
import Link from '../../components/UI/Link'
import Checkbox from '../../components/UI/Checkbox'
import Radio from '../../components/UI/Radio'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useMovies from '../../hooks/useMovies'
import { moviesBreadcrumbs } from '../../constants/breadcrumbs'
import { moviesExports } from '../../constants/exports'

const Movies = () => {
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
  } = useFilters(movieDefaultFilters)

  const {
    genres,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    query,
    setQuery,
    pagination,
    setPagination,
    onPageChange,
    movies,
  } = useMovies(appliedFilters)

  return (
    <Layout>
      <div className='movies'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Movies</h1>
            <Breadcrumbs links={moviesBreadcrumbs} />
          </div>
          <div className='actions'>
            <Exports items={moviesExports} />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add movie'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search movie'
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
                  <FilterGroup title='Genres' opened>
                    <div className='filters-checkbox'>
                      {genres?.map((genre) => (
                        <Checkbox
                          id={genre.key}
                          checked={currentFilters.genres?.includes(genre.key)}
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              genres: currentFilters.genres?.includes(genre.key)
                                ? currentFilters.genres.filter(
                                    (item) => genre.key !== item
                                  )
                                : [...currentFilters.genres, genre.key],
                            })
                          }
                          label={genre.value}
                        />
                      ))}
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Price' opened>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='min-price'>
                        Minimum price
                      </label>
                      <TextField
                        id='min-price'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              minPrice:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.minPrice,
                            }
                          })
                        }
                        value={
                          currentFilters.minPrice === null
                            ? ''
                            : currentFilters.minPrice?.toString()
                        }
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <label className='input-label' htmlFor='max-price'>
                        Maximun price
                      </label>
                      <TextField
                        id='max-price'
                        type='number'
                        onChange={(e) =>
                          setCurrentFilters((prev) => {
                            const value = e.target.value

                            return {
                              ...prev,
                              maxPrice:
                                value === ''
                                  ? null
                                  : !isNaN(+value) && +value >= 0
                                  ? +value
                                  : prev.maxPrice,
                            }
                          })
                        }
                        value={
                          currentFilters.maxPrice === null
                            ? ''
                            : currentFilters.maxPrice?.toString()
                        }
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Status' opened>
                    <div className='filters-radio'>
                      <Radio
                        checked={currentFilters.status === 'available'}
                        onChange={() =>
                          setCurrentFilters({
                            ...currentFilters,
                            status: 'available',
                          })
                        }
                        label='Available'
                      />
                      <Radio
                        checked={currentFilters.status === 'not_available'}
                        onChange={() =>
                          setCurrentFilters({
                            ...currentFilters,
                            status: 'not_available',
                          })
                        }
                        label='Not available'
                      />
                      <Radio
                        checked={currentFilters.status === null}
                        onChange={() =>
                          setCurrentFilters({
                            ...currentFilters,
                            status: null,
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
          columns={movieCols}
          rows={movies}
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

export default Movies
