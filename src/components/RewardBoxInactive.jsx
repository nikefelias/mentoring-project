import React from 'react';
import '../App.css';
import './RewardBox.css';
import { useGpsContext } from '../context/GpsContext.jsx'


const RewardBoxInactive = ({ distance }) => {
  const distanceKm = distance != null ? (distance / 1000).toFixed(1) : null;
  const gps = useGpsContext();
  const isGpsEnabled = Boolean(
    gps?.isEnabled &&
    gps?.position?.lat != null &&
    gps?.position?.lon != null, )

  return (
    <div className="reward-container"> 
       <img
        src="/images/reward-inactive.svg"
        alt="Reward Icon"
        className="reward-image"
      />
      <div className="reward-text-content">
        <h3 className="reward-title">

          {isGpsEnabled === true
            ? `You're almost there!`
            : 'Enable GPS to see the distance to unlock your reward.'}

        </h3>
        <p className="reward-description">
          {distanceKm != null
            ? `Get within 100 m to unlock your reward.`
            : ''}
        </p>
      </div>
    </div>
  );
};

export default RewardBoxInactive;
