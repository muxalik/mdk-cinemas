import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { ChangeEvent, FC, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross, dollar } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { sessionCreateBreadcrumbs, sessionEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import Select, { option } from '../../../components/UI/Select'
import api, { baseURL } from '../../../utils/api'
import TextField from '../../../components/UI/TextField'
import DatePicker from '../../../components/UI/DatePicker'
import dateToDateTime from '../../../utils/dateToDateTime'
import { isEqual } from 'lodash'
import useCinemaList from '../../../hooks/cinemas/useCinemaList'
import useMoviesList from '../../../hooks/movies/useMoviesList'

type data = {
  cinemaId: number | null
  movieId: number | null
  ticketPrice: number | null
  freePlaces: number | null
  startsAt: string | null
}

const defaultData: data = {
  cinemaId: null,
  movieId: null,
  ticketPrice: null,
  freePlaces: null,
  startsAt: null,
}

const CreateSession = () => {
  const navigate = useNavigate()
  const [cinemas] = useCinemaList()
  const [movies] = useMoviesList()
  const [data, setData] = useState<data>(defaultData)

  const hasEdits = !isEqual(data, defaultData)

  const redirectBack = () => navigate('/sessions')

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .post(baseURL + '/sessions/', {
        cinema: data?.cinemaId,
        movie: data?.movieId,
        ticket_price: data?.ticketPrice,
        free_places: data?.freePlaces,
        starts_at: data?.startsAt,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const onCinemaChange = (option: option) =>
    setData({
      ...data,
      cinemaId: +option.value,
    })

  const onMovieChange = (option: option) =>
    setData({
      ...data,
      movieId: +option.value,
    })

  const onFreePlacesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      freePlaces: +e.target.value,
    })
  }

  const onDateChange = (date: Date) =>
    setData({
      ...data,
      startsAt: dateToDateTime(date),
    })

  const onTicketPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      ticketPrice: +e.target.value,
    })

  return (
    <Layout>
      <div className='sessions'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Session</h1>
            <Breadcrumbs links={sessionCreateBreadcrumbs} />
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
                <Select
                  id='cinema'
                  variant='filled'
                  placeholder='Select cinema'
                  options={cinemas}
                  label='Cinema'
                  selected={data.cinemaId}
                  onChange={onCinemaChange}
                />
              </div>
              <div className='input-group'>
                <Select
                  id='movie'
                  variant='filled'
                  placeholder='Select movie'
                  options={movies}
                  label='Movie'
                  selected={data.movieId}
                  onChange={onMovieChange}
                />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='ticket_price'
                  label='Ticket price'
                  placeholder='Enter ticket price'
                  icon={dollar}
                  value={data.ticketPrice || ''}
                  onChange={onTicketPriceChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='free_places'
                  label='Free places'
                  placeholder='Enter free places'
                  value={data.freePlaces || ''}
                  onChange={onFreePlacesChange}
                />
              </div>
              <div className='input-group'>
                <DatePicker
                  label='Starts at'
                  onChange={onDateChange}
                  {...(data.startsAt?.length && {
                    startDate: new Date(Date.parse(data.startsAt || '')),
                  })}
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
      text='Add session'
      onClick={onSave}
    />
  </>
)

export default CreateSession
