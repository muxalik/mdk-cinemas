import { Routes, Route, Navigate } from 'react-router-dom'

import './styles/variables.scss'
import './App.scss'
import Cinemas from './pages/Cinemas'
import Movies from './pages/Movies'
import Actors from './pages/Actors'

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route path='/cinemas' element={<Cinemas />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/actors' element={<Actors />} />
        <Route path='*' element={<Navigate to='/cinemas' />} />
      </Routes>
    </div>
  )
}

export default App
