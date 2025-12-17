import { Link } from "react-router";
import places from "../data/places";

export default function ClosestPlaces() {
  return (
    <>
      <h2>Closest places to you</h2>
        <ul className="places-list">
        </ul>
    </>
  );
}
