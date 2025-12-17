import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import '../assets/radar/radar.css'
import { initOrientation } from '../assets/radar/orientation'
import { getGPSDistance, getGPSBearing } from '../assets/radar/geo-helpers'
import { initGPS } from '../assets/radar/gps'
import { log } from '../assets/radar/log'
import arrowIcon from '../assets/icons/arrow-white.svg'

export default function Radar({ onEnableCompass, goalPlace }) {
  const radarGoalRef = useRef(null)
  const goalArrowRef = useRef(null)
  const compassBtnRef = useRef(null)
  const logRef = useRef(null)

  const [currentPos, setCurrentPos] = useState({
    lon: null,
    lat: null,
    accuracy: null,
    alpha: null,
  })

  const { distance, angle, distanceLabel, hasFix } = useMemo(() => {
    const hasCoords = currentPos.lat != null && currentPos.lon != null

    if (!hasCoords || !goalPlace) {
      return {
        distance: null,
        angle: currentPos.alpha ?? 0,
        distanceLabel: '--',
        hasFix: false,
      }
    }

    const goalPos = { lat: goalPlace.lat, lon: goalPlace.lon }
    const distanceValue = getGPSDistance(currentPos, goalPos)
    const bearing = getGPSBearing(currentPos, goalPos)
    const alpha = currentPos.alpha ?? 0
    const computedAngle = alpha + bearing
    const label =
      distanceValue < 1000
        ? `${distanceValue.toFixed(0)} m`
        : `${(distanceValue / 1000).toFixed(2)} km`

    return {
      distance: distanceValue,
      angle: computedAngle,
      distanceLabel: label,
      hasFix: true,
    }
  }, [currentPos, goalPlace])

  const handleOrientation = useCallback((alpha) => {
    if (alpha === null) {
      log.message('Orientation failed, alpha = null')
      return
    }

    setCurrentPos((prev) => ({
      ...prev,
      alpha,
    }))
  }, [])

  const handlePosition = useCallback((coords) => {
    setCurrentPos((prev) => ({
      ...prev,
      ...coords,
    }))
  }, [])

  useEffect(() => {
    if (!compassBtnRef.current) return

    if (logRef.current) {
      log.element = logRef.current
      log.message('App start - v0.01')
      log.divider()
    }

    const stopGPS = initGPS(handlePosition)
    initOrientation(compassBtnRef.current, handleOrientation)

    return () => {
      stopGPS()
    }
  }, [handlePosition, handleOrientation])

  useEffect(() => {
    if (!radarGoalRef.current || !goalArrowRef.current || !goalPlace) return

    goalArrowRef.current.style.opacity = currentPos.alpha === null ? 0.2 : 1
    goalArrowRef.current.style.transform = `rotate(${angle.toFixed(0)}deg)`

    const distanceFromCenter =
      distance === null ? 0 : distance < 1000 ? distance / 1000 : 1
    const angleRad = (angle / 360) * 2 * Math.PI - Math.PI / 2
    const x = Math.cos(angleRad) * 50 * distanceFromCenter + 50
    const y = Math.sin(angleRad) * 50 * distanceFromCenter + 50

    radarGoalRef.current.style.left = `${x}%`
    radarGoalRef.current.style.top = `${y}%`
  }, [distance, angle, currentPos.alpha, goalPlace])

  return (
    <div className="radar-card">
      <div id="radar">
        <div id="radar-outer">
          <div id="radar-inner" />
          <div id="radar-center" />
          <div id="radar-goal" ref={radarGoalRef} />
        </div>
      </div>

      <div id="goal">
        <div className="goal-inner">
          <div id="goal-distance">
            {hasFix ? distanceLabel : 'Waiting for GPS...'}
          </div>
          <img id="goal-arrow" src={arrowIcon} alt="arrow" ref={goalArrowRef} />
        </div>

        <button
          id="compass-btn"
          className="btn"
          onClick={onEnableCompass}
          type="button"
          ref={compassBtnRef}
        >
          Enable compass
        </button>
      </div>

      {/* <div id="info">
        <div>
          Lon: <span id="lon" ref={lonRef}>{currentPos.lon ?? 'null'}</span>
        </div>
        <div>
          Lat: <span id="lat" ref={latRef}>{currentPos.lat ?? 'null'}</span>
        </div>
        <div>
          Alpha: <span id="alpha" ref={alphaRef}>{currentPos.alpha ?? 'null'}</span>
        </div>
      </div>

      <div id="log">
        <pre ref={logRef} />
      </div> */}
    </div>
  )
}
