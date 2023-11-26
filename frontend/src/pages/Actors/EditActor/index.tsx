import './styles.scss'
import Layout from '../../../layouts/Layout'
import Footer from '../../../layouts/Footer'
import { FC, useEffect, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Variants } from '../../../enums'
import { check, cross } from '../../../assets'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import { actorEditBreadcrumbs } from '../../../constants/breadcrumbs'
import FormCard from '../../../components/UI/FormCard'
import TextField from '../../../components/UI/TextField'
import Table from '../../../components/UI/Table'
import { actorMovieCols } from '../../../constants/tableCols'
import { useLocation, useNavigate } from 'react-router-dom'
import api, { baseURL } from '../../../utils/api'
import useSort from '../../../hooks/useSort'
import { actorMovie } from '../../../types'
import { isEqual } from 'lodash'

type data = {
  name: string | null
  movies: {
    id: number
    is_main_role: boolean
  }[]
  total_movies: number | null
  main_role_movies: number | null
}

const EditActor = () => {
  const navigate = useNavigate()
  const state = useLocation().state
  const actor = state?.actor
  const [actorMovies, setActorMovies] = useState<actorMovie[]>([])

  const defaultData: data = {
    name: actor?.name,
    movies: actorMovies.map((movie) => ({
      id: movie.id,
      is_main_role: movie.main_role.value,
    })),
    total_movies: actor?.total_movies || 0,
    main_role_movies: actor?.main_role_movies || 0,
  }

  const [data, setData] = useState<data>(defaultData)
  const [fakeDeleted, setFakeDeleted] = useState<number[]>([])
  const { sortBy, sortOrder, toggleSort } = useSort()

  const setField = (field: string, value: string | number) => {
    setData({
      ...data,
      [field]: value,
    })
  }

  const canBeSaved =
    !isEqual(defaultData, data) &&
    Object.values(data).every((value) => value !== null && value !== undefined)

  const fetchActorMovies = () => {
    api
      .get(baseURL + `/actors/${actor.id}/edit`, {
        params: {
          sort: sortBy,
          order: sortOrder,
        },
      })
      .then((response) => {
        const movies = response.data.data

        setActorMovies(movies)

        setData({
          ...data,
          movies: movies
            .filter((movie: actorMovie) => !fakeDeleted.includes(movie.id))
            .map((movie: actorMovie) => ({
              id: movie.id,
              is_main_role: movie.main_role.value,
            })),
        })
      })
      .catch(console.log)
  }

  useEffect(() => {
    fetchActorMovies()
  }, [sortBy, sortOrder])

  const redirectBack = () => navigate('/actors', { state: {} })

  const onCancel = () => redirectBack()

  const onSave = () => {
    api
      .patch(baseURL + `/actors/${actor.id}`, {
        name: data.name,
        movies: data.movies,
        deleted_movies: fakeDeleted,
      })
      .then(() => {
        redirectBack()
      })
      .catch(console.log)
  }

  const fakeDelete = (movieId: number) => {
    setFakeDeleted([...fakeDeleted, movieId])

    setActorMovies((prev) =>
      prev.filter((actorMovie) => actorMovie.id !== movieId)
    )

    const movie = actorMovies.find((movie) => movie.id === movieId)

    setData((prev) => ({
      ...prev,
      total_movies: (prev.total_movies || 0) - 1,
      main_role_movies: movie?.main_role.value
        ? (prev.main_role_movies || 0) - 1
        : prev.main_role_movies,
    }))
  }

  return (
    <Layout>
      <div className='actors has-footer'>
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
                        forceDigitalValue
                      />
                    </div>
                    <div className='input-group'>
                      <TextField
                        type='text'
                        id='main_role_movies'
                        label='Main role movies'
                        value={data.main_role_movies}
                        readOnly
                        forceDigitalValue
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
                onRowDelete={fakeDelete}
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
