import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const SearchResults = React.lazy(() =>
  import("./components/SearchResults/SearchResults")
);
const HomeScreen = React.lazy(() => import("./components/HomeScreen/HomeScreen"));
const AppBar = React.lazy(() => import("./components/AppBar/AppBar"));
const QueueSection = React.lazy(() => import("./components/QueueSection/QueueSection"));
const BillboardTop100 = React.lazy(() =>
  import("./components/BillboardTop100/BillboardTop100")
);
import NotFound from "./components/NotFound/NotFound";

function Routes({
  darkMode,
  isLoading,
  nowPlaying,
  setDarkMode,
  setVideos,
  user,
  searchTableViewMode,
  handleSubmitVideoSearch,
  queue,
  setNowPlaying,
  setQueue,
  videos,
  setSearchTableViewMode,
  addSongToQueue,
}) {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <AppBar
          {...{
            darkMode,
            handleSubmitVideoSearch,
            isLoading,
            queue,
            setDarkMode,
            setVideos,
            user,
          }}
        />
      </Suspense>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/billboard">
            <Suspense fallback={<div />}>
              <BillboardTop100 />
            </Suspense>
          </Route>
          <Route path="/search">
            <Suspense fallback={<div />}>
              <SearchResults
                {...{
                  searchTableViewMode,
                  handleSubmitVideoSearch,
                  nowPlaying,
                  queue,
                  setNowPlaying,
                  setQueue,
                  videos,
                  setSearchTableViewMode,
                }}
              />
            </Suspense>
          </Route>
          <Route path="/queue">
            <Suspense fallback={<div />}>
              <QueueSection
                {...{
                  nowPlaying,
                  queue,
                  setNowPlaying,
                  setQueue,
                }}
              />
            </Suspense>
          </Route>
          <Route exact path="/">
            <Suspense fallback={<div />}>
              <HomeScreen
                {...{
                  setQueue,
                  setNowPlaying,
                  nowPlaying,
                  isLoading,
                  queue,
                  addSongToQueue,
                }}
              />
            </Suspense>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
