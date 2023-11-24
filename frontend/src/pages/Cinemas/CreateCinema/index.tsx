import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { ChangeEvent, FC, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { cinemasEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import api, { baseURL } from '../../../utils/api'
import TextField from '../../../components/UI/TextField'
import { isEqual } from 'lodash'
import Select, { option } from '../../../components/UI/Select'

type data = {
  name: string | null
  district: string | null
  address: string | null
  category: string | null
  capacity: number | null
  status: string
}

const defaultData: data = {
  name: null,
  district: null,
  address: null,
  category: null,
  capacity: null,
  status: 'Opened',
}

const CreateCinema = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<data>(defaultData)

  const valid = Object.values(data).every((value) => value !== null)

  const redirectBack = () => navigate('/cinemas')

  const onCancel = () => redirectBack()

  const onCreate = () => {
    api
      .post(baseURL + '/cinemas', {
        name: data.name,
        district: data.district,
        address: data.address,
        category: data.category,
        capacity: data.capacity,
        status: data.status,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      name: e.target.value,
    })

  const onDistrictChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      district: e.target.value,
    })

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      address: e.target.value,
    })

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      category: e.target.value,
    })

  const onCapacityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      capacity: +e.target.value,
    })

  const onStatusChange = (option: option) =>
    setData({
      ...data,
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
              onCreate={onCreate}
              saveDisabled={!valid}
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
                  value={data.name || ''}
                  onChange={onNameChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='district'
                  label='District'
                  placeholder='Enter district'
                  value={data.district || ''}
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
                  value={data.address || ''}
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
                  value={data.category || ''}
                  onChange={onCategoryChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='capacity'
                  label='Capacity'
                  placeholder='Enter capacity'
                  value={data.capacity?.toString()}
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
                  selected={data.status}
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
                onCreate={onCreate}
                saveDisabled={!valid}
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
