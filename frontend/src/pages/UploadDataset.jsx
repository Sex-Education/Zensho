import React, { useEffect, useState } from "react";
import FileIcon from "../assets/icons/file.svg";
import SearchNav from "../components/SearchNav";

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

export default function UploadDataset() {
  const [check, setCheck] = useState(true);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Please input your file...");

  const toggleCheck = () => {
    setCheck(!check);
  };

  useEffect(() => {
    console.log("Rerender your dataset");
  }, [file, fileName]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    // console.log(e.target.files[0])
  };

  return (
    <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center">
      <SearchNav />
      <h1 className="w-11/12 text-xl text-center border-b border-white mt-2">
        Uploading new dataset
      </h1>
      <input
        className="px-2 w-11/12 text-lg border border-white outline-none bg-transparent text-white mt-6"
        placeholder="Enter dataset title..."
      />
      <textarea
        className="px-2 py-1 w-11/12 text-sm border border-white outline-none bg-transparent text-white mt-6 resize-none h-28"
        placeholder="Put your description here, including experiment, user manual, update logs, notifications,..."
      />
      <div className="w-11/12 h-80 mt-6 flex flex-row">
        <div className="w-1/2 h-full flex flex-col">
          <textarea
            className="p-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white resize-none h-3/4"
            placeholder="[OPTIONAL] Put your source code here..."
          />
          <input
            className="px-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white h-1/6 mt-auto"
            placeholder="[OPTIONAL] URL to your paper..."
          />
        </div>
        <div className="w-1/2 h-full flex flex-col items-end">
          <div className="p-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white resize-none h-3/5 flex flex-col items-center overflow-hidden">
            <h1 className="w-full text-center font-bold">
              Drag and drop files to upload
            </h1>
            <h2 className="w-full text-center font-extralight italic">
              Temporarily, we only accept .csv files
            </h2>
            <img className="my-2 h-16" src={FileIcon} alt="file" />
            <h3>{fileName}</h3>
            <input
              onChange={(e) => handleFileChange(e)}
              className="hidden"
              id="upload-file"
              accept=".csv"
              type="file"
            />
            <label
              for="upload-file"
              className="w-1/3 mt-1 rounded-2xl text-white bg-gray-600 text-center cursor-pointer p-1 text-sm align-middle items-center"
            >
              Browse File
            </label>
          </div>
          <div className="w-11/12 h-1/5 flex flex-row justify-center items-center">
            <h1>OR</h1>
          </div>
          <input
            className="px-2 w-11/12 text-sm border border-white outline-none bg-transparent text-white h-1/5 mt-auto"
            placeholder="Links to your repository (Google Drive, OneDrive, Github)"
          />
        </div>
      </div>
      <div className="w-11/12 h-14 mt-4 flex flex-row">
        <div className="flex flex-col h-full w-1/2">
          <h1>Accessibility settings</h1>
          <div className="w-full flex flex-row items-center mt-2">
            <div className="w-1/2 flex flex-row">
              <input
                className="w-5 h-5 bg-white mr-2"
                type="checkbox"
                checked={check}
                onChange={() => toggleCheck()}
              />
              <h2 className="text-base">Private</h2>
            </div>
            <div className="w-1/2 flex flex-row">
              <input
                className="w-5 h-5 bg-white mr-2"
                type="checkbox"
                checked={!check}
                onChange={() => toggleCheck()}
              />
              <h2 className="text-base">Public</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-1/2 items-end">
          <h3 className="text-red-400 text-sm mb-2">
            Please fill in all required information.
          </h3>
          <button className="bg-yellow-400 text-black rounded-2xl w-1/4 h-1/2">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
