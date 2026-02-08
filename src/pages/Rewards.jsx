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
      <h2>Tajemství</h2>

      <p>Tajná stránka <strong>jen pro registrované uživatele</strong>.</p>

      <h3>Moje odmeny</h3>
      <ul>
        {rewards !== null &&
          rewards.map(reward => <li key={reward.id}>
            {reward.places.name} ({reward.created_at})
            <img src={`https://eyspimqmzwtcijvhxxmn.supabase.co/storage/v1/object/images/places/${reward.places.images[0].filename}`} />
            <img src={`https://eyspimqmzwtcijvhxxmn.supabase.co/storage/v1/object/images/rewards/${reward.places.reward}`} />
          </li>)
        }
      </ul>

      <hr />

      <button onClick={saveReward}>Save rewards</button>

    </>
  );
}

export default Secret;

