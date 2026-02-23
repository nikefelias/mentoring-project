import '../assets/radar/radar.css'
import arrowIcon from '../assets/icons/arrow-white.svg'
import MapButton from './MapButton.jsx'

import { useGpsContext } from "../context/GpsContext"
import { useCompass } from "../hooks/useCompass"
import { getGPSDistance, getGPSBearing, formatDistance } from '../utils/geo-helpers'


export default function Radar({ goalPlace }) {
  console.log(goalPlace)
  const {
    isEnabled: isGpsEnabled,
    position: currentPos,
    // message: gpsMessage,
  } = useGpsContext()

  const {
    isEnabled: isCompassEnabled,
    deviceHeading,
    // message: compassMessage,
    startCompass,
  } = useCompass()

if (goalPlace === null) return null ;

  const distanceToGoal = getGPSDistance(currentPos, goalPlace)
  const gpsBearing = getGPSBearing(currentPos, goalPlace)
  const headingToGoal = isCompassEnabled ? gpsBearing - deviceHeading : 0

  const radarDistanceFromCenter =
    distanceToGoal === null ? 0 : distanceToGoal < 1000 ? distanceToGoal / 1000 : 1
  const radarAngleRad = (headingToGoal / 360) * 2 * Math.PI - Math.PI / 2
  const radarX = Math.cos(radarAngleRad) * 50 * radarDistanceFromCenter + 50
  const radarY = Math.sin(radarAngleRad) * 50 * radarDistanceFromCenter + 50


  return (
    <div className="radar-card">
      <div className={`radar-container ${isCompassEnabled ? '' : 'radar--inactive'}`}>
        <div id="radar">
          <div id="radar-outer">
            <div id="radar-inner" />
            <div id="radar-center" />
            <div id="radar-goal" style={{left: `${radarX}%`, top: `${radarY}%`, }}/>
          </div>
        </div>
        {!isCompassEnabled && (
          <button
            id="compass-btn"
            className="btn"
            onClick={startCompass}
            type="button"
          >
            Enable compass
          </button>
        )}
      </div>

      <div id="goal">
        <div className="goal-inner">
          <div id="goal-distance">
            {isGpsEnabled && formatDistance(distanceToGoal)}
          </div>
          <img id="goal-arrow" src={arrowIcon} alt="arrow" style={{rotation: `${headingToGoal}deg`}} />
        </div>
        <MapButton
          className="btn"
          lat={goalPlace?.lat}
          lon={goalPlace?.lon}
          label="Open in Google Maps"
        />
      </div>
    </div>
  )
}
