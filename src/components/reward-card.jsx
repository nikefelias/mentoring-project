import "../App.css";
import "../index.css";
import "./reward-card.css"
import rewardImage from "/images/reward-active.svg"

function RewardCard() {
  return (
    <>
    <div className="reward-card">
      <div>
        <img src={rewardImage} alt="" className="reward-image"/>
      </div>
      <div className="reward-text">
        <h2>YOUR REWARD</h2>
        <p>Congratulations, you have achieved your aim!</p>
      </div>
      </div>
    </>
  );
}

export default RewardCard;
