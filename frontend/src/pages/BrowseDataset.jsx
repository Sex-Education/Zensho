import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import SearchNav from "../components/SearchNav";
import BrowseItem from "../components/BrowseItem";

export default function BrowseDataset() {
    const [datasetList,setDatasetList] = useState([])

    useEffect(() => {
        axios.get("https://zensho.herokuapp.com/api/dataset").then(
            response => {
                setDatasetList(response.data.data.reverse())
                console.log(response.data.data)
            }
        )
        .catch(
            error => console.log(error)
        )
    },[])

    return(
        <div className="ml-64 page-width h-screen text-white flex flex-col items-center overflow-y-scroll background-gray">
            <SearchNav/>
            <div className="w-11/12 border-b border-white mt-4">
                <h1>Recently upload</h1>
            </div>
            <div className="w-11/12 mt-4 grid grid-cols-4 gap-4">
                {datasetList.map(item => <BrowseItem id={item.id} imgSrc={item.imageSrc} datasetName={item.name} username={item.username} updatedDate={item.updatedDate} categories={["Dog","Cat"]}/>)}
            </div>
        </div>
    )
}