// load dependencies
import React, { useState, useEffect, Suspense } from "react";
import { getYoutubeIdFromSearch } from "./functions";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const qasongOrange = process.env.REACT_APP_QASONG_COLOR_1

console.log(qasongOrange)
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
  const [videos, setVideos] = useState([]);
  const [searchTableViewMode, setSearchTableViewMode] = useState(false);

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

  // event listener for search submit
  const handleSubmitVideoSearch = async (e) => {
    setIsLoading(true);

    if (e) {
      e.preventDefault();
    }

    const searchTerm = e.target.qasongsearch.value;

    const results = await getYoutubeIdFromSearch(searchTerm);
    setVideos({
      searchTerm: searchTerm,
      results: results,
    });
    setIsLoading(false);
  };

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
              darkMode,
              isLoading,
              nowPlaying,
              setDarkMode,
              setVideos,
              searchTableViewMode,
              handleSubmitVideoSearch,
              queue,
              setNowPlaying,
              setQueue,
              videos,
              setSearchTableViewMode,
              addSongToQueue,
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
              videos,
              setNowPlaying,
              getNextInQueue,
              getPreviousInQueue,
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
