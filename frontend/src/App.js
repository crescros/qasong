import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { getYoutubeIdFromSearch, getQueueFromIds } from "./functions";
import AppBar from "./components/AppBar/AppBar";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import Video from "./components/Video/Video";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import QueueSection from "./components/QueueSection/QueueSection";
import queryString from "query-string";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState();
  const [showQueue, setShowQueue] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [globalChatOpen, setGlobalChatOpen] = useState(false)

  const handleSearchTermInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitVideoSearch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const results = await getYoutubeIdFromSearch(searchTerm);
    setVideos(results);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const storedQueue = localStorage.getItem("queue");
      let parsed = queryString.parse(location.search);

      if (parsed.queue && parsed.queue.length > 0) {
        let linkedQueue = await getQueueFromIds(queryString.stringify(parsed));
        setQueue(linkedQueue);
        setShowQueue(true);
      } else {
        if (storedQueue) {
          const queue = JSON.parse(storedQueue);
          setQueue(queue);
          setShowQueue(true);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (!nowPlaying && queue.length > 0) {
      const nextInQueue = queue[0];
      setNowPlaying(nextInQueue);
      setQueue(queue.slice(1));
    }
  }, [nowPlaying]);
  const [darkMode, setDarkMode] = useState(false);
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
    },
  });

  useEffect(() => {
    if (queue && queue.length > 0) {
      localStorage.setItem("queue", JSON.stringify(queue));
      let parsed = queryString.parse(location.search);
      parsed.queue = queue.map((song) => song.id);
      history.pushState(parsed, "queue", "?" + queryString.stringify(parsed));
    }
  }, [queue]);

  const lightTheme = createMuiTheme({});

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper style={{ height: "100vh" }}>
        <CssBaseline />

        <AppBar
          handleSubmitVideoSearch={handleSubmitVideoSearch}
          handleSearchTermInput={handleSearchTermInput}
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
          queue={queue}
          setUser={setUser}
          user={user}
          // setGlobalChatOpen={setGlobalChatOpen}
          setShowQueue={setShowQueue}
          showQueue={showQueue}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isLoading={isLoading}
        />

        <Video id={nowPlaying && nowPlaying.id} setNowPlaying={setNowPlaying} />

        {showQueue && (
          <QueueSection
            title={nowPlaying && nowPlaying.title}
            setNowPlaying={setNowPlaying}
            queue={queue}
            nowPlaying={nowPlaying}
            setQueue={setQueue}
          />
        )}

        <VideoGrid
          videos={videos}
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
          queue={queue}
          setQueue={setQueue}
          handleSearchTermInput={handleSearchTermInput}
          handleSubmitVideoSearch={handleSubmitVideoSearch}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
