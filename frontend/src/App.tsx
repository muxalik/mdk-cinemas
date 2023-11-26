import { Routes, Route, Navigate } from 'react-router-dom'

import './styles/variables.scss'
import './App.scss'
import Cinemas from './pages/Cinemas'
import Movies from './pages/Movies'
import Actors from './pages/Actors'
import Sessions from './pages/Sessions'
import EditSession from './pages/Sessions/EditSession'
import CreateSession from './pages/Sessions/CreateSession'
import EditCinema from './pages/Cinemas/EditCinema'
import CreateCinema from './pages/Cinemas/CreateCinema'
import EditMovie from './pages/Movies/EditMovie'
import CreateMovie from './pages/Movies/CreateMovie'
import EditActor from './pages/Actors/EditActor'
import CreateActor from './pages/Actors/CreateActor'

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route path='/cinemas'>
          <Route index element={<Cinemas />} />
          <Route path='create' element={<CreateCinema />} />
          <Route path=':id/edit' element={<EditCinema />} />
        </Route>
        <Route path='/movies'>
          <Route index element={<Movies />} />
          <Route path='create' element={<CreateMovie />} />
          <Route path=':id/edit' element={<EditMovie />} />
        </Route>
        <Route path='/actors'>
          <Route index element={<Actors />} />
          <Route path='create' element={<CreateActor />} />
          <Route path=':id/edit' element={<EditActor />} />
        </Route>
        {/* <Route path='/sessions'>
          <Route index element={<Sessions />} />
          <Route path='create' element={<CreateSession />} />
          <Route path=':id/edit' element={<EditSession />} />
        </Route> */}
        <Route path='*' element={<Navigate to='/cinemas' />} />
      </Routes>
    </div>
  )
}

export default App
