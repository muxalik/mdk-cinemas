import { Routes, Route, Navigate } from 'react-router-dom'

import './styles/variables.scss'
import './App.scss'
import Cinemas from './pages/Cinemas'
import Movies from './pages/Movies'
import Actors from './pages/Actors'
import Sessions from './pages/Sessions'
import EditSession from './pages/Sessions/EditSession'
import CreateSession from './pages/Sessions/CreateSession'

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route path='/cinemas'>
          <Route index element={<Cinemas />} />
          {/* <Route path='edit/:id' element={<Cinemas />} /> */}
        </Route>
        <Route path='/movies' element={<Movies />} />
        <Route path='/actors' element={<Actors />} />
        <Route path='/sessions'>
          <Route index element={<Sessions />} />
          <Route path='create' element={<CreateSession />} />
          <Route path=':id/edit' element={<EditSession />} />
        </Route>
        <Route path='*' element={<Navigate to='/cinemas' />} />
      </Routes>
    </div>
  )
}

export default App
