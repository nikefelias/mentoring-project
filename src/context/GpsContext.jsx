import {createContext, useState, useEffect, useContext } from 'react'

const GpsContext = createContext(null)

// eslint-disable-next-line
export const useGpsContext = () => useContext(GpsContext)



export function GpsContextProvider({children}) {
  const [gpsState, setGpsState] = useState({
    isEnabled: false,
    position: {
      lat: null,
      lon: null,
      accuracy: null,
    },
    message: 'Geolocation is not supported in this browser.',
  })

  // when component renders for the first time,
  // and that should invoke request for persmission in the browser
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return
    }

    const gpsSuccess = (position) => {
      setGpsState(prev => ({
        ...prev,
        isEnabled: true,
        position: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        },
        message: 'GPS enabled',
      }))
    }

    const gpsError = (err) => {
      setGpsState(prev => ({
        ...prev,
        isEnabled: false,
        message: err?.message || 'Geolocation is not supported in this browser.',
      }))
      return
    }

    const watchId = navigator.geolocation.watchPosition(gpsSuccess, gpsError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 30000,
    })

    // return cleanup function to stop watching
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <GpsContext.Provider value={{
      ...gpsState,
    }}>
      {children}
    </GpsContext.Provider>
  )
}