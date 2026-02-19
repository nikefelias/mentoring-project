import React from 'react';
import '../App.css';
import './RewardBox.css';

const RewardBoxActive = ({rewardImageUrl}) => {
  return (
    <div className="reward-container"> 
       <img src={rewardImageUrl} alt="Reward" className="reward-image" />
      <div className="reward-text-content">
        <h2 className="reward-title">Your Reward</h2>
        <p className="reward-description">
          Lorem Ipsum
        </p>
      </div>
    </div>
  );
};

export default RewardBoxActive;