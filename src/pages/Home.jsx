import { Link } from 'react-router'
import places from '../data/places.js'
import Hero from '../components/Hero.jsx'
import ClosestPlaces from '../components/Closest-places.jsx'


export default function Home() {
  return (
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
  )
}
