import { supabase } from "../supabase/supabase.js";
import {useState, useEffect} from 'react';
import { useAuth } from "../context/AuthContext";
import '../index.css'


export const Secret = () => {

  const [rewards, setRewards] = useState(null)

  const {user} = useAuth();

  useEffect(() => {
    const getRewards = async () => {
      const data = await supabase
        .from('rewards')
        .select(`
  *,
  places (*, images(*))
`)

        .eq('user_id', user.id)

      // console.log(error)
      console.log(data.data)

      setRewards(data.data)
    }
    getRewards()

  }, [])


  // const saveReward = async () => {
  //   const x = await supabase.from('rewards').insert({
  //     user_id: user.id,
  //     place_id: 2,
  //   })
  //   console.log(user)
  //   console.log(x)
  // }
  return (
    <>
      <h1>My Rewards</h1>

      <ul className="rewards-list">
        {rewards !== null &&
          rewards.map(reward => {
            const placeImage = reward?.places?.images?.[0]?.filename
            const rewardImage = reward?.places?.reward
            const createdAt = reward?.created_at
              ? new Date(reward.created_at).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'
            return (
          

              <li key={reward.id} >
                <h3>{reward?.places?.name ?? 'Unknown place'} visited: {createdAt}</h3>
<div className="my-rewards-images">
                {rewardImage && (
                  <img
                    src={`https://eyspimqmzwtcijvhxxmn.supabase.co/storage/v1/object/images/rewards/${rewardImage}`}
                  className="my-rewards-image" />
                )}
</div>
                
              </li>
        
            )
          })
        }
      </ul>


    </>
  );
}

export default Secret;
