import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { getYoutubeIdFromSearch, filteredVideoResults } from "./functions";
import AppBar from "./components/AppBar/AppBar";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import Video from "./components/Video/Video";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import QueueSection from "./components/QueueSection/QueueSection";

const initialResults = {
  items: [],
  nextpageRef: "",
};

const App = () => {
  const VIDEO_LIMIT = 30;
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(initialResults);
  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState();
  const [showQueue, setShowQueue] = useState(false);
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(false);
  // const [globalChatOpen, setGlobalChatOpen] = useState(false)

  const handleSearchTermInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitVideoSearch = async (e) => {
    e.preventDefault();
    if (isFetching) return;
    setIsFetching(true);
    const query = { ref: results.nextpageRef, query: searchTerm, limit: VIDEO_LIMIT };
    const response = await getYoutubeIdFromSearch(query);
    console.log("Results: ", response);
    setIsFetching(false);
    const videos = filteredVideoResults(response.items);
    // new results overwrite old resuls, except for videos which are
    // concatonated into the video array
    // TODO: move to utility function
    setResults((state) => ({
      ...state,
      ...response,
      items: [...state.items, ...videos],
    }));
    window.onscroll = null;
  };

  useEffect(() => {
    if (!nowPlaying && queue.length > 0) {
      const nextInQueue = queue[0];
      setNowPlaying(nextInQueue);
      setQueue(queue.slice(1));
    }
  }, [nowPlaying]);

  useEffect(() => {
    window.onscroll = (e) => {
      const { scrollTop, offsetHeight } = document.documentElement;
      // BUFFER determines how far from the bottom of the screen to run function
      const BUFFER = 100;
      if (window.innerHeight + scrollTop >= offsetHeight - BUFFER) {
        handleSubmitVideoSearch(e);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [handleSubmitVideoSearch]);

  return (
    <ThemeProvider theme={darkTheme}>
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
      />

      <Video id={nowPlaying?.link} setNowPlaying={setNowPlaying} />

      {showQueue && (
        <QueueSection
          title={nowPlaying?.title}
          setNowPlaying={setNowPlaying}
          queue={queue}
          nowPlaying={nowPlaying}
          setQueue={setQueue}
        />
      )}

      <VideoGrid
        videos={results.items}
        nowPlaying={nowPlaying}
        setNowPlaying={setNowPlaying}
        queue={queue}
        setQueue={setQueue}
        handleSearchTermInput={handleSearchTermInput}
        handleSubmitVideoSearch={handleSubmitVideoSearch}
      />
    </ThemeProvider>
  );
};

export default App;

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2a3257",
      dark: "#0e132e",

      contrastText: "#fff",
    },

    secondary: {
      main: "#2ad156",

      contrastText: "#fff",
    },

    type: "dark",
  },
});
