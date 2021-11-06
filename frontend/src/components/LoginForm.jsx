import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function LoginForm() {
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
        const newUser = new FormData()
        newUser.append("username",username)
        newUser.append("password",password)
        console.log("username: ",username,"password: ",password)
        axios.post("https://zensho.herokuapp.com/api/login",
            newUser
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="w-full h-90percent flex flex-col justify-center items-center bg-gray-50 overflow-y-auto rounded-br-xl">
            <h1 className="text-4xl w-3/5 mb-4 font-semibold">Login</h1>
            <label className="input-label">Username</label>
            <input className="input-field" placeholder="username" value={username} type="text" onChange={(e) => handleUsernameChange(e)} />
            <label className="input-label">Password</label>
            <input className="input-field" placeholder="password" value={password} type="password" onChange={(e) => handlePasswordChange(e)} />
            <button className="w-1/2 bg-blue-600 py-2 font-thin rounded-md text-white hover:bg-blue-900 mt-8" onClick={() => handleSubmit()}>Sign In</button>
        </div>
    )
}
