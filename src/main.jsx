import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import App from './App.jsx'
import Home from './pages/Home.jsx'
import Place from './pages/Place.jsx'
import About from './pages/About.jsx'


import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter basename="/mentoring-project">
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path=":id" element={<Place />} />
      <Route path="about" element={<About />} />
    </Route>
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
