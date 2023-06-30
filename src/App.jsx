import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import NewRegister from './pages/NewRegister';
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Cinemas from './pages/Cinemas';
import Dashboard from './pages/Dashboard';
import PerfilFilme from './pages/PerfilFilme';
import FullListFilmes from './pages/FullListFilmes';
import PerfilCinema from './pages/PerfilCinema';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route path='/Novo_Registro' element={<NewRegister />}/>
        <Route path="/Home/:userName" element={<Home />}/>
        <Route path='/Filmes' element={<Filmes />} />
        <Route path='/Cinemas' element={<Cinemas />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/Filmes/:id' element={<PerfilFilme />}/>
        <Route path='/Lista_Completa' element={<FullListFilmes />}/>
        <Route path='/Lista_Completa/:genero' element={<FullListFilmes />}/>
        <Route path='/Cinema/:idCinema' element={<PerfilCinema />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
