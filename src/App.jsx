import "./App.css";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router";
import { useGpsContext } from './context/GpsContext'
import { useEffect } from "react";

function App() {
  const gps = useGpsContext()

     useEffect(() => {
       // initialize GPS
       // → when initialized → use gps.setCurrentPosition()
     }, [])
  
  return (

    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
