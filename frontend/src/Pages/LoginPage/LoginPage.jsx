import React, { useEffect, useState } from 'react'

export default function LoginPage() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    useEffect(() => {
        console.log('Rerender Login Page')
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        console.log(username,password)
    }
    
    return (
        <div>
            <input value={username} type="text" onChange={(e) => handleUsernameChange(e)}/>
            <input value={password} type="password" onChange={(e) => handlePasswordChange(e)}/>
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}
