import { Link } from 'react-router'
import places from '../data/places.js'
import Hero from '../components/Hero.jsx'
import ClosestPlaces from '../components/Closest-places.jsx'
import { useGpsContext } from '../context/GpsContext.jsx'


export default function Home() {
  const gps = useGpsContext()


  return (
    <>
    <button onClick={() => { gps.setGpsEnabled(!gps.isGpsEnabled)}}>Change status</button>
      <p>GPS {gps.isGpsEnabled ? 'JE' : 'NENI'} zapnuta.</p>
    <section className="content-container">
      <Hero />
     
       <ClosestPlaces />
      <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
            <Link className="place-card-link" to={`${place.id}`}>
              <h2>{place.name}</h2>
              <p>{place.description}</p>
            </Link>
          </li>
        ))}
      </ul>
     
    </section>
    </>
  )
}
