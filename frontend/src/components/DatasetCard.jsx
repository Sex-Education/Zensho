import React from "react";
import { useNavigate } from "react-router-dom";

export default function DatasetCard({ id, src, title, author }) {
  const navigate = useNavigate();

  const viewDataset = (id) => {
    navigate(`/dataset/${id}`);
  };

  return (
    <div
      className="relative w-1/5 h-full rounded-xl overflow-hidden mx-3 flex flex-col bg-gray-900 justify-end cursor-pointer"
      onClick={() => viewDataset(id)}
    >
      <img
        className="absolute -z-10 top-0 left-0 h-3/5 w-full object-cover"
        src={src}
        alt="pic"
      />
      <div className="w-full h-2/5 z-10">
        <h1 className="text-base font-bold px-2 pt-1">{title}</h1>
        <h3 className="text-xs font-extralight px-2 pb-1">{author}</h3>
      </div>
    </div>
  );
}
