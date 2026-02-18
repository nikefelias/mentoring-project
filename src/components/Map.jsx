import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGpsContext } from "../context/GpsContext";
import { supabase } from "../supabase/supabase.js";
import "../App.css"
import { Link } from "react-router-dom";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
   className: "custom-pin",
});
L.Marker.prototype.options.icon = DefaultIcon;

const { data:iconData } = supabase.storage
  .from("images") 
  .getPublicUrl("rewards/iconman.png"); 

const userIcon = L.icon({
iconUrl: iconData.publicUrl,
  iconSize: [16, 40],
  iconAnchor: [8, 40],
  popupAnchor: [0, -40],});


export default function MyMap() {
  const { position, isEnabled } = useGpsContext();
  const [places, setPlaces] = useState([]);

  const userPosition =
    isEnabled && position.lat != null && position.lon != null
      ? [position.lat, position.lon]
      : [50.087, 14.4205];

  useEffect(() => {
    let mounted = true;

    async function loadPlaces() {
      const { data, error } = await supabase
        .from("places")
        .select("id, slug, name, short_description, lat, lon");

      if (error) {
        console.error(error);
        return;
      }

      if (mounted) {
        const safePlaces = (data || []).filter(
          (p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)),
        );
        setPlaces(safePlaces);
      }
    }

    loadPlaces();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="map-wrap">
      <MapContainer
        center={userPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userPosition} icon={userIcon}>
        </Marker>

        {places.map((p) => (
          <Marker key={p.id} position={[Number(p.lat), Number(p.lon)]}>
            <Popup className="place-popup">
              <strong>{p.name}</strong>
              <br />
              {p.short_description}
              <br />
              <Link className="popup-link" to={`/${p.slug ?? p.id}`}>Open Page</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
