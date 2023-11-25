import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { movieCols } from '../../constants/tableCols'
import FilterGroup from '../../components/UI/FilterGroup'
import Link from '../../components/UI/Link'
import Checkbox from '../../components/UI/Checkbox'
import Radio from '../../components/UI/Radio'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useMovies from '../../hooks/movies/useMovies'
import { movieBreadcrumbs } from '../../constants/breadcrumbs'
import { moviesExports } from '../../constants/exports'
import { useNavigate } from 'react-router-dom'
import { movieDefaultFilters, movieStatuses } from '../../constants/filters'

const Movies = () => {
  const navigate = useNavigate()

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
    sortOrder,
    query,
    pagination,
    onPageChange,
    movies,
    editMovie,
    deleteMovie,
    toggleSort,
    onSearch,
  } = useMovies(appliedFilters)

  const onGenreChange = (genreKey: string) =>
    setCurrentFilters({
      ...currentFilters,
      genres: currentFilters.genres?.includes(genreKey)
        ? currentFilters.genres.filter((item) => genreKey !== item)
        : [...currentFilters.genres, genreKey],
    })

  return (
    <Layout>
      <div className='movies'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Movies</h1>
            <Breadcrumbs links={movieBreadcrumbs} />
          </div>
          <div className='actions'>
            <Exports items={moviesExports} />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add movie'
              icon={plus}
              onClick={() => navigate('create')}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search movie'
            icon={search}
            value={query}
            onChange={onSearch}
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
                          onChange={() => onGenreChange(genre.key)}
                          label={genre.value}
                        />
                      ))}
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Price' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-price'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minPrice: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.minPrice}
                        label='Minimum price'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-price'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxPrice: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.maxPrice}
                        label='Maximun price'
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Status' opened>
                    <div className='filters-radio'>
                      {movieStatuses.map((status) => (
                        <Radio
                          checked={currentFilters.status === status.value}
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              status: status.value.toString(),
                            })
                          }
                          label={status.name}
                        />
                      ))}
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
          onColumnClick={toggleSort}
          sortedCol={sortBy}
          sortOrder={sortOrder}
          onRowDelete={deleteMovie}
          onRowEdit={editMovie}
        />
      </div>
    </Layout>
  )
}

export default Movies
