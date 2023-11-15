import './styles.scss'
import Layout from '../../layouts/Layout'
import { useState } from 'react'
import Pagination from '../../components/UI/Pagination'

const Dashboard = () => {
  const [current, setCurrent] = useState<number>(1)

  return (
    <Layout>
      <div className='dashboard'>
        <div className='grid'>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
