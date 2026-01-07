import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import Radar from '../components/radar.jsx'
import useRadar from '../hooks/useRadar.js'
import places from '../data/places.js'
import PlaceDescription from '../components/place-description.jsx'
import Slider from '../components/Slider.jsx'
import { useGpsContext } from '../context/GpsContext.jsx'
import { getGPSBearing, getGPSDistance } from '../utils/geo-helpers'
import RewardCard from '../components/reward-card.jsx'

export default function Place() {
  const { id } = useParams()
  const gps = useGpsContext()

  const place = useMemo(
    () => places.find((place) => place.id === id) ?? null,
    [id],
  )
  const { enableCompass } = useRadar()

  const hasGps = Boolean(
    gps?.isEnabled &&
    gps?.position?.lat != null &&
    gps?.position?.lon != null,
  )
  const distance = hasGps && place
    ? getGPSDistance(gps.position, place)
    : null
  const bearing = hasGps && place
    ? getGPSBearing(gps.position, place)
    : null

  const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/?$/, '/')
  const placeImages = (place?.image ?? []).map(
    (imageName) => `${basePath}images/${imageName}`,
  )

  const sliderItems = placeImages.map((src, index) => {
    return (
      <div className="slider-card__image" key={src ?? index}>
        
          <img src={src} alt={`${place?.name ?? 'Place'} photo ${index + 1}`} />
        
      </div>
    )
  })

  return (
    <section className="content-container">
      {!place && (
        <div style={{ marginBottom: 24 }}>
          <p>Place is not found</p>
          <Link to="/">Back to list</Link>
        </div>
      )}
      <main className="place-layout">
        {sliderItems.length > 0 && <Slider items={sliderItems} step={180} />}
        <Radar
          goalPlace={place}
          onEnableCompass={enableCompass}
        />
        {hasGps && distance != null && bearing != null
                ? <>
                    <p>My current position: {gps.position.lat}, {gps.position.lon}</p>
                    <p>Distance: {(distance / 1000).toFixed(1)} km</p>
                    <p>Bearing: {bearing.toFixed(1)}&deg;</p>
        
                    {distance < 100 && <RewardCard />}
        
                  </>
                : <p>Can't calculate distance, GPS not enabled</p>
              }
              
        <PlaceDescription place={place} />
        
      </main>
    </section>
  )
}
