import {useAuth} from './../context/AuthContext'
import {Outlet, Navigate} from 'react-router'

export function AuthRoute() {
	const {isAuth} = useAuth()

  return (
    isAuth
    ? <Outlet />
    : <Navigate to="/" replace />
  )
}
