import React from 'react'
import SearchNav from '../components/SearchNav'
import DatasetCard from '../components/DatasetCard'
// import Left from '../assets/icons/left.png'
// import Right from '../assets/icons/right.png'
import { datasetList } from '../sampleData/datasets'

export default function StoreOverview() {
    return (
        <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center">
            <SearchNav/>
            <div className="w-11/12 mt-3 h-1/2 rounded-xl flex flex-row">
                <div className="relative w-4/5 h-full bg-red-100 rounded-l-xl overflow-hidden flex flex-col justify-between py-4 px-8">
                    <img className="absolute z-0 top-0 left-0 object-cover h-full w-full" src="https://images.hdqwalls.com/wallpapers/japan-sunset-purple-evening-4k-5m.jpg" alt="sample"/>
                    <h1 className="relative z-10 text-black">Ahvira J.Doster</h1>
                    <div className="relative z-10 text-white">
                        <h3 className="text-xs">Update</h3>
                        <h1 className="text-lg w-4/5">The “Vancouver household bills between 2010-2019” dataset received 2 new updates</h1>
                        <button className="bg-blue-600 text-white py-4 px-8 font-extralight rounded-xl text-xs">View more detail</button>
                    </div>
                </div>
                <div className="w-1/5 h-full bg-gray-600 rounded-r-xl flex flex-col items-center py-2 overflow-y-scroll">
                    <h1 className="w-3/4 border-b border-white text-center">Hot Authors</h1>
                    {[1,2,3,4,5].map(item => 
                    <div className="w-11/12 flex flex-row h-1/5 my-1 items-center" id={item}>
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
                        <h1 className="cursor-pointer">See All</h1>
                    </div>
                </div>
                <div className="h-2/3 w-full flex flex-row justify-center">
                    {datasetList.map(item => <DatasetCard id={item.id} src={item.imageSrc} title={item.name} author={item.username}/>)}
                </div>
            </div>
        </div>
    )
}
