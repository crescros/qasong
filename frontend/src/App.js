// load dependencies
import React, { useState, useEffect, Suspense } from "react";
import { getYoutubeIdFromSearch } from "./functions";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "./routes";

// lazy load components
const YoutubeIframeArea = React.lazy(() =>
  import("./components/YoutubeIframeArea/YoutubeIframeArea")
);
const NowPlayingArea = React.lazy(() =>
  import("./components/NowPlayingArea/NowPlayingArea")
);

// DARK MODE
const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#000000",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FE9021",
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
      default: "##f7f3f2",
    },
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#FE9021",
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
  const [searchTerm, setSearchTerm] = useState("");
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
    const nextInQueue = queue[i - 1];
    setNowPlaying(nextInQueue);
  }

  function getNextInQueue() {
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i + 1];
    return nextInQueue;
  }

  function addSongToQueue(song) {
    setQueue(queue.concat(song));
  }

  // runs once when app starts
  useEffect(() => {
    (async () => {
      // set dark mode from local storage
      const userDarkMode = localStorage.getItem("userDarkMode");
      if (userDarkMode === "false") {
        setDarkMode(false);
      }

      // set search list view mode from local storage
      const userSearchTableViewMode = localStorage.getItem("userSearchTableViewMode");
      if (userSearchTableViewMode === "true") {
        setSearchTableViewMode(true);
      }

      // if theres no queue in the url, get it from local storage
      const storedQueue = localStorage.getItem("queue");
      if (storedQueue) {
        const localQueue = JSON.parse(storedQueue);
        setQueue(localQueue);
      }
    })();
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

  // event listener for search input
  const handleSearchTermInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // event listener for search submit
  const handleSubmitVideoSearch = async (e) => {
    setIsLoading(true);

    if (e) {
      e.preventDefault();

    }
    const results = await getYoutubeIdFromSearch(searchTerm);
    setSearchTerm("");
    setVideos({
      searchTerm: searchTerm,
      results: results,
    });
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <CssBaseline />

      <img src=".\img\leftCurve.svg" width="465px" style={{ position: "absolute", zIndex: -10000, maxWidth: "100%" }} />

      {<div style={{ height: "72px" }}></div>}

      <Routes
        {...{
          darkMode,
          isLoading,
          nowPlaying,
          searchTerm,
          setDarkMode,
          setSearchTerm,
          setVideos,
          searchTableViewMode,
          handleSearchTermInput,
          handleSubmitVideoSearch,
          queue,
          setNowPlaying,
          setQueue,
          videos,
          setSearchTableViewMode,
          addSongToQueue,
        }}
      />

      {/* YOUTUBE IFRAME */}
      <Suspense fallback={<div />}>
        <YoutubeIframeArea
          {...{
            nowPlaying,
            setNowPlaying,
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
          }}
        />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
