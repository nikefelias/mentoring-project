import { supabase } from "../supabase/supabase.js";
import {useState, useEffect} from 'react';
import { useAuth } from "../context/AuthContext";


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


  const saveReward = async () => {
    const x = await supabase.from('rewards').insert({
      user_id: user.id,
      place_id: 2,
    })
    console.log(user)
    console.log(x)
  }
  return (
    <>
      <h1>My Rewards</h1>

      <p>View your visit history, check-in times, and rewards earned for each location</p>

      <ul>
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
              <li key={reward.id}>
                <h3>{reward?.places?.name ?? 'Unknown place'} </h3>{createdAt}

                {placeImage && (
                  <img
                    src={`https://eyspimqmzwtcijvhxxmn.supabase.co/storage/v1/object/images/places/${placeImage}`}
                  />
                )}
                {rewardImage && (
                  <img
                    src={`https://eyspimqmzwtcijvhxxmn.supabase.co/storage/v1/object/images/rewards/${rewardImage}`}
                  />
                )}
              </li>
            )
          })
        }
      </ul>

      <hr />

      <button onClick={saveReward}>Save rewards</button>

    </>
  );
}

export default Secret;
