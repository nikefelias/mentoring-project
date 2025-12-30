import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import Radar from '../components/radar.jsx'
import useRadar from '../hooks/useRadar.js'
import places from '../data/places.js'
import PlaceDescription from '../components/place-description.jsx'
import Slider from '../components/Slider.jsx'

export default function Place() {
  const { id } = useParams()
  const selectedPlace = useMemo(
    () => places.find((place) => place.id === id) ?? null,
    [id],
  )
  const { enableCompass } = useRadar()

  const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/?$/, '/')
  const placeImages = (selectedPlace?.image ?? []).map(
    (imageName) => `${basePath}images/${imageName}`,
  )

  const sliderItems = placeImages.map((src, index) => {
    return (
      <div className="slider-card__image" key={src ?? index}>
        
          <img src={src} alt={`${selectedPlace?.name ?? 'Place'} photo ${index + 1}`} />
        
      </div>
    )
  })

  return (
    <section className="content-container">
      {!selectedPlace && (
        <div style={{ marginBottom: 24 }}>
          <p>Place is not found</p>
          <Link to="/">Back to list</Link>
        </div>
      )}
      <main className="place-layout">
        {sliderItems.length > 0 && <Slider items={sliderItems} step={180} />}
        <Radar
          goalPlace={selectedPlace}
          onEnableCompass={enableCompass}
        />
        
        <PlaceDescription place={selectedPlace} />
      </main>
    </section>
  )
}
