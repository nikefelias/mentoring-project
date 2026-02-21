import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import "./Register.css";

import {useNavigate} from 'react-router-dom'

export const Login = ({ onShowRegister }) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {login} = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) =>{
		e.preventDefault()
		console.log('Signing in...', email, password)

		const {error} = login(email, password)

		if (error) {
			console.log(error)
			return
		}

		// pokud pri prihlaseni nedoslo k chybe
		// presmeruj na uvodni stranku
		navigate('/')

	}

	return (
		<>
			<h1>Sign In</h1>

			<form onSubmit={handleSubmit}>
				<div className="register-page">
					<div className="register">
						<label className="register__field">
							<span className="register__label"><h2>E-mail</h2></span>
							<input
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								className="register__input"
								placeholder="Your e-mail"
							/>
						</label>

						<label className="register__field">
							<span className="register__label"><h2>Password</h2></span>
							<input
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								className="register__input"
								placeholder="Your password"
							/>
						</label>
					</div>

					<button type="submit" className="button register__button">Sign in</button>

					<p className='have_account'>
						Don't have an account?{" "}
						{onShowRegister ? (
							<button type="button"  class="button register__button" onClick={onShowRegister}>
								Register
							</button>
						) : (
							<Link to="/signup">Register</Link>
						)}
					</p>
				</div>
			</form>
		</>
	)
}

export default Login
