import Radar from '../components/radar.jsx'
import useRadar from '../hooks/useRadar.js'

export default function Place() {
  const {
    lon,
    lat,
    alpha,
    logText,
    distanceText,
    enableCompass,
  } = useRadar()

  return (
    <section className="content-container">
      <h1>Place</h1>

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
    </section>
  )
}
