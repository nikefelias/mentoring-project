import React, { useState } from "react";
import "./Register.css";
import "../App.css"
import {supabase} from './../supabase/supabase.js'


export default function Register() {
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  // const [firstName, setFirstName] = useState('')
	// const [lastName, setLastName] = useState('')
	// const [age, setAge] = useState('')

   const [message, setMessage] = useState(null)

  const handleSubmit = async (e) =>{
      e.preventDefault()
  
      setMessage(null)
  
      if (email === '' || password === '') {
        setMessage('You have to fill in email and password')
        return
      }
  
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (!error && data) {
        setMessage("Registration Successful. Check your email to confirm your account");
        console.log(data)
      }
  
      if (error) {
        setMessage("There was an error");
        console.log(error)
      }
  
    }
  

  return (
    <>
    <h2>Registrace</h2>
    {message && <p>{message}</p>}
    <form onSubmit={handleSubmit}>
    <div className="register-page">
      <div className="register">
        <label className="register__field">
          <span className="register__label"><h2>E-mail</h2></span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
          placeholder="Your e-mail"
        />
        </label>

        <label className="register__field">
          <span className="register__label"><h2>Password</h2></span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
          placeholder="Your password"
        />
        </label>
      </div>
      <button type="submit" className="button register__button">Register</button>
    </div>
    </form>
   </>
  );
}
