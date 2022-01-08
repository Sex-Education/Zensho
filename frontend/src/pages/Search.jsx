/*
The search function. 
This is carried out when the user inputs the search keyword into the search bar on the top right corner
The page will reload to the store tab and the search result is displayed
First we will show the user how many results there are. 
For each search result we have a row contained several information about the respective dataset. 
It contains the name of the dataset, a shortened description, the author or the belonging institution, the latest update date and the categories. 
To the right we have an upvote button with current vote count, and also the download button, 
below which we show how many files are contained in the dataset and the total size of them all.
The result will not be paginated, instead we allow the user to scroll endlessly, loading more and more search result as they scroll down more to the bottom.
*/
import React, { useEffect } from 'react'
import SearchNav from '../components/SearchNav'
import SearchItem from '../components/SearchItem'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'

/*
    
*/
export default function Search() {
    const [searchParams,setSearchParams] = useSearchParams()
    const [datasetList,setDatasetList] = useState([])

    const q = searchParams.get('q')

    useEffect(() => {
        axios.get(`https://zensho.herokuapp.com/api/dataset?name=${q}&page=1&limit=10`).then(
            (response) => {
                setDatasetList(response.data.data)
                console.log("search",response.data.data)
            }
        )
    },[q])
    
    return (
        <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center overflow-y-scroll">
            <SearchNav/>
            <div className="w-11/12 border-b border-white mt-4">
                <h1>{datasetList.length} results for "{q}"</h1>
            </div>
            {datasetList.map(item => <SearchItem key={item.id} id={item.id} imageSrc={item.imageSrc} datasetName={item.name} username={item.username} description={item.description} categories={["Dog","Cat"]}/>)}
        </div>
    )
}
