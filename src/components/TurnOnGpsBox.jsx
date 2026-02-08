import React from 'react';
import '../App.css';
import './RewardBox.css';

const RewardBoxActive = () => {
  return (
    <div className="reward-container"> 
      <div className="reward-text-content">
        <h2 className="reward-title">LOCATION OFF</h2>
        <p className="reward-description">
We can't find you! To get your reward, please turn on GPS in your device settings and grant location access to your browser.        </p>
      </div>
    </div>
  );
};

export default RewardBoxActive;