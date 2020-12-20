import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MusicSearch from "./MusicSearch/MusicSearch";
import Menu from "./Menu/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  backdropFilter: {
    backdropFilter: `blur(4px) brightness(${
      theme.palette.type === "dark" ? "85%" : "115%"
    } )`,
  },
  appbar: {
    transition: "backdrop-filter 2s",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function QasongAppBar({
  handleSubmitMusicSearch,
  queue,
  darkMode,
  showAboutUs,
  setShowAboutUs,
  setShowSettings,
  setShowFeedback,
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <div className={classes.grow}>
      <AppBar
        color="transparent"
        className={`${scrollTop > 111 ? classes.backdropFilter : ""} ${classes.appbar}`}
      >
        <Toolbar>
          {/* Icon-logo */}
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Qasong logo"
            >
              <img
                src=".\static\img\whiteLogo.png"
                height="36px"
                width="36px"
                style={{ filter: `invert(${darkMode ? "0" : "1"})` }}
              />
            </IconButton>
          </Link>

          {/* Search bar */}
          <MusicSearch
            handleSubmitMusicSearch={handleSubmitMusicSearch}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
          />

          {/* responsive spacer */}
          <div className={classes.grow} />

          {/* Menus */}
          <Menu
            queueLength={queue.length}
            {...{
              showAboutUs,
              setShowAboutUs,
              setShowSettings,
              setShowFeedback,
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
