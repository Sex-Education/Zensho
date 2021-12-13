import { useState, useEffect } from 'react'
import Logo from '../assets/icons/logo.svg'
import Background from '../assets/backgrounds/background.svg'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [email,setEmail] = useState("")

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

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = () => {
        const newUser = new FormData()
        newUser.append("email",email)
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
        <div className="w-full h-full flex flex-col justify-center items-center background-gray overflow-y-auto rounded-br-xl">
            <img className="fixed top-0 left-0 w-screen z-0" src={Background} alt="background"/>
            <img className="z-10" src={Logo} alt="logo"/>
            <input className="w-72 text-sm p-3 mt-10 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="EMAIL" value={email} type="email" onChange={(e) => handleEmailChange(e)} />
            <input className="w-72 text-sm p-3 mt-4 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="USERNAME" value={username} type="text" onChange={(e) => handleUsernameChange(e)} />
            <input className="w-72 text-sm p-3 mt-4 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="PASSWORD" value={password} type="password" onChange={(e) => handlePasswordChange(e)} />
            <input className="w-72 text-sm p-3 mt-4 rounded-md outline-none bg-transparent border border-white text-white font-extralight z-10" placeholder="CONFIRM PASSWORD" value={confirmPassword} type="password" onChange={(e) => handleConfirmPasswordChange(e)} />
            <button className="w-72 uppercase mt-10 bg-white text-blue-600 p-3 rounded-md z-10" disabled={!(password === confirmPassword)} onClick={() => handleSubmit()}>Register</button>
            <h3 className="w-72 text-center text-white py-2 z-10 cursor-default">Already have an account? <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer">Login</span></h3>
            <h3 className={"text-red-500 " + (password === confirmPassword ? "invisible" : "visible")}>Wrong confirm password</h3>
        </div>
    )
}
