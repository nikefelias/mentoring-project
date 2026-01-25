import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase"

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)

const login = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

const logout = async () => {
  return await supabase.auth.signOut()
}


export function AuthProvider({children}) {

  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser({
          id: session.user.id,
          email: session.user.email,
          firstName: session.user.user_metadata.firstName,
          lastName: session.user.user_metadata.lastName,
          age: session.user.user_metadata.age,
        });
        setIsAuth(true);
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAuth(false)
      }

    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);


  return (
    <AuthContext.Provider value={{
      user,
      isAuth,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;





