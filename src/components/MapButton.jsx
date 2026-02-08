import React from 'react'
import '../App.css'


export default function MapButton({ lat, lon, className = '', label = 'Open in Google Maps' }) {
  const hasCoords = lat != null && lon != null

   const handleClick = () => {
    if (!hasCoords) return
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (

    <button
            type="button"
      className={`map-button ${className}`.trim()}
      onClick={handleClick}
      disabled={!hasCoords}
          >
          {label}
          </button>
           )
}
