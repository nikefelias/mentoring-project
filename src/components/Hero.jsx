import { Link } from "react-router";

export default function Hero() {
  return (
    <>
      <h1>Discover 
        the unseen</h1>
      <p>
        Czech Myst is an interactive map-based game that turns exploring Czechia’s legends and mysterious landmarks into a digital adventure.
      </p>
      <div className="buttons">
        <Link className="button-link" to="/register">
          <button type="button">Sign in</button>
        </Link>
        <Link className="button-link" to="/About">
          <button type="button">How it works</button>
        </Link>
      </div>
    </>
  );
}
