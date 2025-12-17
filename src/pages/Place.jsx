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
  const { enableCompass } = useRadar()

  return (
    <section className="content-container">
      {!selectedPlace && (
        <div style={{ marginBottom: 24 }}>
          <p>Place is not found</p>
          <Link to="/">Back to list</Link>
        </div>
      )}
      <main className="place-layout">
        <Radar
          goalPlace={selectedPlace}
          onEnableCompass={enableCompass}
        />
        <PlaceDescription place={selectedPlace} />
      </main>
    </section>
  )
}
