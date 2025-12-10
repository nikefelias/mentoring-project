import React from "react";

export default function Radar({
  distanceText = "100 m",
  lon = 0,
  lat = 0,
  alpha = 0,
  onEnableCompass,
  logText = "",
}) {
  return (
    <div className="container">
      <div id="radar">
        <div id="radar-outer">
          <div id="radar-inner" />
          <div id="radar-center" />
          <div id="radar-goal" />
        </div>
      </div>

      <div id="goal">
        <div className="goal-inner">
          <img id="goal-arrow" src="/icons/arrow.svg" alt="arrow" />
          <div id="goal-distance">{distanceText}</div>
        </div>

        <button
          id="compass-btn"
          className="btn"
          onClick={onEnableCompass}
          type="button"
        >
          Enable compass
        </button>
      </div>

      <div id="info">
        <div>
          Lon: <span id="lon">{lon}</span>
        </div>
        <div>
          Lat: <span id="lat">{lat}</span>
        </div>
        <div>
          Alpha: <span id="alpha">{alpha}</span>
        </div>
      </div>

      <div id="log">
        <pre>{logText}</pre>
      </div>
    </div>
  );
}
