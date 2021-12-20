import React from 'react'

export default function DatasetCard({src, title, author}) {
    return (
        <div className="w-1/5 h-full rounded-xl overflow-hidden mx-3 flex flex-col bg-gray-900">
            <img className="h-full w-full object-cover" src={src} alt="pic"/>
            <h1 className="text-base font-bold px-2 pt-1">{title}</h1>
            <h3 className="text-xs font-extralight px-2 pb-1">{author}</h3>
        </div>
    )
}
