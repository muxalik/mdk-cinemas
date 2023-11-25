import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import { actorDefaultFilters } from '../../types'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { actorCols } from '../../constants/tableCols'
import FilterGroup from '../../components/UI/FilterGroup'
import Link from '../../components/UI/Link'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useActors from '../../hooks/actors/useActors'
import { actorBreadcrumbs } from '../../constants/breadcrumbs'
import { actorsExports } from '../../constants/exports'
import { useNavigate } from 'react-router-dom'

const Actors = () => {
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
  } = useFilters(actorDefaultFilters)

  const {
    sortBy,
    sortOrder,
    query,
    pagination,
    onPageChange,
    actors,
    editActor,
    deleteActor,
    toggleSort,
    onSearch,
  } = useActors(appliedFilters)

  return (
    <Layout>
      <div className='actors'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Actors</h1>
            <Breadcrumbs links={actorBreadcrumbs} />
          </div>
          <div className='actions'>
            <Exports items={actorsExports} />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add actor'
              icon={plus}
              onClick={() => navigate('create')}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search actor'
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
                  <FilterGroup title='Movies' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-movies'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minMovies: +value,
                          })
                        }
                        value={currentFilters.minMovies}
                        label='Minimum movies'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-movies'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxMovies: +value,
                          })
                        }
                        value={currentFilters.maxMovies}
                        label='Maximun movies'
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Main roles' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-main-roles'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minMainRoles: +value,
                          })
                        }
                        value={currentFilters.minMainRoles}
                        label='Minimum main roles'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-main-roles'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxMainRoles: +value,
                          })
                        }
                        value={currentFilters.maxMainRoles}
                        label='Maximun main roles'
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
          rows={actors}
          pagination={pagination}
          onPageChange={onPageChange}
          onColumnClick={toggleSort}
          sortedCol={sortBy}
          sortOrder={sortOrder}
          onRowDelete={deleteActor}
          onRowEdit={editActor}
        />
      </div>
    </Layout>
  )
}

export default Actors
