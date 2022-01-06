import React from "react";
import SearchNav from "../components/SearchNav";
import SearchItem from "../components/SearchItem";
import { useSearchParams } from "react-router-dom";
import { datasetList } from "../sampleData/datasets";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");

  return (
    <div className="ml-64 page-width h-full background-gray text-white flex flex-col items-center overflow-y-scroll">
      <SearchNav />
      <div className="w-11/12 border-b border-white mt-4">
        <h1>
          {datasetList.length} results for "{q}"
        </h1>
      </div>
      {datasetList.map((item) => (
        <SearchItem
          id={item.id}
          imageSrc={item.imageSrc}
          datasetName={item.name}
          username={item.username}
          description={item.description}
          categories={item.categories}
        />
      ))}
    </div>
  );
}
