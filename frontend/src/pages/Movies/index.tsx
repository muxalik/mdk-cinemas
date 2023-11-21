import { useEffect, useState } from 'react'
import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { exportIcon, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Pagination from '../../components/UI/Pagination'
import { movie } from '../../types'
import api, { baseURL } from '../../utils/api'
import downloadFromUrl from '../../utils/downloadFromUrl'

const Movies = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<movie[] | null>(null)
  const [pagination, setPagination] = useState({
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
            <Button
              type='secondary'
              variant={Variants.primary}
              text='Export'
              icon={exportIcon}
              onClick={() => downloadFromUrl('/movies/pdf', 'movies.pdf')}
            />
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
        <div className='table-wrapper'>
          <table className='table'>
            <thead className='table-header'>
              <tr className='table-header-row'>
                <th className='table-header-cell'>
                  <span className='table-title'>Name</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Producer</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Operator</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Genre</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Production</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Awards</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Duration</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Status</span>
                </th>
                <th className='table-header-cell'>
                  <span className='table-title'>Price</span>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {movies?.map((movie) => (
                <tr className='table-row' key={movie.id}>
                  <td className='table-cell'>
                    <span className='movie-name'>{movie.name}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.producer}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.operator}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.genre}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.production}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.awards}</span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.duration}</span>
                  </td>
                  <td className='table-cell'>
                    <span>
                      {movie.status}
                    </span>
                  </td>
                  <td className='table-cell'>
                    <span>{movie.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='table-footer'>
            <p className='progress'>
              Showing {pagination.from}-{pagination.to} from {pagination.total}
            </p>
            <Pagination
              total={Math.ceil(pagination.total / pagination.perPage)}
              current={pagination.current}
              onChange={(page) =>
                setPagination((prev) => {
                  return {
                    ...prev,
                    current: page,
                  }
                })
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Movies
