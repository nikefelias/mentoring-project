import React from 'react';
import '../App.css';
import './rewardBox.css';

const RewardBoxInactive = () => {
  return (
    <div className="reward-container"> 
       <img
        src="/images/reward-inactive.svg"
        alt="Reward Icon"
        className="reward-image"
      />
      <div className="reward-text-content">
        <h3 className="reward-title">You’re almost there!</h3>
        <p className="reward-description">
          Get within 100 meters to unlock your reward.
        </p>
      </div>
    </div>
  );
};

export default RewardBoxInactive;