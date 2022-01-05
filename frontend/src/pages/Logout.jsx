import React, { useContext } from 'react'
import AuthContext from '../context/auth.context'

export default function Logout() {
    const {isAuth, toggleAuth} = useContext(AuthContext)
    
    const handleLogOut = () => {
        toggleAuth(!isAuth)
    }

    return (
        <button onClick={() => handleLogOut()}>Log Out</button>
    )
}
