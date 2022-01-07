import React, { useContext } from 'react'
import AuthContext from '../context/auth.context'

export default function Logout() {
    const {toggleAuth} = useContext(AuthContext)
    
    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("avatar_url")
        toggleAuth(false)
    }

    return (
        <button onClick={() => handleLogOut()}>Log Out</button>
    )
}
