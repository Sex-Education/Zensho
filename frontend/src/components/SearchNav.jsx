import React from 'react'
import { useNavigate } from 'react-router-dom'
import BellIcon from '../assets/icons/bell.svg'

/*
Nice handle test case that leaving the content blank in search box
------
Test result: PASSED
*/
export default function SearchNav() {
    const navigate = useNavigate()

    const handleEnter = (e) => {
        if (e.key === "Enter"){
            if (e.target.value){
                navigate(`/search?q=${e.target.value}`)
                e.target.value = ""
            }
        }
    }

    return (
        <div className="w-11/12 h-8 mt-8 flex flex-row justify-end">
            <img src={BellIcon} className="cursor-pointer" alt="bell"/>
            <input type="text" className="rounded-2xl bg-gray-700 p-4 ml-4 text-sm outline-none w-1/3" placeholder="Animal" onKeyDown={(e) => handleEnter(e)}/>
        </div>
    )
}
