import React from 'react'

export default function Avatar({src}) {
    return (
        <img src={src} className="w-10 h-10 rounded-full object-cover" alt="user-ava"/>
    )
}
