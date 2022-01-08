import React, { useContext } from 'react'
import AuthContext from '../context/auth.context'

/*
    Tested with logout button
    ------
    Test result: PASSED
    Comment: Need to build nicer UI
*/
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
