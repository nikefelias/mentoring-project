import { Link } from "react-router";
import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import ClosestPlaces from "../components/Closest-places.jsx";
import { useGpsContext } from "../context/GpsContext";
import { getGPSDistance } from "../utils/geo-helpers";
import "../index.css";
import { supabase } from "../supabase/supabase.js";

export default function Home() {
  const gps = useGpsContext();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const getPlaces = async () => {
      setIsLoading(true);
      setLoadError(null);
      const { data, error } = await supabase.from("places").select();

      if (!isActive) {
        return;
      }

      if (error) {
        console.error("Failed to load places:", error);
        setLoadError(error.message ?? "Failed to load places");
        setPlaces([]);
      } else {
        setPlaces(data ?? []);
      }
      setIsLoading(false);
    };

    getPlaces();

    return () => {
      isActive = false;
    };
  }, []);

  const placesWithDistance = places.map((place) => {
    return {
      ...place,
      distance: gps.isEnabled ? getGPSDistance(gps.position, place) : null,
    };
  });
  if (gps.isEnabled) {
    placesWithDistance.sort((a, b) => a.distance - b.distance);
  }

  return (
    <>
      <section className="content-container">
        <Hero />
        <ClosestPlaces places={places} />
        {isLoading && <p>Loading places...</p>}
        {!isLoading && loadError && <p>Failed to load places: {loadError}</p>}
        <ul className="places-list">
          {placesWithDistance.map((place) => (
            <li key={place.slug ?? place.id}>
              <Link
                className="place-card-link"
                to={`${place.slug ?? place.id}`}
              >
                <h2>{place.name}</h2>
                <p>{place.short_description}</p>
                {gps.isEnabled && place.distance != null && (
                  <span className="place-distance">
                    {" "}
                    {(place.distance / 1000).toFixed(1)} km
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
