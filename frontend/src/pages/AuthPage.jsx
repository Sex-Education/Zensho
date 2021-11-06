import React, { useEffect, useState } from 'react'
import Image from '../../src/assets/login-image.jpg'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default function AuthPage() {
    const [loginForm,setLoginForm] = useState(false)

    return (
        <div className="auth-box-container font-heebo tracking-wider">
            <div className="auth-box-left">
                <img className="h-full" src={Image} alt="landscape"/>
                <div className="absolute top-0 h-full w-full flex flex-col justify-center items-center">
                    <h1 className="text-gray-200 text-3xl">Welcome to Zensho</h1>
                </div>
            </div>
            <div className="auth-box-right bg-gray-50">
                <div className="h-10percent w-full flex flex-row">
                    <div className={loginForm === false ? "choose-form-active" : "choose-form-inactive"} onClick={() => setLoginForm(false)}>Register</div>
                    <div className={"rounded-tr-xl " + (loginForm === true ? "choose-form-active" : "choose-form-inactive")} onClick={() => setLoginForm(true)}>Login</div>
                </div>
                {loginForm === true ? <LoginForm/> : <RegisterForm/>}
            </div>
        </div>
    )
}
