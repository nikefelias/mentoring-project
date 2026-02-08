import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Radar from '../components/radar.jsx'
import useRadar from '../hooks/useRadar.js'
import PlaceDescription from '../components/place-description.jsx'
import Slider from '../components/Slider.jsx'
import { useGpsContext } from '../context/GpsContext.jsx'
import { getGPSBearing, getGPSDistance } from '../utils/geo-helpers'
import RewardCard from '../components/reward-card.jsx'
import UpdateReward from '../components/UpdateReward.jsx'
import { supabase } from '../supabase/supabase.js'
import RewardBoxActive from '../components/RewardBoxActive.jsx'
import RewardBoxInactive from '../components/RewardBoxInactive.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import TurnOnGpsBox from '../components/TurnOnGpsBox.jsx'

export default function Place() {
  const { id: slug } = useParams()
  const gps = useGpsContext()
  const [place, setPlace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
 const { isAuth } = useAuth();

  useEffect(() => {
   

    const getPlace = async () => {
      setIsLoading(true)
      setLoadError(null)
      const { data, error } = await supabase
        .from('places')
        .select('*, rewards (*), images(filename)')
        .eq('slug', slug)
        .maybeSingle()

        console.log(data)
      

      if (error) {
        console.error('Failed to load place:', error)
        setLoadError(error.message ?? 'Failed to load place')
        setPlace(null)
      } else {
        setPlace(data ?? null)
      }
      setIsLoading(false)
    }

    if (slug) {
      getPlace()
    } else {
      setPlace(null)
      setIsLoading(false)
    }
  }, [slug])
  const { enableCompass } = useRadar()

  const hasGps = Boolean(
    gps?.isEnabled &&
    gps?.position?.lat != null &&
    gps?.position?.lon != null,
  )
  const distance = hasGps && place
    ? getGPSDistance(gps.position, place)
    : null
  const bearing = hasGps && place
    ? getGPSBearing(gps.position, place)
    : null

 const imageList = Array.isArray(place?.images)
  ? place.images.map((img) => img.filename)
  : []

const placeImages = imageList.map((filename) => {
  const { data } = supabase.storage.from('images').getPublicUrl(`places/${filename}`)
  return data.publicUrl
})
  const sliderItems = placeImages.map((src, index) => {
    return (
      <div className="slider-card__image" key={src ?? index}>
        
          <img src={src} alt={`${place?.name ?? 'Place'} photo ${index + 1}`} />
        
      </div>
    )
  })

  return (
    <section className="content-container">
      {isLoading && (
        <div style={{ marginBottom: 24 }}>
          <p>Loading place...</p>
        </div>
      )}
      {!place && !isLoading && loadError && (
        <div style={{ marginBottom: 24 }}>
          <p>Failed to load place: {loadError}</p>
          <Link to="/">Back to list</Link>
        </div>
      )}
      {!place && !isLoading && !loadError && (
        <div style={{ marginBottom: 24 }}>
          <p>Place is not found</p>
          <Link to="/">Back to list</Link>
        </div>
      )}
      <main className="place-layout">
        {place && sliderItems.length > 0 && (
          <Slider items={sliderItems} step={180} />
        )}
        <Radar
          goalPlace={place}
          onEnableCompass={enableCompass}
        />
        {hasGps && distance != null && bearing != null
                ? <>
                    <p>My current position: {gps.position.lat}, {gps.position.lon}</p>
                    <p>Distance: {(distance / 1000).toFixed(1)} km</p>
                    <p>Bearing: {bearing.toFixed(1)}&deg;</p>
        
                    {distance < 100 && <RewardCard />}
        
                  </>
                : <TurnOnGpsBox.jsx />
              }
        {hasGps && distance != null && distance < 100 && <RewardBoxActive />}
        {hasGps && distance != null && distance >= 100 && (
          <RewardBoxInactive distance={distance} />
        )}
        {place && <PlaceDescription place={place} />}
    
        
      </main>
    </section>
  )
}
