import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { FC, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross, trash } from '../../../assets'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { actorEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import TextField from '../../../components/UI/TextField'
import Select from '../../../components/UI/Select'
import useActor from '../../../hooks/actors/useActor'
import Checkbox from '../../../components/UI/Checkbox'
import Table from '../../../components/UI/Table'
import useActorMovies from '../../../hooks/movies/useActorMovies'
import { actorMovieCols } from '../../../constants/tableCols'

const EditActor = () => {
  const { actor, data, setField, onCancel, onSave, canBeSaved } = useActor()

  const { sortBy, sortOrder, actorMovies, deleteActorMovie, toggleSort } =
    useActorMovies()

  return (
    <Layout>
      <div className='actors'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Actor</h1>
            <Breadcrumbs links={actorEditBreadcrumbs} />
          </div>
          <div className='actions'>
            <Controls
              onCancel={onCancel}
              onSave={onSave}
              saveDisabled={!canBeSaved}
            />
          </div>
        </div>
        <div className='content'>
          <div className='content-row'>
            <div className='general-info'>
              <FormCard title='General Information'>
                <div className='input-row'>
                  <div className='input-col'>
                    <div className='input-group'>
                      <TextField
                        type='text'
                        id='name'
                        label='Name'
                        placeholder='Enter name'
                        value={data.name}
                        onChange={(value) => setField('name', value)}
                      />
                    </div>
                    <div className='input-group'>
                      <TextField
                        type='text'
                        id='total_movies'
                        label='Total movies'
                        value={data.total_movies}
                        readOnly
                      />
                    </div>
                    <div className='input-group'>
                      <TextField
                        type='text'
                        id='main_role_movies'
                        label='Main role movies'
                        value={data.main_role_movies}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </FormCard>
            </div>
            <div className='table'>
              <Table
                columns={actorMovieCols}
                rows={actorMovies}
                onColumnClick={toggleSort}
                sortedCol={sortBy}
                sortOrder={sortOrder}
                onRowDelete={(movieId) => deleteActorMovie(actor.id, movieId)}
              />
            </div>
          </div>
        </div>
        <Footer>
          <div className='footer-wrapper'>
            <div className='actions'>
              <Controls
                onCancel={onCancel}
                onSave={onSave}
                saveDisabled={!canBeSaved}
              />
            </div>
          </div>
        </Footer>
      </div>
    </Layout>
  )
}

interface controlsProps {
  onCancel: () => void
  onSave: () => void
  saveDisabled: boolean
}

const Controls: FC<controlsProps> = ({ onCancel, onSave, saveDisabled }) => (
  <>
    <Button
      type='tertiary'
      variant={Variants.primary}
      icon={cross}
      text='Cancel'
      onClick={onCancel}
    />
    <Button
      type='primary'
      variant={Variants.primary}
      icon={check}
      disabled={saveDisabled}
      text='Save actor'
      onClick={onSave}
    />
  </>
)

export default EditActor
