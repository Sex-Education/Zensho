/*
Similar to the homepage, but this time the dataset library is displayed almost fully, 
however we sort them according to topics so the users can navigate more easily. 
Each dataset contains a clickable frame, and on that frame we display the name, the institution,
the latest update date, the categories are displayed in yellow circles. 
To the right is a three-dot symbol, in which the user has the option to copy the dataset’s full name or thumbnail. 
Below the yellow categories are the content information, where we show how many files are contained within the dataset as well as their total size. 
At the bottom, we have the upvote function on the left where users can vote if the dataset interests them, 
and on the right is the author (or the publisher)’s avatar, where the user can click on to view the author’s profile page.
If the displayed datasets do not satisfy what the user is looking for, he can press “See all” to the right to view all datasets related to the topic.
*/

import React from 'react'
import SearchNav from '../components/SearchNav'
import DatasetCard from '../components/DatasetCard'
import { datasetList } from '../sampleData/datasets'
import { useNavigate } from 'react-router-dom'

export default function StoreOverview() {
    const navigate = useNavigate()

    const navigateToBrowse = () => {
        navigate("/browse")
    }

    return (
        <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center">
            <SearchNav/>
            <div className="w-11/12 mt-3 h-1/2 rounded-xl flex flex-row">
                <div className="relative w-4/5 h-full bg-red-100 rounded-l-xl overflow-hidden flex flex-col justify-between py-4 px-8">
                    <img className="absolute z-0 top-0 left-0 object-cover h-full w-full" src="https://www.capturelandscapes.com/wp-content/uploads/2017/11/Clingmans-Dome-Sunrise.jpg" alt="sample"/>
                    <h1 className="relative z-10 text-black">Ahvira J.Doster</h1>
                    <div className="relative z-10 text-white">
                        <h3 className="text-xs">Update</h3>
                        <h1 className="text-lg w-4/5">The “Vancouver household bills between 2010-2019” dataset received 2 new updates</h1>
                        <button className="bg-blue-600 text-white py-4 px-8 font-extralight rounded-xl text-xs">View more detail</button>
                    </div>
                </div>
                <div className="w-1/5 h-full bg-gray-600 rounded-r-xl flex flex-col items-center py-2">
                    <h1 className="w-3/4 border-b border-white text-center">Hot Authors</h1>
                    {[1,2,3,4,5].map((item,index) => 
                    <div className="w-11/12 flex flex-row h-1/5 my-1 items-center" id={item} key={index}>
                        <img className="h-12 w-12 object-cover rounded-full mx-3" src="https://cafebiz.cafebizcdn.vn/2019/1/2/photo-1-15464020829431420592113.png" alt="avatar"/>
                        <h3>{`User ${item}`}</h3>
                    </div>
                    )}
                </div>
            </div>
            <div className="w-11/12 h-1/3 flex flex-col">
                <div className="h-1/3 my-3 flex flex-row items-center overflow-hidden justify-between px-4">
                    <h3 className="">Trending Datasets</h3>
                    <div className="flex flex-row items-center">
                        {/* <img className="w-6 h-6 bg-gray-100 rounded-full mx-1 cursor-pointer" src={Left} alt="left"/>
                        <img className="w-6 h-6 bg-gray-100 rounded-full mx-1 cursor-pointer" src={Right} alt="right"/> */}
                        <h1 className="cursor-pointer" onClick={() => navigateToBrowse()}>See All</h1>
                    </div>
                </div>
                <div className="h-2/3 w-full flex flex-row justify-center">
                    {datasetList.map(item => <DatasetCard key={item.id} id={item.id} src={item.imageSrc} title={item.name} author={item.username}/>)}
                </div>
            </div>
        </div>
    )
}
