import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { FC } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross, dollar } from '../../../assets'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { sessionEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import Select from '../../../components/UI/Select'
import TextField from '../../../components/UI/TextField'
import DatePicker from '../../../components/UI/DatePicker'
import dateToDateTime from '../../../utils/dateToDateTime'
import useCinemaList from '../../../hooks/cinemas/useCinemaList'
import useMoviesList from '../../../hooks/movies/useMoviesList'
import useSession from '../../../hooks/sessions/useSession'

const EditSession = () => {
  const [cinemasList] = useCinemaList()
  const [moviesList] = useMoviesList()
  const { data, setField, onCancel, onSave, canBeSaved } = useSession()

  return (
    <Layout>
      <div className='sessions'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Edit Session</h1>
            <Breadcrumbs links={sessionEditBreadcrumbs} />
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
                <Select
                  id='cinema'
                  variant='filled'
                  placeholder='Select cinema'
                  options={cinemasList}
                  label='Cinema'
                  selected={data.cinemaId}
                  onChange={(option) => setField('cinemaId', option.value)}
                />
              </div>
              <div className='input-group'>
                <Select
                  id='movie'
                  variant='filled'
                  placeholder='Select movie'
                  options={moviesList}
                  label='Movie'
                  selected={data.movieId}
                  onChange={(option) => setField('movieId', option.value)}
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
                  value={data.ticketPrice}
                  onChange={(value) => setField('ticketPrice', +value)}
                />
              </div>
              <div className='input-group'>
                <TextField
                  type='number'
                  id='free_places'
                  label='Free places'
                  placeholder='Enter free places'
                  value={data.freePlaces}
                  onChange={(value) => setField('freePlaces', +value)}
                />
              </div>
              <div className='input-group'>
                <DatePicker
                  label='Starts at'
                  onChange={(date) =>
                    setField('startsAt', dateToDateTime(date))
                  }
                  startDate={new Date(Date.parse(data.startsAt || ''))}
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
      text='Save session'
      onClick={onSave}
    />
  </>
)

export default EditSession
