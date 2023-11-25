import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { FC } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross, dollar } from '../../../assets'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { movieEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import TextField from '../../../components/UI/TextField'
import Select from '../../../components/UI/Select'
import useMovie from '../../../hooks/movies/useMovie'

const EditMovie = () => {
  const {
    data,
    setField,
    durationRef,
    onCancel,
    onSave,
    canBeSaved,
    statuses,
    genres,
  } = useMovie()

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Movie</h1>
            <Breadcrumbs links={movieEditBreadcrumbs} />
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
          <FormCard title='General Information'>
            <div className='input-row'>
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
                  id='producer'
                  label='Producer'
                  placeholder='Enter producer'
                  value={data.producer}
                  onChange={(value) => setField('producer', value)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='operator'
                  label='Operator'
                  placeholder='Enter operator'
                  value={data.operator}
                  onChange={(value) => setField('operator', value)}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='production'
                  label='Production'
                  placeholder='Enter production'
                  value={data.production}
                  onChange={(value) => setField('production', value)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  ref={durationRef}
                  type='text'
                  id='duration'
                  label='Duration'
                  placeholder='Enter duration'
                  value={data.duration}
                  onChange={(value) => setField('duration', value)}
                />
              </div>
              <div className='input-group'>
                <Select
                  id='status'
                  variant='outline'
                  placeholder='Select status'
                  options={statuses}
                  label='Status'
                  selected={data.status}
                  onChange={(option) => setField('status', option.value)}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <Select
                  id='genres'
                  variant='outline'
                  placeholder='Select genre'
                  options={genres}
                  label='Genre'
                  selected={data.genre}
                  onChange={(option) => setField('genre', option.value)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='price'
                  label='Price'
                  placeholder='Enter price'
                  icon={dollar}
                  value={data.price}
                  onChange={(value) => setField('price', +value)}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='awards'
                  label='Awards'
                  placeholder='Enter awards'
                  value={data.awards}
                  onChange={(value) => setField('awards', value)}
                />
              </div>
            </div>
          </FormCard>
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
      text='Save movie'
      onClick={onSave}
    />
  </>
)

export default EditMovie
