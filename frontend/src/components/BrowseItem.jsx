import React from "react";
import { useNavigate } from "react-router-dom";

export default function BrowseItem({id, imgSrc, datasetName, username, updatedDate, categories}){
    const navigate = useNavigate()
    
    const navigateDataset = (id) => {
        navigate(`/dataset/${id}`)
    }
    
    return (
        <div className="h-80 bg-transparent overflow-hidden p-4 rounded-2xl border-2 border-white cursor-pointer" onClick={() => navigateDataset(id)}>
            <img src={imgSrc} alt="dataset" className="h-1/2 w-full object-cover"/>
            <div className="flex flex-col">
                <h1 className="text-2xl text-yellow-400 font-bold mb-4">{datasetName}</h1>
                <h2 className="text-sm font-light">by <span className="underline font-bold">{username}</span></h2>
                <h3 className="text-sm font-light">Updated at {updatedDate}</h3>
                <div className="flex flex-row">
                    {categories.map((item,index) => <h3 key={index} className="mr-3 bg-yellow-500 py-1 px-2 rounded-2xl">{item}</h3>)}
                </div>
            </div>
        </div>
    )
}