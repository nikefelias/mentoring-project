import React from 'react';
import '../App.css';
import './RewardBox.css';
import { supabase } from "../supabase/supabase.js";

const { data } = supabase.storage
  .from("images")
  .getPublicUrl("rewards/reward-inactive.png");

const inactiveRewardUrl = data.publicUrl;

const RewardBoxRegister = () => {
  return (
    <div className="reward-container"> 
      <img
  src={inactiveRewardUrl}
  alt="Reward Icon"
  className="reward-image"
/>
      <div className="reward-text-content">
        <h2 className="reward-title">Ready to unlock?</h2>
        <p className="reward-description">
        Create an account to collect this reward and see what else is nearby!
        </p>
      </div>
    </div>
  );
};

export default RewardBoxRegister;

