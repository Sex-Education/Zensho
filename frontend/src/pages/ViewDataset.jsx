import React, { useContext } from "react";
import SearchNav from "../components/SearchNav";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar";

import { commentList } from "../sampleData/comments";
import AuthContext from "../context/auth.context";


/*
This is a typical view page of a dataset, when the user clicks on any valid dataset, he will be transferred here. 
He will first see the thumbnail of the dataset, then the name, the description, categories, name of the user and last update. 
Below the thumbnail is the full description of the dataset, showing what the author has written in the description section when he created it. 
Below that is the data explorer, which shows the link to the csv file for previewing purposes
Finally we have the comment section, this is also one of the main use cases, 
any user including the owner can add comments to the dataset and any user of the website can see it.
*/

export default function ViewDataset() {
  const { id } = useParams();

  const IMG_SRC =
    "https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg";

  const { isAuth, userId } = useContext(AuthContext);

  return (
    <div className="ml-64 page-width h-screen text-white flex flex-col items-center overflow-y-scroll background-gray">
      <SearchNav />
      <div className="relative h-1/3 w-4/5 border-2 border-white mt-8 flex flex-col justify-end pl-8 pb-4 flex-shrink-0">
        <img
          className="absolute -z-50 top-0 left-0 w-full h-full object-cover"
          src={IMG_SRC}
          alt="dataset"
        />
        <h1 className="z-0 font-bold text-3xl mb-2">Dataset {id}</h1>
        <h2 className="z-0 font-extralight text-sm mb-2">Sub-title</h2>
        <div className="z-0 flex flex-row items-center text-sm mb-4">
          <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">
            Category 1
          </h3>
          <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">
            Category 2
          </h3>
        </div>
        <div className="z-0 flex flex-row items-center text-sm">
          {/* <img alt="avatar"/> */}
          <h3 className="mr-2">Username</h3>
          <h3 className="mr-2">-</h3>
          <h3>Update a month ago</h3>
        </div>
        <button className="absolute bottom-4 right-8 rounded-xl bg-gray-700 py-2 px-4">
          Download
        </button>
      </div>
      <div className="relative h-1/4 w-4/5 border-2 border-white mt-8 flex flex-col flex-shrink-0">
        <h1 className="w-full border-b border-white pl-8 py-2 text-gray-300">
          Description
        </h1>
        <h2 className="w-full h-full pl-8 py-2">Some description</h2>
      </div>
      <div className="w-4/5 h-auto flex flex-row justify-end px-4 my-4">
        <button className="rounded-xl bg-gray-700 py-2 px-4">
          Cite dataset
        </button>
      </div>
      <div className="w-4/5 h-auto flex-shrink-0">
        <h1>
          Comment <span>({commentList.length})</span>
        </h1>
        <div className="w-full h-auto mt-4 flex flex-row">
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg" />
          <div className="ml-8 h-auto w-full border border-white py-1 px-4">
            <h1 className="text-yellow-400 font-bold">Elon Musk</h1>
            <textarea
              className="font-light bg-transparent focus:outline-none w-full resize-none"
              placeholder="Your comment"
            />
            <div className="w-full flex flex-row justify-end">
              <button className="rounded-xl bg-gray-700 py-1 px-2 m-1">
                Post
              </button>
            </div>
          </div>
        </div>
        {commentList.map((item) => (
          <Comment
            key={Math.random(100)}
            avatarSrc={item.avatarSrc}
            username={item.username}
            commentBody={item.commentBody}
          />
        ))}
      </div>
    </div>
  );
}
