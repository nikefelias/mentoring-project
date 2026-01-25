import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Signup() {
  const [mode, setMode] = useState("login");

  if (mode === "register") {
    return (
      <>
        <Register />
        <p>
          Already have an account?{" "}
          <button type="button" onClick={() => setMode("login")}>
            Sign in
          </button>
        </p>
      </>
    );
  }

  return <Login onShowRegister={() => setMode("register")} />;
}
