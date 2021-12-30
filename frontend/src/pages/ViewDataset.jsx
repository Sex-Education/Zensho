import React from 'react'
import SearchNav from '../components/SearchNav'
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom'

import {commentList} from '../sampleData/comments'

export default function ViewDataset() {
    const { id } = useParams()

    const IMG_SRC = "https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg"

    return (
        <div className="ml-64 page-width h-screen text-white flex flex-col items-center overflow-y-scroll background-gray">
            <SearchNav/>
            <div className="relative h-1/3 w-4/5 border-2 border-white mt-8 flex flex-col justify-end pl-8 pb-4 flex-shrink-0">
                <img className="absolute -z-50 top-0 left-0 w-full h-full object-cover" src={IMG_SRC} alt="dataset"/>
                <h1 className="z-0 font-bold text-3xl mb-2">Dataset {id}</h1>
                <h2 className="z-0 font-extralight text-sm mb-2">Sub-title</h2>
                <div className="z-0 flex flex-row items-center text-sm mb-4">
                    <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">Category 1</h3>
                    <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">Category 2</h3>
                </div>
                <div className="z-0 flex flex-row items-center text-sm">
                    {/* <img alt="avatar"/> */}
                    <h3 className="mr-2">Username</h3>
                    <h3 className="mr-2">-</h3>
                    <h3>Update a month ago</h3>
                </div>
                <button className="absolute bottom-4 right-8 rounded-xl bg-gray-700 py-2 px-4">Download</button>
            </div>
            <div className="relative h-1/4 w-4/5 border-2 border-white mt-8 flex flex-col flex-shrink-0">
                <h1 className="w-full border-b border-white pl-8 py-2 text-gray-300">Description</h1>    
                <h2 className="w-full h-full pl-8 py-2">Some description</h2>
            </div>
            <div className="w-4/5 h-auto flex flex-row justify-end px-4 my-4">
                <button className="rounded-xl bg-gray-700 py-2 px-4">Cite dataset</button>
            </div>
            <div className="w-4/5 h-auto flex-shrink-0">
                <h1>Comment <span>({commentList.length})</span></h1>
                {commentList.map(item => <Comment avatarSrc={item.avatarSrc} username={item.username} commentBody={item.commentBody}/>)}
            </div>
        </div>
    )
}
