import { useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const AuthProvider = ({children}) => {
    const [currentUser, serCurrentUser] = useState(null)

    return(
        <AuthContext.Provider value={{currentUser, serCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}