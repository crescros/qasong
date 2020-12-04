// load dependencies
import React, { useState, useEffect, Suspense } from "react";
import { getYoutubeIdFromSearch } from "./functions";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const qasongOrange = process.env.REACT_APP_QASONG_COLOR_1;

// lazy load components
const NowPlayingArea = React.lazy(() =>
  import("./components/NowPlayingArea/NowPlayingArea")
);
const Routes = React.lazy(() => import("./routes"));

// DARK MODE
const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#000",
    },
    primary: {
      main: "#000",
    },
    secondary: {
      main: qasongOrange,
      dark: "#fff",
      contrastText: "#fff",
    },
    type: "dark",
  },
  shadows: ["none"],
});

// LIGHT MODE
const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: "#f7f3f2",
    },
    primary: {
      main: "#fff",
    },
    secondary: {
      main: qasongOrange,
      dark: "#fff",
      contrastText: "#fff",
    },
    type: "light",
  },
  shadows: ["none"],
});

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

    let qasongsearch = document.querySelector("#qasongsearch");

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
      <div
        style={{
          minHeight: "80vh",
        }}
      >
        <img
          src=".\img\topCurve.svg"
          width="465px"
          style={{ position: "absolute", zIndex: -10000, maxWidth: "100%" }}
        />

        {<div style={{ height: "72px" }}></div>}

        <Suspense fallback={<div />}>
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
              setPlaybackRate
            }}
          />
        </Suspense>

        {/* NOW PLAYING AREA */}
        <Suspense fallback={<div />}>
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
              playbackRate
            }}
          />
        </Suspense>
      </div>

      <img
        src=".\img\bottomCurve.svg"
        width="465px"
        style={{ position: "absolute", zIndex: -10000, maxWidth: "100%", right: "0%" }}
      />
    </ThemeProvider>
  );
};

export default App;
