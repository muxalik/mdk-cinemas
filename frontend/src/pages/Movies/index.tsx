import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { movie, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { movieCols } from '../../constants/tableCols'
import useMovieFilters from '../../hooks/filters/useMovieFilters'
import FilterGroup from '../../components/UI/FilterGroup'
import Link from '../../components/UI/Link'
import Popup from '../../components/UI/Popup'
import Checkbox from '../../components/UI/Checkbox'
import useGenres from '../../hooks/useGenres'
import Radio from '../../components/UI/Radio'

const Movies = () => {
  const genres = useGenres()
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<movie[] | null>(null)
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
  } = useMovieFilters()

  useEffect(() => {
    api
      .get(baseURL + '/movies', {
        params: {
          page: pagination.current,
          search: query,
          sort: sortBy,
          order: sortOrder,
          genres: appliedFilters.genres,
          min_price: appliedFilters.minPrice,
          max_price: appliedFilters.maxPrice,
          status: appliedFilters.status,
        },
      })
      .then((response) => {
        setMovies(response.data.data)
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

  const rows = movies?.map((movie) => {
    return [
      movie.name,
      movie.producer,
      movie.operator,
      movie.genre,
      movie.production,
      movie.awards,
      movie.duration,
      movie.status,
      movie.price,
    ]
  })

  return (
    <Layout>
      <div className='movies'>
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
                  title: 'Movies',
                  to: '/movies',
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
                    downloadFromUrl('/movies/excel', 'movies.xlsx'),
                },
                {
                  icon: pdf,
                  text: 'PDF',
                  download: () => downloadFromUrl('/movies/pdf', 'movies.pdf'),
                },
              ]}
            />
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
            </Popup>
          </div>
        </div>
        <Table
          columns={movieCols}
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

export default Movies
