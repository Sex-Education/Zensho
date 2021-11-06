import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'

export default function RegisterForm() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [fullname,setFullname] = useState("")
    const [isChecked,setIsChecked] = useState(false)

    useEffect(() => {
        console.log('Rerender Login Page')
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleFullnameChange = (e) => {
        setFullname(e.target.value)
    }

    const handleCheckboxClicked = (e) => {
        setIsChecked(!isChecked)
    }

    const handleSubmit = () => {
        const newUser = new FormData()
        newUser.append("username",username)
        newUser.append("password",password)
        console.log("username: ",username,"password: ",password)
        axios.post("https://zensho.herokuapp.com/api/register",
            newUser
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="w-full h-90percent flex flex-col justify-center items-center bg-gray-50 overflow-y-auto rounded-br-xl">
            <h1 className="text-4xl w-3/5 h-auto mb-4 font-semibold">Register</h1>
            <label className="input-label">Fullname</label>
            <input className="input-field" placeholder="fullname" value={fullname} type="text" onChange={(e) => handleFullnameChange(e)} />
            <label className="input-label">Username</label>
            <input className="input-field" placeholder="username" value={username} type="text" onChange={(e) => handleUsernameChange(e)} />
            <label className="input-label">Password</label>
            <input className="input-field" placeholder="password" value={password} type="password" onChange={(e) => handlePasswordChange(e)} />
            <div className="flex flex-row my-8 w-3/5">
                <input className="form-checkbox w-6 h-6 mr-2" type="checkbox" checked={isChecked} onClick={() => handleCheckboxClicked()} />
                <label className="text-sm">I agree and accept the <span className="text-blue-400">Terms and Condition</span></label>
            </div>
            <button className="w-1/2 bg-blue-600 py-2 font-thin rounded-md text-white hover:bg-blue-900" onClick={() => handleSubmit()}>Sign Up</button>
        </div>
    )
}
