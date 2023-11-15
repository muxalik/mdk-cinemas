import './styles.scss'
import Layout from '../../layouts/Layout'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import Button from '../../components/UI/Button'
import { Variants } from '../../enums'
import { exportIcon, plus, search, slider } from '../../assets'
import TextField from '../../components/UI/TextField'
import Pagination from '../../components/UI/Pagination'

const Cinemas = () => {
  return (
    <Layout>
      <div className='cinemas'>
        <div className='intro'>
          <div className='location'>
            <h1 className='title'>Cinemas</h1>
            <Breadcrumbs
              links={[
                {
                  title: 'Home',
                  to: '/cinemas',
                },
                {
                  title: 'Cinemas',
                  to: '/cinemas',
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
            />
            <Button
              type='primary'
              variant={Variants.primary}
              text='Add cinema'
              icon={plus}
            />
          </div>
        </div>
        <div className='controls'>
          <TextField placeholder='Search cinema' icon={search} />
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
                <th className='table-header-cell cinema'>
                  <span className='table-title'>Cinema</span>
                </th>
                <th className='table-header-cell district'>
                  <span className='table-title'>District</span>
                </th>
                <th className='table-header-cell capacity'>
                  <span className='table-title'>Capacity</span>
                </th>
                <th className='table-header-cell status'>
                  <span className='table-title'>Status</span>
                </th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {Array.from({ length: 5 })
                .fill(0)
                .map(() => (
                  <tr className='table-row'>
                    <td className='table-cell'>
                      <span className='cinema-name'>Cinema#1</span>
                    </td>
                    <td className='table-cell'>
                      <span>District#1</span>
                    </td>
                    <td className='table-cell'>
                      <span>123</span>
                    </td>
                    <td className='table-cell'>
                      <span>Is opened</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='table-footer'>
            <p className='progress'>Showing 1-10 from 15</p>
            <Pagination total={5} current={1} onChange={() => {}} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cinemas
