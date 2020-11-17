import React, { Suspense } from "react";
import TableView from "./TableView/TableView";
import GridView from "./GridView/GridView";

function SearchResults({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  nowPlaying,
  queue,
  setNowPlaying,
  setQueue,
  videos,
  searchTableViewMode,
  setSearchTableViewMode,
}) {
  if (!(videos && videos.results && videos.results.length > 0 && videos.searchTerm)) {
    return <div></div>;
  }

  return (
    <>
      {searchTableViewMode ? (
        <Suspense fallback={<div />}>
          <TableView
            {...{
              handleSearchTermInput,
              handleSubmitVideoSearch,
              nowPlaying,
              queue,
              setNowPlaying,
              setQueue,
              videos,
              setSearchTableViewMode,
            }}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<div />}>
          <GridView
            {...{
              handleSearchTermInput,
              handleSubmitVideoSearch,
              nowPlaying,
              queue,
              setNowPlaying,
              setQueue,
              videos,
              setSearchTableViewMode,
            }}
          />
        </Suspense>
      )}
    </>
  );
}

export default SearchResults;
