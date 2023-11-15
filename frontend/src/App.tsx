import { Routes, Route, Navigate } from 'react-router-dom'

import './styles/variables.scss'
import './App.scss'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route path='/cinemas' element={<Dashboard />} />
        <Route path='/products/create' element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/cinemas' />} />
      </Routes>
    </div>
  )
}

export default App
