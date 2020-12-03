import React, { Suspense } from "react";
import { Box } from "@material-ui/core";
import TableView from "./TableView/TableView";
import GridView from "./GridView/GridView";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useHistory } from "react-router-dom";

function SearchResults({
  isLoading,
  nowPlaying,
  queue,
  setNowPlaying,
  setQueue,
  searchResults,
  searchTableViewMode,
  setSearchTableViewMode,
}) {
  let history = useHistory();
  if (isLoading) {
    return (
      <Box align="center">
        <LoadingAnimation size="240px" speed="5" />
      </Box>
    );
  }

  if (
    !(
      searchResults &&
      searchResults.results &&
      searchResults.results.length > 0 &&
      searchResults.searchTerm
    )
  ) {
    return <div>{history.push("/")}</div>;
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
