import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { WeatherPage } from './pages/WeatherPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/weather' element={<WeatherPage />} />
    </Routes>
  )
}

export default App
