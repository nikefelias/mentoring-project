import { useEffect, useState, useCallback } from 'react'

export function useCompass() {
  const [compassState, setCompassState] = useState({
    isEnabled: false,
    deviceHeading: null,
    message: 'Device Orientation (compass) is not supported in this browser',
  })


  // function to be called upon devide orientation change
  const onOrientation = useCallback((e) => {
    let heading = null;
    if (e.webkitCompassHeading != null) {
      // iOS
      heading = e.webkitCompassHeading;
    } else if (e.absolute && e.alpha != null) {
      heading = (360 - e.alpha) % 360;
    } else if (e.alpha != null) {
      heading = (360 - e.alpha) % 360;
    }
    if (heading !== null) {
      setCompassState((prev) => {
        return {
          ...prev,
          deviceHeading: heading,
        }
      })
    }
  }, [])


  // function to ask for permissions and start compass if granted
  const startCompass = () => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientationabsolute', onOrientation, true)
              window.addEventListener('deviceorientation', onOrientation, true)
              setCompassState({
                isEnabled: true,
                deviceHeading: null,
                message: 'Compass enabled',
              })
            } else {
              setCompassState({
                isEnabled: false,
                deviceHeading: null,
                message: 'Compass permission denied',
              })
            }
          })
          .catch((e) => {
            setCompassState({
              isEnabled: false,
              deviceHeading: null,
              message: 'Compass error: ' + e.message,
            })
          });
      } else {
        window.addEventListener('deviceorientationabsolute', onOrientation, true)
        window.addEventListener('deviceorientation', onOrientation, true)
        setCompassState({
          isEnabled: true,
          deviceHeading: null,
          message: 'Compass enabled',
        })
      }
    } else {
      setCompassState({
        isEnabled: false,
        deviceHeading: null,
        message: 'Device Orientation (compass) is not supported in this browser.',
      })
    }
  }

  // remove event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientationabsolute', onOrientation, true)
      window.removeEventListener('deviceorientation', onOrientation, true)
    }
  }, [onOrientation])

  return {
    ...compassState,
    startCompass,
  }
}