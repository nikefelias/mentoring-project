import { Link } from 'react-router'
import { useGpsContext } from '../context/GpsContext.jsx'
import { getGPSDistance } from '../utils/geo-helpers'
import Slider from './Slider.jsx'
import "./Slider.css"


export default function ClosestPlaces({ places = [] }) {
  const gps = useGpsContext()
  const placesWithDistance = places.map((place) => ({
    ...place,
    distance: gps.isEnabled ? getGPSDistance(gps.position, place) : null,
  }))

  if (gps.isEnabled) {
    placesWithDistance.sort((a, b) => a.distance - b.distance)
  }

  const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/?$/, '/')
  const sliderItems = placesWithDistance.slice(0, 5).map((place) => {
    const imageList = Array.isArray(place?.image)
      ? place.image
      : typeof place?.image === 'string'
          ? place.image.replace(/[{}]/g, '').split(',').filter(Boolean)
          : []
    const imageName = imageList[0]
    const imageSrc = imageName ? `${basePath}images/${imageName}` : null
    const placeId = place.slug ?? place.id

    return (
      <Link className="slider-card" to={`${placeId}`} key={placeId}>
        <div className="slider-card__image">
          {imageSrc ? (
            <img src={imageSrc} alt={place.name} />
          ) : (
            <div className="slider-card__body">
              <p>No image</p>
            </div>
          )}
        </div>
        <div className="slider-card__body">
          {/* <h3>{place.name}</h3> */}
          {gps.isEnabled && place.distance != null && (
            <h2>{(place.distance / 1000).toFixed(1)} km</h2>
          )}
        </div>
      </Link>
    )
  })

  return (
    <>
      <h2>Closest places to you</h2>
      <Slider items={sliderItems} />
    </>
  )
}
