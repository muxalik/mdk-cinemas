import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { pdf, plus, search, slider, xlsx } from '../../assets'
import TextField from '../../components/UI/TextField'
import { movie, pagination } from '../../types'
import api, { baseURL } from '../../utils/api'
import downloadFromUrl from '../../utils/downloadFromUrl'
import Exports from '../../components/Exports'
import Table from '../../components/UI/Table'
import { movieCols } from '../../constants/tableCols'

const Movies = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<movie[] | null>(null)
  const [pagination, setPagination] = useState<pagination>({
    current: 1,
    total: 0,
    from: 0,
    to: 0,
    perPage: 10,
  })

  useEffect(() => {
    api
      .get(baseURL + '/movies', {
        params: {
          page: pagination.current,
          search: query,
        },
      })
      .then((response) => {
        setMovies(response.data.data)
        setPagination({
          current:
            response.data.current_page || response.data.meta.current_page,
          total: response.data.total || response.data.meta.total,
          from: response.data.from || response.data.meta.from,
          to: response.data.to || response.data.meta.to,
          perPage: response.data.per_page || response.data.meta.per_page,
        })
      })
      .catch(console.log)
  }, [pagination.current, query])

  const onPageChange = (page: number) =>
    setPagination((prev) => {
      return {
        ...prev,
        current: page,
      }
    })

  const rows = movies?.map((movie) => {
    return [
      movie.name,
      movie.producer,
      movie.operator,
      movie.genre,
      movie.production,
      movie.awards,
      movie.duration,
      movie.status,
      movie.price,
    ]
  })

  return (
    <Layout>
      <div className='movies'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Movies</h1>
            <Breadcrumbs
              links={[
                {
                  title: 'Home',
                  to: '/',
                },
                {
                  title: 'Movies',
                  to: '/movies',
                },
              ]}
            />
          </div>
          <div className='actions'>
            <Exports
              items={[
                {
                  icon: xlsx,
                  text: 'Excel',
                  download: () =>
                    downloadFromUrl('/movies/excel', 'movies.xlsx'),
                },
                {
                  icon: pdf,
                  text: 'PDF',
                  download: () => downloadFromUrl('/movies/pdf', 'movies.pdf'),
                },
              ]}
            />{' '}
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add movie'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField
            placeholder='Search movie'
            icon={search}
            value={query}
            onChange={(e) => {
              setPagination((prev) => {
                return {
                  ...prev,
                  current: 1,
                }
              })
              setQuery(e.target.value)
            }}
          />
          <Button
            type='tertiary'
            variant={Variants.primary}
            text='Filters'
            icon={slider}
          />
        </div>
        <Table
          columns={movieCols}
          rows={rows}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </Layout>
  )
}

export default Movies
