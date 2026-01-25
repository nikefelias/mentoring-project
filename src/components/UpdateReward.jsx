import {supabase} from './../supabase/supabase'

export default function UpdateReward() {

  const update = async () => {
    const {error} = await supabase
      .from('rewards')
      .insert({
        user_id: '44cfc2d2-896f-4dbd-8289-c4c08f533d1e',
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