import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "../components/Register.css";
import "../App.css"

export default function Signup() {
  const [mode, setMode] = useState("login");

  if (mode === "register") {
    return (
      <>
        <Register />
        <div className="register-page">
          <p className='have_account'>
            Already have an account?{" "}
            <button type="button" className="button register__button" onClick={() => setMode("login")}>
              Sign in
            </button>
          </p>
        </div>
      </>
    );
  }

  return <Login onShowRegister={() => setMode("register")} />;
}
