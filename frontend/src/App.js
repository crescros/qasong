import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import queryString from "query-string";
import { getYoutubeIdFromSearch, getQueueFromIds } from "./functions";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "./components/AppBar/AppBar";
import HomeScreen from "./components/HomeScreen/HomeScreen";
// eslint-disable-next-line max-len
import QueueLoadingScreen from "./components/QueueSection/QueueLoadingScreen/QueueLoadingScreen";
import QueueSection from "./components/QueueSection/QueueSection";
import VideoArea from "./components/VideoArea/VideoArea";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import PlayArea from "./components/PlayArea/PlayArea";

const App = () => {
  const darkTheme = createMuiTheme({
    palette: {
      background: {
        default: "#000000",
      },
      primary: {
        main: "#000000"
      },
      secondary: {
        main: "#FE9021",
        dark: "#fff",
        contrastText: "#fff",
      },

      type: "dark",
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      background: {
        default: "#fff",
      },
      primary: {
        main: "#fff"
      },
      secondary: {
        main: "#FE9021",
        dark: "#fff",
        contrastText: "#fff",
      },

      type: "light",
    },  
    shadows: ["none"]
  });

  // APPLICATION LEVEL STATE
  const [currentQid, setCurrentQid] = useState();
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [nowPlaying, setNowPlaying] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [queue, setQueue] = useState([]);
  const [queueName, setQueueName] = useState("New Queue");
  const [showQueue, setShowQueue] = useState(false);
  const [user, setUser] = useState();
  const [videos, setVideos] = useState([]);

  function skipSong(){
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i + 1];
    setNowPlaying(nextInQueue);
  }

  function previousSong(){
    const i = queue.findIndex((item) => item.qid === currentQid);
    const nextInQueue = queue[i - 1];
    setNowPlaying(nextInQueue);
  }

  useEffect(() => {
    (async () => {
      // set dark mode from local storage
      const userDarkMode = localStorage.getItem("userDarkMode");
      if (userDarkMode === "false") {
        setDarkMode(false);
      }

      // get queue from url
      let parsedParams = queryString.parse(location.search);
      if (parsedParams.queue && parsedParams.queue.length > 0) {
        setQueueName(parsedParams.queueName);
        setIsLoadingQueue(true);
        let linkedQueue = await getQueueFromIds(
          queryString.stringify({ queue: parsedParams.queue })
        );
        setIsLoadingQueue(false);
        setQueue(linkedQueue);
        setShowQueue(true);
        setNowPlaying(linkedQueue[0])
      } else {
        // if theres no queue in the url, get it from local storage
        const storedQueue = localStorage.getItem("queue");
        const storedQueueName = localStorage.getItem("queueName");
        if (storedQueue) {
          const localQueue = JSON.parse(storedQueue);
          setQueue(localQueue);
          setShowQueue(true);
          setQueueName(storedQueueName);
        }
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
        skipSong()
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

  // write queue value to local storage, write array of queue ids to query params
  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
    let parsed = queryString.parse(location.search);
    parsed.queue = queue.map((song) => song.videoId);
    history.pushState(parsed, "queue", "?" + queryString.stringify(parsed));

    if (queue.length <= 0) {
      setShowQueue(false);
    }
  }, [queue]);

  // write queue name to localstorage and query params
  useEffect(() => {
    if (queueName) {
      localStorage.setItem("queueName", queueName);
      let parsed = queryString.parse(location.search);
      parsed.queueName = queueName;
      history.pushState(parsed, "queue", "?" + queryString.stringify(parsed));
      document.title = process.env.REACT_APP_NAME + " - " + queueName;
    } else {
      setQueueName("New Queue");
    }
  }, [queueName]);

  // event listener for search input
  const handleSearchTermInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // event listener for search submit
  const handleSubmitVideoSearch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const results = await getYoutubeIdFromSearch(searchTerm);
    setSearchTerm("");
    setVideos({
      searchTerm: searchTerm,
      results: results,
    });
    setIsLoading(false);
    if (isMobile) {
      setShowQueue(false);
    }
  };

  // show home screen if theres no search results, queue, or loading screen
  const showHomeScreen =
    !(videos.results && videos.results.length > 0) &&
    showQueue === false &&
    !isLoadingQueue;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      {isMobile && <div style={{ height: "72px" }}></div>}

      <AppBar
        {...{
          darkMode,
          handleSearchTermInput,
          handleSubmitVideoSearch,
          isLoading,
          nowPlaying,
          queue,
          searchTerm,
          setDarkMode,
          setNowPlaying,
          setSearchTerm,
          setShowQueue,
          setUser,
          setVideos,
          showQueue,
          user,
          showHomeScreen,
        }}
      />

      <VideoArea
        {...{
          nowPlaying,
          setNowPlaying,
        }}
      />

      <QueueLoadingScreen
        {...{
          isLoadingQueue,
        }}
      />

      <QueueSection
        {...{
          nowPlaying,
          queue,
          queueName,
          setNowPlaying,
          setQueue,
          setQueueName,
          showQueue,
          skipSong,
          previousSong
        }}
      />

      <VideoGrid
        {...{
          handleSearchTermInput,
          handleSubmitVideoSearch,
          nowPlaying,
          queue,
          setNowPlaying,
          setQueue,
          videos,
        }}
      />

      <HomeScreen
        {...{
          handleSubmitVideoSearch,
          handleSearchTermInput,
          searchTerm,
          showHomeScreen,
          setQueue,
          setNowPlaying,
          queue,
          setShowQueue
        }}
      />

      <PlayArea
        {...{
          nowPlaying,
          queue,
          videos,
          setNowPlaying,
        }}
      />
    </ThemeProvider>
  );
};

export default App;
