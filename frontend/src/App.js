import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { getYoutubeIdFromSearch, getQueueFromIds } from "./functions";
import AppBar from "./components/AppBar/AppBar";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import QueueSection from "./components/QueueSection/QueueSection";
import queryString from "query-string";
import { isMobile } from "react-device-detect";
import HomeScreen from "./components/HomeScreen/HomeScreen"
import QueueLoadingScreen from "./components/QueueSection/QueueLoadingScreen/QueueLoadingScreen";
import VideoArea from "./components/VideoArea/VideoArea"

const App = () => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#000000",
        dark: "#0e132e",
        contrastText: "#fff",
      },

      secondary: {
        main: "#2ad156",
        dark: "#fff",
        contrastText: "#fff",
      },

      type: "dark",
    },
  });

  const lightTheme = createMuiTheme({});

  // APPLICATION LEVEL STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentQid, setCurrentQid] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [showQueue, setShowQueue] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [queueName, setQueueName] = useState("New Queue")

  // runs once when app is rendered
  useEffect(() => {
    (async () => {

      // set dark mode from local storage
      const userDarkMode = localStorage.getItem("userDarkMode");
      if (userDarkMode === "true") {
        setDarkMode(true);
      }

      // get queue from url  
      let parsedParams = queryString.parse(location.search);
      if (parsedParams.queue && parsedParams.queue.length > 0) {
        setQueueName(parsedParams.queueName)
        setIsLoadingQueue(true)
        let linkedQueue = await getQueueFromIds(queryString.stringify({ queue: parsedParams.queue }));
        setIsLoadingQueue(false)
        setQueue(linkedQueue);
        setShowQueue(true);
      } else {
        // if theres no queue in the url, get it from local storage
        const storedQueue = localStorage.getItem("queue");
        const storedQueueName = localStorage.getItem("queueName")
        if (storedQueue) {
          const queue = JSON.parse(storedQueue);
          setQueue(queue);
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
        const i = queue.findIndex((item) => item.qid === currentQid);
        const nextInQueue = queue[i + 1];
        setNowPlaying(nextInQueue);
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
    parsed.queue = queue.map((song) => song.id);
    history.pushState(parsed, "queue", "?" + queryString.stringify(parsed));

    if (queue.length <= 0) {
      setShowQueue(false)
    }
  }, [queue]);

  // write queue name to localstorage and query params
  useEffect(() => {
    if (queueName) {
      localStorage.setItem("queueName", queueName)
      let parsed = queryString.parse(location.search);
      parsed.queueName = queueName
      history.pushState(parsed, "queue", "?" + queryString.stringify(parsed));
      document.title = process.env.REACT_APP_NAME + " - " + queueName
    } else {
      setQueueName("New Queue")
    }
  }, [queueName])

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
      results: results
    });
    setIsLoading(false);
  };

  // show home screen if theres no search results, queue, or loading screen
  const showHomeScreen = !(videos.results && videos.results.length > 0) && showQueue === false && !isLoadingQueue

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      {isMobile && <div style={{ height: "72px" }}></div>}

      <AppBar
        {...{
          handleSubmitVideoSearch,
          handleSearchTermInput,
          nowPlaying,
          setNowPlaying,
          queue,
          setUser,
          user,
          setShowQueue,
          showQueue,
          darkMode,
          setDarkMode,
          isLoading,
          searchTerm,
          setSearchTerm,
          setVideos,
        }}
      />

      <VideoArea
        {...{
          nowPlaying,
          setNowPlaying
        }}
      />

      <QueueLoadingScreen
        {...{
          isLoadingQueue
        }}
      />

      <QueueSection
        {...{
          setNowPlaying,
          queue,
          nowPlaying,
          setQueue,
          queueName,
          setQueueName,
          showQueue
        }}
      />

      <VideoGrid
        {...{
          videos,
          nowPlaying,
          setNowPlaying,
          queue,
          setQueue,
          handleSearchTermInput,
          handleSubmitVideoSearch,
        }}
      />

      <HomeScreen
        {...{
          handleSubmitVideoSearch,
          handleSearchTermInput,
          searchTerm,
          showHomeScreen
        }}
      />
    </ThemeProvider>
  );
};

export default App;
