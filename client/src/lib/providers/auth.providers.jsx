import { useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../config/firebase.config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        });
      
        return () => unsubscribe();
      }, []);

      const handleSubmit = async (event, registerData) =>{
        event.preventDefault();
        const {email, password} = registerData;
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {console.log(error)}
    }
    
    const handleLogin = async (event, loginData, setError) =>{
        event.preventDefault();
        const {email, password} = loginData;
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {console.log('INVALID EMAIL')}
    }
    
    const handleSignOut = async navigate =>{
        await signOut(auth)
        navigate('/')
    } 

    return(
        <AuthContext.Provider  value={{
    currentUser,
    setCurrentUser,
    handleLogin,
    handleSubmit,
    handleSignOut
  }}>
            {children}
        </AuthContext.Provider>
    )
}