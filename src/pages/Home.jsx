import { Link } from 'react-router'
import places from '../data/places.js'

export default function Home() {
  return (
    <section className="content-container">
      <p>Choose a place</p>

      <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <Link to={`/${place.id}`}>More</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
