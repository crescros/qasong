import React from "react";
import { ListItem, ListItemText, IconButton, Menu, MenuItem } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function PlaylistItem({
  song,
  handleStopSong,
  nowPlaying,
  setNowPlaying,
  addSongToQueue,
}) {
  const currentlyPlaying = song.videoId === nowPlaying?.videoId;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = (event) => {
    event.stopPropagation();
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    event.stopPropagation();
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <ListItem key={song.videoId} selected={currentlyPlaying}>
      {currentlyPlaying && (
        <IconButton size="small" onClick={handleStopSong}>
          <StopIcon />
        </IconButton>
      )}
      <ListItemText primary={song.title} />
      <IconButton edge="end" onClick={handleMobileMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
          onClick={() => {
            setNowPlaying(song);
            handleMobileMenuClose();
          }}
        >
          <p>Play Song</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            addSongToQueue(song);
            handleMobileMenuClose();
          }}
        >
          <p>Queue Song</p>
        </MenuItem>
      </Menu>
    </ListItem>
  );
}

export default PlaylistItem;
