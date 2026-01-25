import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    try {
      const {
        data: { user, session },
        error
      } = await login(email, password);
      if (error) {
        console.log(error)
      }
      if (user && session) {
        // přesměrování na stránku po přihlášení
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
  }
}