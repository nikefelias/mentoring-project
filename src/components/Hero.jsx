import { Link } from "react-router";

export default function Hero() {
  return (
    <>
      <h1>Discover 
        the unseen</h1>
      <p>
        Travel across the Czech Republic and explore its mysterious landmarks —
        ancient castles, sacred hills, haunted forests, and forgotten villages.
        Collect stories, earn rewards, and see the country through the lens of
        legend and mystery. Czech Myst is an interactive map-based experience
        that connects you with the country’s most enigmatic and legendary
        places. It’s both a digital guide and a game of discovery — designed for
        travelers who love mystery, folklore, and hidden gems.
      </p>
      <div className="buttons">
        <Link className="button-link" to="/register">
          <button type="button">Register</button>
        </Link>
        <Link className="button-link" to="/About">
          <button type="button">How it works</button>
        </Link>
      </div>
    </>
  );
}
