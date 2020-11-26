import React, { Suspense } from "react";
import TableView from "./TableView/TableView";
import GridView from "./GridView/GridView";

function SearchResults({
  nowPlaying,
  queue,
  setNowPlaying,
  setQueue,
  searchResults,
  searchTableViewMode,
  setSearchTableViewMode,
}) {
  if (
    !(
      searchResults &&
      searchResults.results &&
      searchResults.results.length > 0 &&
      searchResults.searchTerm
    )
  ) {
    return <div></div>;
  }

  return (
    <>
      {searchTableViewMode ? (
        <Suspense fallback={<div />}>
          <TableView
            {...{
              nowPlaying,
              queue,
              setNowPlaying,
              setQueue,
              searchResults,
              setSearchTableViewMode,
            }}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<div />}>
          <GridView
            {...{
              nowPlaying,
              queue,
              setNowPlaying,
              setQueue,
              searchResults,
              setSearchTableViewMode,
            }}
          />
        </Suspense>
      )}
    </>
  );
}

export default SearchResults;
