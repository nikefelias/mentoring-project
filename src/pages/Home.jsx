import { Link } from "react-router";
import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import ClosestPlaces from "../components/Closest-places.jsx";
import { useGpsContext } from "../context/GpsContext";
import { getGPSDistance } from "../utils/geo-helpers";
import "../index.css";
import "../App.css"
import { supabase } from "../supabase/supabase.js";
import Select from "react-select";
import MyMap from "../components/Map.jsx";


export default function Home() {
  const gps = useGpsContext();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [region, setRegion] = useState("");
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    const getPlaces = async () => {
      setIsLoading(true);
      setLoadError(null);
      const { data, error } = await supabase
        .from("places")
        .select("*, images(filename)")
        .select("*, images(filename, main)");

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

  const visiblePlaces = region
    ? placesWithDistance.filter((p) => p.region === region)
    : placesWithDistance;


const regionOptions = [
  { value: "", label: "All regions" },
  { value: "CB", label: "Central Bohemian Region" },
  { value: "HK", label: "Hradec Králové Region" },
  { value: "KV", label: "Karlovy Vary Region" },
  { value: "LI", label: "Liberec Region" },
  { value: "MS", label: "Moravian-Silesian Region" },
  { value: "OL", label: "Olomouc Region" },
  { value: "PA", label: "Pardubice Region" },
  { value: "PL", label: "Plzeň Region" },
  { value: "PR", label: "Prague (Capital City)" },
  { value: "SB", label: "South Bohemian Region" },
  { value: "SM", label: "South Moravian Region" },
  { value: "UL", label: "Ústí nad Labem Region" },
  { value: "VY", label: "Vysočina Region" },
  { value: "ZL", label: "Zlín Region" },
];

  return (
    <>
      <section className="content-container">
        <Hero />
        <ClosestPlaces places={places} />
        {isLoading && <p>Loading places...</p>}
        {!isLoading && loadError && <p>Failed to load places: {loadError}</p>}

        <div className="view-toggle" role="tablist" aria-label="Switch view">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "map" ? "active" : ""}`}
            onClick={() => setViewMode("map")}
            aria-pressed={viewMode === "map"}
          >
            View a Map
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
          >
            View a List
          </button>
        </div>

        {viewMode === "list" && (
          <>
            <div className="region-filter">
              <Select
                className="region-custom"
                classNamePrefix="region-custom"
                options={regionOptions}
                value={regionOptions.find((o) => o.value === region)}
                onChange={(opt) => setRegion(opt?.value ?? "")}
                isSearchable={false}
              />
            </div>

            <ul className="places-list">
              {visiblePlaces.map((place) => (
                <li key={place.slug ?? place.id}>
                  <Link
                    className="place-card-link"
                    to={`${place.slug ?? place.id}`}
                  >
                    <h2>{place.name}</h2>

                    {(() => {
                      const mainImage = Array.isArray(place?.images)
                        ? place.images.find((img) => img.main === 1) ||
                          place.images[0]
                        : null;
                      const imageSrc = mainImage
                        ? supabase.storage
                            .from("images")
                            .getPublicUrl(`places/${mainImage.filename}`).data
                            .publicUrl
                        : null;
                      return imageSrc ? (
                        <img
                          className="place-card-image"
                          src={imageSrc}
                          alt={place.name}
                        />
                      ) : null;
                    })()}
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
          </>
        )}

        {viewMode === "map" && <MyMap />}
      </section>
    </>
  );
}
