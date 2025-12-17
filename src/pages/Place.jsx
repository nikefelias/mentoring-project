import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import Radar from '../components/radar.jsx'
import useRadar from '../hooks/useRadar.js'
import places from '../data/places.js'
import PlaceDescription from '../components/place-description.jsx'

export default function Place() {
  const { id } = useParams()
  const selectedPlace = useMemo(
    () => places.find((place) => place.id === id) ?? null,
    [id],
  )
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
      {!selectedPlace && (
        <div style={{ marginBottom: 24 }}>
          <p>Такое место не найдено.</p>
          <Link to="/">Вернуться к списку</Link>
        </div>
      )}
      <main className="place-layout">
        <Radar
          lon={lon}
          lat={lat}
          alpha={alpha}
          distanceText={distanceText}
          onEnableCompass={enableCompass}
          logText={logText}
        />
        <PlaceDescription place={selectedPlace} />
      </main>
    </section>
  )
}
