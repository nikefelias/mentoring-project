import React from 'react';
import '../App.css';
import './rewardBox.css';

const RewardBoxRegister = () => {
  return (
    <div className="reward-container"> 
       <img
        src="/images/reward-inactive.svg"
        alt="Reward Icon"
        className="reward-image"
      />
      <div className="reward-text-content">
        <h3 className="reward-title">Ready to unlock?</h3>
        <p className="reward-description">
        Create an account to collect this reward and see what else is nearby!
        </p>
      </div>
    </div>
  );
};

export default RewardBoxRegister;