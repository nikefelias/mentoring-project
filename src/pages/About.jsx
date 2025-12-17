import castleHero from "../../public/images/castle-hero.png";
import React from "react";
import "../index.css";

export function About() {
  return (
    <>
      <img src={castleHero} alt="" />
      <h1>How does it work?</h1>

      <div className="card">
        <h5>1</h5>
        <div className="card-step">
          <h2>CHOOSE A PLACE TO VISIT</h2>
          <p>
            Use the interactive map to browse mystical locations across the
            Czech Republic — from ancient ruins to mythical landscapes.
          </p>
        </div>
      </div>

      <div className="card">
        
        <div className="card-step">
          <h2>TRAVEL THERE</h2>
          <p>
            Travel to your chosen destination. The app will automatically confirm your visit via GPS once you’re within 100 meters of your goal.
          </p>
        </div>
        <h5>2</h5>
      </div>

      <div className="card">
        <h5>3</h5>
        <div className="card-step">
          <h2>COLLECT YOUR REWARD</h2>
          <p>
            Each confirmed visit unlocks digital rewards that mark your journey through the land of legends.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
