import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AcquisitionHub from './pages/AcquisitionHub'
import HomeNew from './pages/HomeNew'
import VideoIA from './pages/VideoIA'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/acquisitionhub" element={<AcquisitionHub />} />
        <Route path="/new-home" element={<HomeNew />} />
        <Route path="/video-ia" element={<VideoIA />} />
      </Routes>
    </div>
  )
}

export default App

