export default function PlaceDescription({ place }) {
  if (!place) {
    return (
      <div className="place-description">
        <p>Place is not found</p>
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
