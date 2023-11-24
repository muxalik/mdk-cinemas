import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { ChangeEvent, FC, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross } from '../../../assets'
import { useLocation, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { cinemasEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import api, { baseURL } from '../../../utils/api'
import { cinema } from '../../../types'
import TextField from '../../../components/UI/TextField'
import { isEqual } from 'lodash'
import Select, { option } from '../../../components/UI/Select'

const EditCinema = () => {
  const navigate = useNavigate()
  const { cinema } = useLocation().state
  const [tempCinema, setTempCinema] = useState<cinema>(cinema)

  const hasEdits = !isEqual(tempCinema, cinema)

  const redirectBack = () => navigate('/cinemas', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/cinemas/${cinema.id}`, {
        name: tempCinema.name,
        district: tempCinema.district,
        address: tempCinema.address,
        category: tempCinema.category,
        capacity: tempCinema.capacity,
        status: tempCinema.status,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempCinema({
      ...tempCinema,
      name: e.target.value,
    })

  const onDistrictChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempCinema({
      ...tempCinema,
      district: e.target.value,
    })

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempCinema({
      ...tempCinema,
      address: e.target.value,
    })

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempCinema({
      ...tempCinema,
      category: e.target.value,
    })

  const onCapacityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempCinema({
      ...tempCinema,
      capacity: +e.target.value,
    })

  const onStatusChange = (option: option) =>
    setTempCinema({
      ...tempCinema,
      status: option.value.toString(),
    })

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Cinema</h1>
            <Breadcrumbs links={cinemasEditBreadcrumbs} />
          </div>
          <div className='actions'>
            <Controls
              onCancel={onCancel}
              onSave={onSave}
              saveDisabled={!hasEdits}
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
                  value={tempCinema.name}
                  onChange={onNameChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='district'
                  label='District'
                  placeholder='Enter district'
                  value={tempCinema.district}
                  onChange={onDistrictChange}
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
                  value={tempCinema.address}
                  onChange={onAddressChange}
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
                  value={tempCinema.category}
                  onChange={onCategoryChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='capacity'
                  label='Capacity'
                  placeholder='Enter capacity'
                  value={tempCinema.capacity}
                  onChange={onCapacityChange}
                />
              </div>
              <div className='input-group'>
                <Select
                  id='status'
                  variant='outline'
                  placeholder='Select status'
                  options={[
                    {
                      value: 'Opened',
                      name: 'Opened',
                    },
                    {
                      value: 'Closed',
                      name: 'Closed',
                    },
                  ]}
                  label='Status'
                  selected={tempCinema.status}
                  onChange={onStatusChange}
                />
              </div>
            </div>
          </FormCard>
        </div>
        <Footer>
          <div className='footer-wrapper'>
            {/* <div className='completion'>
              <p className='completion-text'>Completion</p>
              <Label
                size='md'
                variant={getVariantByPercentage(completion)}
                text={`${completion}%`}
              />
            </div> */}
            <div className='actions'>
              <Controls
                onCancel={onCancel}
                onSave={onSave}
                saveDisabled={!hasEdits}
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
      text='Save cinema'
      onClick={onSave}
    />
  </>
)

export default EditCinema
