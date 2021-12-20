import React from 'react'
import BellIcon from '../assets/icons/bell.svg'

export default function SearchNav() {
    return (
        <div className="w-11/12 h-8 mt-8 flex flex-row justify-end">
            <img src={BellIcon} className="cursor-pointer" alt="bell"/>
            <input type="text" className="rounded-2xl bg-gray-700 p-4 ml-4 text-sm outline-none w-1/3" placeholder="Animal"/>
        </div>
    )
}
