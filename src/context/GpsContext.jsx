import {createContext, useState, useContext} from 'react'

const GpsContext = createContext(null)

export const useGpsContext = () => useContext(GpsContext)

export function GpsContextProvider({children}) {
  const [gpsState, setGpsState] = useState({
    isGpsEnabled: false,
    currentPosition: {
      lon: 1,
      lat: 2,
    },
  })

  const setGpsEnabled = (isEnabled) => {
    setGpsState({
      ...gpsState,
      isGpsEnabled: isEnabled,
    })
  }

  const setCurrentPosition = (coords) => {
    setGpsState({
      ...gpsState,
      currentPosition: coords,
    })
  }

  return (
    <GpsContext.Provider value={{
      ...gpsState,
      setGpsEnabled,
      setCurrentPosition,
    }}>
      {children}
    </GpsContext.Provider>
  )
}