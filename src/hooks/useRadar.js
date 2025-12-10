import { useEffect, useRef, useState, useCallback } from 'react'
import { getGPSDistance, getGPSBearing } from '../assets/radar/geo-helpers'

// Hook to provide GPS, orientation and helper methods for the Radar component
export default function useRadar() {
  const [pos, setPos] = useState({ lon: null, lat: null, accuracy: null })
  const [alpha, setAlpha] = useState(null)
  const [logText, setLogText] = useState('')

  const watchIdRef = useRef(null)
  const orientationRef = useRef(null)

  const goalPos = useRef({ lon: 14.4302007, lat: 50.0751690 })

  const appendLog = useCallback((...parts) => {
    setLogText((s) => `${s}${s ? '\n' : ''}${parts.join(' ')}`)
  }, [])

  useEffect(() => {
    // start geolocation watch
    if ('geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (p) => {
          setPos({ lon: p.coords.longitude, lat: p.coords.latitude, accuracy: p.coords.accuracy })
          appendLog('Position updated', p.coords.latitude.toFixed(6), p.coords.longitude.toFixed(6))
        },
        (err) => appendLog('Geolocation error:', err.message),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
      )
    } else {
      appendLog('Geolocation not available')
    }

    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current)
      if (orientationRef.current) {
        window.removeEventListener('deviceorientation', orientationRef.current)
      }
    }
  }, [appendLog])

  const computedDistanceText = () => {
    const from = { lat: pos.lat, lon: pos.lon }
    const to = goalPos.current
    if (from.lat === null || from.lon === null) return '—'
    const distance = getGPSDistance(from, to)
    if (distance < 1000) return `${Math.round(distance)} m`
    return `${(distance / 1000).toFixed(2)} km`
  }

  const enableCompass = async () => {
    appendLog('Requesting compass permission...')
    // For iOS 13+ permission model
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission !== 'granted') {
          appendLog('Compass permission denied')
          return
        }
      }

      const handler = (event) => {
        const a = event.alpha === null || event.alpha === undefined ? null : event.alpha
        setAlpha(a)
        appendLog('Orientation', a === null ? 'null' : `${Math.round(a)}°`)
      }

      orientationRef.current = handler
      window.addEventListener('deviceorientation', handler, true)
      appendLog('Compass enabled')
    } catch (err) {
      appendLog('Compass enable failed:', err.message || err)
    }
  }

  const bearingToGoal = () => {
    if (pos.lat === null || pos.lon === null) return null
    return getGPSBearing({ lat: pos.lat, lon: pos.lon }, goalPos.current)
  }

  const distanceToGoal = () => {
    if (pos.lat === null || pos.lon === null) return null
    return getGPSDistance({ lat: pos.lat, lon: pos.lon }, goalPos.current)
  }

  return {
    lon: pos.lon,
    lat: pos.lat,
    alpha,
    logText,
    distanceText: computedDistanceText(),
    enableCompass,
    bearingToGoal,
    distanceToGoal,
  }
}
