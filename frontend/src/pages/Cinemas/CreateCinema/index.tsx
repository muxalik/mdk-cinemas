import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { FC } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross } from '../../../assets'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { cinemasCreateBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import TextField from '../../../components/UI/TextField'
import Select from '../../../components/UI/Select'
import useCinema from '../../../hooks/cinemas/useCinema'

const CreateCinema = () => {
  const { data, setField, statuses, onCancel, onCreate, canBeSaved } =
    useCinema()

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Add Cinema</h1>
            <Breadcrumbs links={cinemasCreateBreadcrumbs} />
          </div>
          <div className='actions'>
            <Controls
              onCancel={onCancel}
              onCreate={onCreate}
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
                  id='district'
                  label='District'
                  placeholder='Enter district'
                  value={data.district}
                  onChange={(value) => setField('district', value)}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='address'
                  label='Address'
                  placeholder='Enter address'
                  value={data.address}
                  onChange={(value) => setField('address', value)}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='category'
                  label='Category'
                  placeholder='Enter category'
                  value={data.category}
                  onChange={(value) => setField('category', value)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='capacity'
                  label='Capacity'
                  placeholder='Enter capacity'
                  value={data.capacity}
                  onChange={(value) => setField('capacity', +value)}
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
          </FormCard>
        </div>
        <Footer>
          <div className='footer-wrapper'>
            <div className='actions'>
              <Controls
                onCancel={onCancel}
                onCreate={onCreate}
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
  onCreate: () => void
  saveDisabled: boolean
}

const Controls: FC<controlsProps> = ({ onCancel, onCreate, saveDisabled }) => (
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
      text='Add cinema'
      onClick={onCreate}
    />
  </>
)

export default CreateCinema
