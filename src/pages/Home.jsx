import { Link } from 'react-router'
import places from '../data/places.js'
import Hero from '../components/Hero.jsx'
import ClosestPlaces from '../components/Closest-places.jsx'
import { useGpsContext } from '../context/GpsContext';
import { getGPSDistance } from '../utils/geo-helpers';
import "../index.css"


export default function Home() {
  
const gps = useGpsContext()
 const placesWithDistance = places.map((place) => { return {
    ...place,
    distance: gps.isEnabled ? getGPSDistance(gps.position, place) : null,
  }})
  if (gps.isEnabled) {
    placesWithDistance.sort((a, b) => a.distance - b.distance)
  }

  return (
    <>

    <section className="content-container">
      <Hero />
     
       <ClosestPlaces />
      <ul className="places-list">
        {placesWithDistance.map((place) => (
          <li key={place.id}>
            <Link className="place-card-link" to={`${place.id}`}>
             <h2>
  {place.name}
  {gps.isEnabled && place.distance != null && (
    <span className="place-distance"> {(place.distance / 1000).toFixed(1)} km</span>
  )}
</h2>
              <p>{place.description}</p>
              
            </Link>
          </li>
        ))}
      </ul>
     
    </section>
    </>
  )
}
