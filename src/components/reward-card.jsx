import "../App.css";
import "../index.css";
import "./reward-card.css"

function RewardCard({ rewardImageUrl }) {
  return (
    <>
    <div className="reward-card">
      <div>
         <img
          src={rewardImageUrl}
          alt="Reward"
          className="reward-image"
        />
      </div>
      <div className="reward-text">
        <h2 className="reward-title">You did it!</h2>
        <p className="reward-description">Destination reached! Your reward is now saved in "My Rewards".</p>
      </div>
      </div>
    </>
  );
}

export default RewardCard;
