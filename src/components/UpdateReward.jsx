import {supabase} from './../supabase/supabase'
import { useAuth } from '../context/AuthContext'


export default function UpdateReward() {

   const { user } = useAuth()

  const update = async () => {
    if (!user?.id) return
    const {error} = await supabase
      .from('rewards')
      .insert({
        user_id: user.id,
        place_id: 1,
      })
    if (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button onClick={update}>Create Reward</button>
    </>
  )
}