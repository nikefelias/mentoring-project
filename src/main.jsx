import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'


import App from './App.jsx'
import Home from './pages/Home.jsx'
import Place from './pages/Place.jsx'
import About from './pages/About.jsx'
import Register from './components/Register.jsx'
import Rewards from './pages/Rewards.jsx'
import { GpsContextProvider } from './context/GpsContext.jsx'
import {AuthProvider} from './context/AuthContext'
import { AuthRoute } from './components/AuthRoute.jsx'


import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'
import Signup from './pages/Signup.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GpsContextProvider>
      <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path=":id" element={<Place />} />
            <Route path="about" element={<About />} />
               <Route element={<AuthRoute />}>
               <Route path="rewards" element={<Rewards />} />
               </Route>
            <Route path="register" element={<Signup />} />
          
            
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </GpsContextProvider>
  </StrictMode>,
)
