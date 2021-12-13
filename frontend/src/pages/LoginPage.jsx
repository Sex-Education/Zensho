import React from 'react'
import { useState, useEffect } from 'react'
import Logo from '../assets/icons/logo.svg'
import Background from '../assets/backgrounds/background.svg'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

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
        newUser.append("username", username)
        newUser.append("password", password)
        console.log("username: ", username, "password: ", password)
        axios.post("https://zensho.herokuapp.com/api/login",
            newUser
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center background-gray overflow-y-auto rounded-br-xl">
            <img className="fixed top-0 left-0 w-screen z-0" src={Background} alt="background"/>
            <img className="z-10" src={Logo} alt="logo"/>
            <input className="w-72 text-sm p-3 mt-10 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="USERNAME" value={username} type="text" onChange={(e) => handleUsernameChange(e)} />
            <input className="w-72 text-sm p-3 mt-4 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="PASSWORD" value={password} type="password" onChange={(e) => handlePasswordChange(e)} />
            <button className="w-72 uppercase mt-10 bg-white text-blue-600 p-3 rounded-md z-10" onClick={() => handleSubmit()}>Log In</button>
            <h3 className="w-72 text-right text-white py-2 z-10 cursor-pointer">Forgot password?</h3>
            <h3 className="w-72 text-center text-white py-2 z-10 cursor-default">Not a member yet? <span onClick={() => navigate("/register")} className="text-blue-600 cursor-pointer">Register</span></h3>
        </div>
    )
}
