import { Link } from 'react-router'
import places from '../data/places.js'
import Hero from '../components/Hero.jsx'


export default function Home() {
  return (
    <section className="content-container">
      <Hero />
      <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <Link className="button-link" to={`${place.id}`}>
              <button type="button">More</button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
