import React from 'react';
import '../App.css';
import './rewardBox.css';

const RewardBoxActive = () => {
  return (
    <div className="reward-container"> 
       <img
        src="/images/reward-active.svg"
        alt="Reward Icon"
        className="reward-image"
      />
      <div className="reward-text-content">
        <h2 className="reward-title">YOUR REWARD</h2>
        <p className="reward-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default RewardBoxActive;