import './App.css';
import './index.css';
import  Header from './assets/components/Header.jsx';
import Footer from './assets/components/Footer.jsx';
import Radar from './assets/components/radar.jsx';
import useRadar from './hooks/useRadar'

function App() {
  const {
    lon,
    lat,
    alpha,
    logText,
    distanceText,
    enableCompass,
  } = useRadar()

  return (
    <div className="App">
      <Header />
      <main>
        <Radar
          lon={lon}
          lat={lat}
          alpha={alpha}
          distanceText={distanceText}
          onEnableCompass={enableCompass}
          logText={logText}
        />
      </main>

      <Footer />
    </div>
  )
}


export default App
