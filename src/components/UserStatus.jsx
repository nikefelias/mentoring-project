import {useAuth} from '../context/AuthContext'

export function UserStatus() {

	const {user, isAuth, logout} = useAuth()

	return (
		<div className="user-status">

			{isAuth
				? <>
						<p>{user.firstName} {user.lastName}</p>
						<button onClick={logout}>Odhlásit se</button>
					</>
				: <p>Neni prihlaseny</p>
			}

		</div>
	);
}

export default UserStatus;