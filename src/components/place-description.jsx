export default function PlaceDescription({ place }) {
  if (!place) {
    return (
      <div className="place-description">
        <p>Место не найдено.</p>
      </div>
    )
  }

  return (
    <article className="place-description">
      <h2>{place.name}</h2>
      <p>{place.description}</p>
    </article>
  )
}
