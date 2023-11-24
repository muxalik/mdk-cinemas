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
import { movie } from '../../../types'
import TextField from '../../../components/UI/TextField'
import Select, { option } from '../../../components/UI/Select'
import useGenres from '../../../hooks/useGenres'
import { useMask } from '@react-input/mask'
import { isEqual } from 'lodash'

const EditMovie = () => {
  const navigate = useNavigate()
  const { movie } = useLocation().state
  const [tempMovie, setTempMovie] = useState<movie>(movie)

  const hasEdits =
    Object.values(tempMovie).every((value) => value !== null) &&
    !isEqual(movie, tempMovie)

  const redirectBack = () => navigate('/movies', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/movies/${movie.id}`, {
        name: tempMovie.name,
        producer: tempMovie.producer,
        operator: tempMovie.operator,
        genre: tempMovie.genre,
        production: tempMovie.production,
        awards: tempMovie.awards,
        duration:
          parseInt(tempMovie.duration.split(' ')[0]) * 60 +
          parseInt(tempMovie.duration.split(' ')[1]),
        status: tempMovie.status,
        price: tempMovie.price.digital,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const durationRef = useMask({
    mask: '0h 00m',
    replacement: { '0': /\d/ },
    showMask: true,
  })

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      name: e.target.value,
    })

  const onProducerChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      producer: e.target.value,
    })

  const onOperatorChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      operator: e.target.value,
    })

  const onGenreChange = (option: option) =>
    setTempMovie({
      ...tempMovie,
      genre: option.value.toString(),
    })

  const onProductionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      production: e.target.value,
    })

  const onAwardsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      awards: e.target.value,
    })

  const onDurationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      duration: e.target.value,
    })

  const onStatusChange = (option: option) =>
    setTempMovie({
      ...tempMovie,
      status: option.value.toString(),
    })

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempMovie({
      ...tempMovie,
      price: {
        ...tempMovie.price,
        digital: +e.target.value,
      },
    })

  const genres = useGenres()

  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Movie</h1>
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
                  value={tempMovie.name}
                  onChange={onNameChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='producer'
                  label='Producer'
                  placeholder='Enter producer'
                  value={tempMovie.producer}
                  onChange={onProducerChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='text'
                  id='operator'
                  label='Operator'
                  placeholder='Enter operator'
                  value={tempMovie.operator}
                  onChange={onOperatorChange}
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
                  value={tempMovie.production}
                  onChange={onProductionChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  ref={durationRef}
                  type='text'
                  id='duration'
                  label='Duration'
                  placeholder='Enter duration'
                  value={tempMovie.duration}
                  onChange={onDurationChange}
                />
              </div>
              <div className='input-group'>
                <Select
                  id='status'
                  variant='outline'
                  placeholder='Select status'
                  options={[
                    {
                      value: 'Available',
                      name: 'Available',
                    },
                    {
                      value: 'Not available',
                      name: 'Not available',
                    },
                  ]}
                  label='Status'
                  selected={tempMovie.status}
                  onChange={onStatusChange}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <Select
                  id='genres'
                  variant='outline'
                  placeholder='Select genre'
                  options={
                    genres?.map((genre): option => {
                      return {
                        value: genre.key,
                        name: genre.value,
                      }
                    }) || []
                  }
                  label='Genre'
                  selected={tempMovie.genre}
                  onChange={onGenreChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='price'
                  label='Price'
                  placeholder='Enter price'
                  value={tempMovie.price.digital}
                  onChange={onPriceChange}
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
                  value={tempMovie.awards}
                  onChange={onAwardsChange}
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
      text='Save movie'
      onClick={onSave}
    />
  </>
)

export default EditMovie
