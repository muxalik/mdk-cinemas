import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { ChangeEvent, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross, dollar } from '../../../assets'
import { useLocation, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { sessionEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import Select, { option } from '../../../components/UI/Select'
import api, { baseURL } from '../../../utils/api'
import { session } from '../../../types'
import TextField from '../../../components/UI/TextField'
import DatePicker from '../../../components/UI/DatePicker'
import dateToDateTime from '../../../utils/dateToDateTime'
import { isEqual } from 'lodash'
import useCinemaList from '../../../hooks/cinemas/useCinemaList'
import useMoviesList from '../../../hooks/movies/useMoviesList'

const EditSession = () => {
  const navigate = useNavigate()
  const { session } = useLocation().state
  const [cinemas] = useCinemaList()
  const [movies] = useMoviesList()
  const [tempSession, setTempSession] = useState<session>(session)

  const hasEdits = !isEqual(tempSession, session)

  const redirectBack = () => navigate('/sessions', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/sessions/${session.id}`, {
        cinema: tempSession.cinema.id,
        movie: tempSession.movie.id,
        ticket_price: tempSession.ticket_price.digital,
        free_places: tempSession.free_places,
        starts_at: tempSession.starts_at,
      })
      .then(redirectBack)
      .catch(console.log)
  }

  const onCinemaChange = (option: option) =>
    setTempSession({
      ...tempSession,
      cinema: {
        id: +option.value,
        name: option.name,
      },
    })

  const onMovieChange = (option: option) =>
    setTempSession({
      ...tempSession,
      movie: {
        id: +option.value,
        name: option.name,
      },
    })

  const onFreePlacesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempSession({
      ...tempSession,
      free_places: +e.target.value,
    })
  }

  const onDateChange = (date: Date) =>
    setTempSession({
      ...tempSession,
      starts_at: dateToDateTime(date),
    })

  const onTicketPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTempSession({
      ...tempSession,
      ticket_price: {
        digital: +e.target.value,
        formatted: '',
      },
    })

  return (
    <Layout>
      <div className='sessions'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Session</h1>
            <Breadcrumbs links={sessionEditBreadcrumbs} />
          </div>
          <div className='actions'>
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
              disabled={!hasEdits}
              icon={check}
              text='Save session'
              onClick={onSave}
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
                  selected={tempSession.cinema.id}
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
                  selected={tempSession.movie.id}
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
                  value={tempSession.ticket_price.digital}
                  onChange={onTicketPriceChange}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='free_places'
                  label='Free places'
                  placeholder='Enter free places'
                  value={tempSession.free_places}
                  onChange={onFreePlacesChange}
                />
              </div>
              <div className='input-group'>
                <DatePicker
                  label='Starts at'
                  onChange={onDateChange}
                  startDate={new Date(Date.parse(tempSession.starts_at))}
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
                disabled={!hasEdits}
                text='Save session'
                onClick={onSave}
              />
            </div>
          </div>
        </Footer>
      </div>
    </Layout>
  )
}

export default EditSession
