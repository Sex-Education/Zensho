/*
Uploading dataset is also one of our main use cases, where each user is allowed to upload their own dataset. 
To access this functionality, the user clicks on the “Upload new dataset” button while inside the “Your datasets” tab. 
This will bring up a form like below so he can fill in necessary information to upload a valid dataset.
Firstly, the fields without the tag “Optional” has to be filled in, 
such as the dataset title, the description, and the dataset files. 
We allow the users to upload files from their computer or create links to their repository online such as google drive or github. We also allow the users
to put their source code related to the dataset (such as neural network code on a trained dataset). 
There is also accessibility settings, which is “Private” by default. 
Setting a dataset private means that people can view it, but cannot download or use or comment on it. 
Public dataset is visible to all in the Internet (including anonymous users). 
Finally after the user filled in all valid information, he can confirm creating dataset by clicking on the “Create” button.
*/
import React, { useContext, useEffect, useState } from 'react'
import FileIcon from '../assets/icons/file.svg'
import SearchNav from '../components/SearchNav'
import AuthContext from '../context/auth.context'
import axios from 'axios'

export default function UploadDataset() {
    const [check,setCheck] = useState(true) //true = private, false = public
    const [file,setFile] = useState(null)
    const [datasetName,setDatasetName] = useState("")
    const [description,setDescription] = useState("")
    const [sourceCode,setSourceCode] = useState("")
    const [paperUrl,setPaperUrl] = useState("")
    const [repoLink,setRepoLink] = useState("")
    const [fileName,setFileName] = useState("Please input your file...")
    const [uploading,setUploading] = useState(false)

    const [error,setError] = useState("")

    const csv_extension = ["application/csv","application/x-csv","text/csv","text/comma-separated-values","text/x-comma-separated-values","text/tab-separated-values","application/vnd.ms-excel"]

    const {username} = useContext(AuthContext)

    const checkFilled = () => {
        if (datasetName.length > 0 && description.length > 0 && file !== null){
            return true
        }
        else {
            return false
        }
    }

    const checkFileType = (file) => {
        if (file === null) return false
        if (csv_extension.includes(file.type)){
            return true
        }
        return false
    }

    const checkFileSize = (file) => {
        if (file === null) return false
        if (file.size > 15000000){ //1000000 bytes = 1MB
            return false
        }
        return true
    }

    const resetField = () => {
        setDatasetName("")
        setDescription("")
        setFileName("")
        setFile(null)
        setUploading(false)
    }

    const handleSubmit = () => {
        if (!checkFilled()){
            setError("Please fill in all the required information")
            return
        }
        if (!checkFileType(file)){
            setError("Invalid file extension")
            return
        }
        if (!checkFileSize(file)){
            setError("File size must not be greater than 15MB")
            return
        }
        setError("")
        const newDataset = new FormData()
        newDataset.append("file", file)
        newDataset.append("dataset_name", datasetName)
        newDataset.append("username", username)
        newDataset.append("description",description)
        setUploading(true)
        // console.log(datasetName,description,sourceCode,paperUrl,repoLink,check)
        // console.log(file, datasetName, username, description)
        axios.post("https://zensho.herokuapp.com/api/upload",
            newDataset
        ).then(response => {
            console.log(response)
            alert("Upload successfully")
            resetField()
        }).catch(error => {
            console.log(error)
            resetField()
        })
    }

    const toggleCheck = () => {
        setCheck(!check)
    }

    useEffect(() => {
        console.log("Rerender your dataset")
    },[])

    const handleFileChange = (e) => {
        if (e.target.files[0]){
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
            // console.log(e.target.files[0])
        }
    }

    const updateDatasetName = (e) => {
        setDatasetName(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateSourceCode = (e) => {
        setSourceCode(e.target.value)
    }

    const updatePaperUrl = (e) => {
        setPaperUrl(e.target.value)
    }

    const updateRepoLink = (e) => {
        setRepoLink(e.target.value)
    }

    return (
        <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center">
            <SearchNav/>
            <h1 className="w-11/12 text-xl text-center border-b border-white mt-2">Uploading new dataset</h1>
            <input className="px-2 w-11/12 text-lg border border-white outline-none bg-transparent text-white mt-6" placeholder="Enter dataset title..." value={datasetName} onChange={(e) => updateDatasetName(e)}/>
            <textarea className="px-2 py-1 w-11/12 text-sm border border-white outline-none bg-transparent text-white mt-6 resize-none h-28" placeholder="Put your description here, including experiment, user manual, update logs, notifications,..." value={description} onChange={(e) => updateDescription(e)}/>
            <div className="w-11/12 h-80 mt-6 flex flex-row">
                <div className="w-1/2 h-full flex flex-col">
                    <textarea className="p-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white resize-none h-3/4" placeholder="[OPTIONAL] Put your source code here..." value={sourceCode} onChange={(e) => updateSourceCode(e)}/>
                    <input className="px-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white h-1/6 mt-auto" placeholder="[OPTIONAL] URL to your paper..." value={paperUrl} onChange={(e) => updatePaperUrl(e)}/>
                </div>
                <div className="w-1/2 h-full flex flex-col items-end">
                    <div className="p-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white resize-none h-3/5 flex flex-col items-center overflow-hidden">
                        <h1 className="w-full text-center font-bold">Drag and drop files to upload</h1>
                        <h2 className="w-full text-center font-extralight italic">Temporarily, we only accept .csv files</h2>
                        <img className="my-2 h-16" src={FileIcon} alt="file"/>
                        <h3>{fileName}</h3>
                        <input onChange={(e) => handleFileChange(e)} className="hidden" id="upload-file" accept=".csv" type="file"/>
                        <label htmlFor="upload-file" className="w-1/3 mt-1 rounded-2xl text-white bg-gray-600 text-center cursor-pointer p-1 text-sm align-middle items-center">Browse File</label>
                    </div>
                    <div className="w-11/12 h-1/5 flex flex-row justify-center items-center">
                        <h1>OR</h1>
                    </div>
                    <input className="px-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white h-1/5 mt-auto" placeholder="Links to your repository (Google Drive, OneDrive, Github)" value={repoLink} onChange={(e) => updateRepoLink(e)}/>
                </div>
            </div>
            <div className="w-11/12 h-14 mt-4 flex flex-row">
                <div className="flex flex-col h-full w-1/2">
                    <h1>Accessibility settings</h1>
                    <div className="w-full flex flex-row items-center mt-2">
                        <div className="w-1/2 flex flex-row">
                            <input className="w-5 h-5 bg-white mr-2" type="checkbox" checked={check} onChange={() => toggleCheck()}/>
                            <h2 className="text-base">Private</h2>
                        </div>
                        <div className="w-1/2 flex flex-row">
                            <input className="w-5 h-5 bg-white mr-2" type="checkbox" checked={!check} onChange={() => toggleCheck()}/>
                            <h2 className="text-base">Public</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-1/2 items-end">
                    {error !== "" ? <h3 className="text-red-400 text-sm mb-2">{error}</h3>: <></>}
                    <button className="bg-yellow-400 text-black rounded-2xl w-1/4 h-1/2" disabled={uploading} onClick={() => handleSubmit()}>{uploading === false ? "Create" : "Uploading..."}</button>
                </div>
            </div>
        </div>
    )
}
