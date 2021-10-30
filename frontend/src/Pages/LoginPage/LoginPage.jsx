import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from '../../../src/assets/login-image.jpg'

export default function LoginPage() {
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
        console.log(username,password)
        axios.post("https://zensho.herokuapp.com/api/register",
            {username: username, password: password}
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }
    
    return (
        <div className="z-10 font-mono flex flex-row items-center justify-center bg-red-300 w-5/6 h-5/6 rounded-xl">
            <div className="relative overflow-hidden w-1/2 h-full bg-blue-400 rounded-l-xl">
                <img className="h-full" src={Image} alt="landscape"/>
                <div className="absolute top-0 h-full w-full flex flex-col justify-center items-center">
                    <h1 className="text-gray-200 text-3xl">Welcome to Zensho</h1>
                </div>
            </div>
            <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center rounded-r-xl">
                <h1 className="text-4xl w-3/5 mb-4 font-bold">Register</h1>
                <label className="w-3/5 text-lg my-2 font-semibold">Fullname</label>
                <input className="font-thin text-lg focus:outline-none w-3/5 border-b-2 border-gray-400 my-2" placeholder="fullname" value={fullname} type="text" onChange={(e) => handleFullnameChange(e)}/>
                <label className="w-3/5 text-lg my-2 font-semibold">Username</label>
                <input className="text-lg focus:outline-none w-3/5 border-b-2 border-gray-400 my-2" placeholder="username" value={username} type="text" onChange={(e) => handleUsernameChange(e)}/>
                <label className="w-3/5 text-lg my-2 font-semibold">Password</label>
                <input className="text-lg focus:outline-none w-3/5 border-b-2 border-gray-400 my-2" placeholder="password" value={password} type="password" onChange={(e) => handlePasswordChange(e)}/>
                <div className="flex flex-row my-8 w-3/5">
                    <input className="form-checkbox w-6 h-6 mr-2" type="checkbox" checked={isChecked} onClick={() => handleCheckboxClicked()}/>
                    <label className="text-sm">I agree and accept the <span className="text-blue-400">Terms and Condition</span></label>
                </div>
                <button className="w-1/2 bg-blue-400 py-2 rounded-md text-white hover:bg-blue-900" onClick={() => handleSubmit()}>Sign Up</button>
            </div>
        </div>
    )
}
