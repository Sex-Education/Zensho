import React from 'react'

export default function SearchItem({imageSrc, datasetName, username, description, categories}) {
    return (
        <div className="w-11/12 h-28 flex flex-row items-center pb-1 flex-shrink-0 mt-6">
            <img src={imageSrc} alt="dataset" className="h-28 w-28 rounded-md object-cover"/>
            <div className="w-2/3 h-full flex flex-col ml-2 flex-shrink-0">
                <h1 className="w-full h-1/3 text-yellow-300 font-bold text-2xl">{datasetName}</h1>
                <p className="w-full h-1/2 font-light text-sm truncate">{description}</p>
                <div className="w-full h-1/6 flex flex-row justify-between mt-auto">
                    <h3 className="font-light text-sm">by <span className="font-bold underline cursor-pointer">{username}</span></h3>
                    <div className="flex flex-row h-full w-auto">
                        {categories.map(item => <h3 className="text-sm bg-yellow-300 text-black rounded-full px-2 mr-2">{item}</h3>)}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-end justify-center">
                <button className="rounded-xl bg-gray-700 py-2 px-4">Download</button>
            </div>
        </div>
    )
}
