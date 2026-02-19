import React from 'react';
import '../App.css';
import './RewardBox.css';

const TurnOnGpsBox = () => {
  return (
    <div className="reward-container reward-container-gps"> 
      <div className="reward-text-content reward-text-content-gps">
        <h2 className="reward-title">Location Off</h2>
        <p className="reward-description">
We can't find you! To get your reward, please turn on GPS in your device settings and grant location access to your browser.        </p>
      </div>
    </div>
  );
};

export default TurnOnGpsBox;