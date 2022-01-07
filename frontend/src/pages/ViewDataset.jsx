/*
This is a typical view page of a dataset, when the user clicks on any valid dataset, he will be transferred here. 
He will first see the thumbnail of the dataset, then the name, the description, categories, name of the user and last update. 
Below the thumbnail is the full description of the dataset, showing what the author has written in the description section when he created it. 
Below that is the data explorer, which shows the link to the csv file for previewing purposes
Finally we have the comment section, this is also one of the main use cases, 
any user including the owner can add comments to the dataset and any user of the website can see it.
*/

import React, { useContext, useEffect, useState } from "react";
import SearchNav from "../components/SearchNav";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar";

import AuthContext from "../context/auth.context";
import axios from "axios";

export default function ViewDataset() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [commentBody, setCommentBody] = useState("");
  const [commentList, setCommentList] = useState([]);

  const { avatarUrl, username } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://zensho.herokuapp.com/api/dataset/${id}`)
      .then((response) => {
        setData(response.data.data);
        // console.log(data)
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://zensho.herokuapp.com/api/comment/${id}`)
      .then((response) => {
        setCommentList(response.data.data || []);
        // console.log(response)
      })
      .catch((error) => console.log(error));
  }, [commentList]);

  const handleDownloadClick = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };

  const postComment = () => {
    const data = new FormData();
    data.append("username", username);
    data.append("comment_body", commentBody);
    data.append("dataset_id", id);
    axios
      .post("https://zensho.herokuapp.com/api/comment", data)
      .then((response) => {
        setCommentList([
          ...commentList,
          { username: username, comment_body: commentBody, dataset_id: id },
        ]);
        console.log(response);
        setCommentBody("");
      })
      .catch((error) => console.log(error));
  };

  if (data !== null) {
    return (
      <div className="ml-64 page-width h-screen text-white flex flex-col items-center overflow-y-scroll background-gray">
        <SearchNav />
        <div className="relative h-1/3 w-4/5 border-2 border-white mt-8 flex flex-col justify-end pl-8 pb-4 flex-shrink-0">
          <img
            className="absolute -z-50 top-0 left-0 w-full h-full object-cover"
            src={data.imageSrc}
            alt="dataset"
          />
          <h1 className="z-0 font-bold text-3xl mb-2">{data.name}</h1>
          <h2 className="z-0 font-extralight text-sm mb-2">
            {data.description}
          </h2>
          <div className="z-0 flex flex-row items-center text-sm mb-4">
            <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">
              Cat
            </h3>
            <h3 className="bg-yellow-300 text-black rounded-full p-1 mr-2">
              Dog
            </h3>
          </div>
          <div className="z-0 flex flex-row items-center text-sm">
            {/* <img alt="avatar"/> */}
            <h3 className="mr-2">{data.username}</h3>
            <h3 className="mr-2">-</h3>
            <h3>Update at {data.updatedDate}</h3>
          </div>
          <button
            className="absolute bottom-4 right-8 rounded-xl bg-gray-700 py-2 px-4"
            onClick={() => handleDownloadClick(data.datasetUrl)}
          >
            Download
          </button>
        </div>
        <div className="relative h-1/4 w-4/5 border-2 border-white mt-8 flex flex-col flex-shrink-0">
          <h1 className="w-full border-b border-white pl-8 py-2 text-gray-300">
            Description
          </h1>
          <h2 className="w-full h-full pl-8 py-2">{data.description}</h2>
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
            <Avatar src={avatarUrl} />
            <div className="ml-8 h-auto w-full border border-white py-1 px-4">
              <h1 className="text-yellow-400 font-bold">{username}</h1>
              <textarea
                className="font-light bg-transparent focus:outline-none w-full resize-none"
                value={commentBody}
                placeholder="Your comment"
                onChange={(e) => handleCommentChange(e)}
              />
              <div className="w-full flex flex-row justify-end">
                <button
                  className="rounded-xl bg-gray-700 py-1 px-2 m-1"
                  onClick={() => postComment()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          {commentList.map((item, index) => (
            <Comment
              key={index}
              avatarSrc={item.avatarSrc}
              username={item.username}
              commentBody={item.commentBody}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Page not found</div>;
  }
}
