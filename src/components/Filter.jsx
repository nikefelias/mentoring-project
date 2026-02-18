import { useState, useEffect } from "react";

import { supabase } from "../supabase/supabase.js";

export function FilterPlaces() {
  const [places, setPlaces] = useState(null);
 const [filtered, setFiltered] = useState([]);
const [region, setRegion] = useState("");

  useEffect(() => {
    const getPlaces = async () => {
      const data = await supabase.from("places").select(`
          *,  images (*) `);

      setPlaces(data.data);

      setFiltered(data.data);
    };

    getPlaces();
  }, []);

  const handleFilterChange = (e) => {
    const newRegion = e.target.value;

    setRegion(newRegion);

    if (newRegion === "") {
      setFiltered([...places]);
    } else {
      setFiltered(places.filter((place) => place.region === newRegion));
    }
  };

  if (places === null) return <p>Nacitam data...</p>;

  return (
    <>
      <select value={region} onChange={handleFilterChange}>
        <option value=""></option>
        <option value="CB">Central Bohemian Region</option>
        <option value="HK">Hradec Králové Region</option>
        <option value="KV">Karlovy Vary Region</option>
        <option value="LI">Liberec Region</option>
        <option value="MS">Moravian-Silesian Region</option>
        <option value="OL">Olomouc Region</option>
        <option value="PA">Pardubice Region</option>
        <option value="PL">Plzeň Region</option>
        <option value="PR">Prague (Capital City)</option>
        <option value="SB">South Bohemian Region</option>
        <option value="SM">South Moravian Region</option>
        <option value="UL">Ústí nad Labem Region</option>
        <option value="VY"> Vysočina Region</option>
        <option value="ZL">Zlín Region</option>
      </select>
      <ul>
        {filtered.map((place) => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul>
    </>
  );
}

export default FilterPlaces;
