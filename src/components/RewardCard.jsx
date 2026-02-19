import "../App.css";
import "../index.css";
import "./reward-card.css"
import { supabase } from "../supabase/supabase.js";

const fallbackFromBucket = supabase.storage
  .from("images")
  .getPublicUrl("rewards/reward-active.png").data.publicUrl;


function RewardCard({ rewardImageUrl }) {
  return (
    <>
    <div className="reward-container">
      <div>
        <img src={rewardImageUrl || fallbackFromBucket} alt="Reward Icon" className="reward-image" />

      </div>
      <div className="reward-text-content">
        <h2 className="reward-title">You did it!</h2>
        <p className="reward-description">Destination reached! Your reward is now saved in "My Rewards".</p>
      </div>
      </div>
    </>
  );
}

export default RewardCard;
