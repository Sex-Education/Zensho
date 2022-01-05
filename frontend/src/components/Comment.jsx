import React from 'react'
import Avatar from './Avatar'

export default function Comment({username, commentBody, avatarSrc}) {
    return (
        <div className="w-full h-auto mt-4 flex flex-row">
            <Avatar src={avatarSrc}/>
            <div className="ml-8 h-auto w-full border border-white py-1 px-4">
                <h1 className="text-yellow-400 font-bold">{username}</h1>
                <h2 className="font-light">{commentBody}</h2>
            </div>
        </div>
    )
}
