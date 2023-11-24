import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { cross, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { cinemaCols } from '../../constants/tableCols'
import Link from '../../components/UI/Link'
import FilterGroup from '../../components/UI/FilterGroup'
import Radio from '../../components/UI/Radio'
import Filters from '../../components/Filters'
import useFilters from '../../hooks/useFilters'
import useCinemas from '../../hooks/useCinemas'
import { cinemasBreadcrumbs } from '../../constants/breadcrumbs'
import { cinemasExports } from '../../constants/exports'
import { useNavigate } from 'react-router-dom'
import { cinemaDefaultFilters, cinemaStatuses } from '../../constants/filters'

const Cinemas = () => {
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
  } = useFilters(cinemaDefaultFilters)

  const {
    sortBy,
    sortOrder,
    query,
    pagination,
    onPageChange,
    cinemas,
    editCinema,
    deleteCinema,
    toggleSort,
    onSearch,
  } = useCinemas(appliedFilters)

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Cinemas</h1>
            <Breadcrumbs links={cinemasBreadcrumbs} />
          </div>
          <div className='actions'>
            <Exports items={cinemasExports} />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add cinema'
              icon={plus}
              onClick={() => navigate('create')}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search cinema'
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
              <div className='filters-body'>
                <div className='filters-inner'>
                  <FilterGroup title='Capacity' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-capacity'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minCapacity: !value.length ? null : +value,
                          })
                        }
                        onlyNumbers={true}
                        value={currentFilters.minCapacity}
                        label='Minimum capacity'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-capacity'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxCapacity: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.maxCapacity}
                        label='Maximun capacity'
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Status' opened>
                    <div className='filters-radio'>
                      {cinemaStatuses.map((status) => (
                        <Radio
                          checked={currentFilters.status === status.key}
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              status: status.key,
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
          columns={cinemaCols}
          rows={cinemas}
          pagination={pagination}
          onPageChange={onPageChange}
          onColumnClick={toggleSort}
          sortedCol={sortBy}
          sortOrder={sortOrder}
          onRowDelete={deleteCinema}
          onRowEdit={editCinema}
        />
      </div>
    </Layout>
  )
}

export default Cinemas
