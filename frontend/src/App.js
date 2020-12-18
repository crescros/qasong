// load dependencies
import React, { useState, useEffect, Suspense } from "react";
import { getYoutubeIdFromSearch } from "./functions";
import { CssBaseline, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme, lightTheme } from "./themes";
import Curve from "./components/Curve/Curve.js";

// lazy load components
const NowPlayingArea = React.lazy(() =>
  import("./components/NowPlayingArea/NowPlayingArea")
);
const Routes = React.lazy(() => import("./routes"));

const App = () => {
  // APPLICATION LEVEL STATE
  const [currentQid, setCurrentQid] = useState();
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState();
  const [queue, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTableViewMode, setSearchTableViewMode] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(!localStorage.getItem("returningUser"));
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  function skipSong() {
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i + 1];
    setNowPlaying(nextInQueue);
  }

  function previousSong() {
    const i = queue.findIndex((item) => item.qid === currentQid);
    const previousInQueue = queue[i - 1];
    setNowPlaying(previousInQueue);
  }

  function getNextInQueue() {
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i + 1];
    return nextInQueue;
  }

  function getPreviousInQueue() {
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i - 1];
    return nextInQueue;
  }

  function addSongToQueue(song) {
    setQueue(queue.concat(song));
  }

  // event listener for search submit
  const handleSubmitMusicSearch = async (e) => {
    setIsLoading(true);
    setSearchResults({});

    if (e) {
      e.preventDefault();
    }

    let qasongsearch = document.querySelector("#qasong-search");

    const searchTerm = qasongsearch.value;

    const results = await getYoutubeIdFromSearch(searchTerm);
    setSearchResults({
      searchTerm: searchTerm,
      results: results,
    });
    setIsLoading(false);
  };

  //when app starts
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("returningUser", true);
    }, 10000);

    let storedQueue = localStorage.getItem("queue");

    if (storedQueue) {
      setQueue(JSON.parse(storedQueue));
    }
  }, []);

  //when nowPlaying changes
  useEffect(() => {
    // if a queue item is playing, set current qid
    if (nowPlaying && nowPlaying.qid) {
      setCurrentQid(nowPlaying.qid);
    }

    // if a song stopped, and there is a queue, play next in queue
    if (!nowPlaying && queue.length > 0) {
      if (currentQid) {
        skipSong();
      } else {
        const nextInQueue = queue[0];
        setNowPlaying(nextInQueue);
      }
    }
  }, [nowPlaying]);

  // write darkMode value to localstorage
  useEffect(() => {
    localStorage.setItem("userDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // write searchTableViewMode value to localstorage
  useEffect(() => {
    localStorage.setItem("userSearchTableViewMode", JSON.stringify(searchTableViewMode));
  }, [searchTableViewMode]);

  // write queue value to local storage, write array of queue ids to query params
  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        style={{
          minHeight: "80vh",
        }}
      >
        <Curve />

        <Box style={{ height: "72px" }} />

        <Suspense fallback={<Box />}>
          <Routes
            {...{
              addSongToQueue,
              darkMode,
              handleSubmitMusicSearch,
              isLoading,
              nowPlaying,
              queue,
              searchResults,
              searchTableViewMode,
              setDarkMode,
              setNowPlaying,
              setQueue,
              setSearchTableViewMode,
              setShowAboutUs,
              showAboutUs,
              showSettings,
              setShowSettings,
              playbackRate,
              setPlaybackRate,
            }}
          />
        </Suspense>

        {/* NOW PLAYING AREA */}
        <Suspense fallback={<Box />}>
          <NowPlayingArea
            {...{
              skipSong,
              previousSong,
              nowPlaying,
              queue,
              searchResults,
              setNowPlaying,
              getNextInQueue,
              getPreviousInQueue,
              playbackRate,
            }}
          />
        </Suspense>
      </Box>

      <Curve align="right" />
    </ThemeProvider>
  );
};

export default App;
