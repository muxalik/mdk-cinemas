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
import useSessions from '../../hooks/sessions/useSessions'
import { sessionsBreadcrumbs } from '../../constants/breadcrumbs'
import { sessionsExports } from '../../constants/exports'
import { useNavigate } from 'react-router-dom'

const Sessions = () => {
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
  } = useFilters(sessionDefaultFilters)

  const {
    sortBy,
    sortOrder,
    query,
    pagination,
    onPageChange,
    sessions,
    editSession,
    deleteSession,
    toggleSort,
    onSearch,
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
              text='Add session'
              icon={plus}
              onClick={() => navigate('create')}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search session'
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
                  <FilterGroup title='Ticket price' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-price'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minTicketPrice: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.minTicketPrice}
                        label='Minimum ticket price'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-ticket-price'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxTicketPrice: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.maxTicketPrice}
                        label='Maximun ticket price'
                        placeholder='Maximum...'
                      />
                    </div>
                  </FilterGroup>
                  <FilterGroup title='Ticket price' opened>
                    <div className='filters-group'>
                      <TextField
                        id='min-free-places'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            minFreePlaces: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.minFreePlaces}
                        label='Minimum free places'
                        placeholder='Minimum...'
                      />
                    </div>
                    <div className='filters-group'>
                      <TextField
                        id='max-free-places'
                        type='number'
                        onChange={(value) =>
                          setCurrentFilters({
                            ...currentFilters,
                            maxFreePlaces: !value.length ? null : +value,
                          })
                        }
                        value={currentFilters.maxFreePlaces}
                        label='Maximun free places'
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
          onColumnClick={toggleSort}
          sortedCol={sortBy}
          sortOrder={sortOrder}
          onRowDelete={deleteSession}
          onRowEdit={editSession}
        />
      </div>
    </Layout>
  )
}

export default Sessions
