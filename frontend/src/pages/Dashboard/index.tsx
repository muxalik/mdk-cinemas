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
          <Pagination
            current={current}
            onChange={setCurrent}
            total={15}
            start={5}
            siblings={1}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
