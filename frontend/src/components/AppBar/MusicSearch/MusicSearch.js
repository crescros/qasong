import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.contrastText, 0.4),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.contrastText, 0.65),
    },
    color: theme.palette.primary.main,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function MusicSearch({ handleSubmitMusicSearch }) {
  const classes = useStyles();
  let history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState();

  const handleSearchTermInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form
        onSubmit={(e) => {
          history.push("/search");
          handleSubmitMusicSearch(e);
        }}
      >
        <InputBase
          id="qasongsearch"
          name="qasongsearch"
          onChange={handleSearchTermInput}
          placeholder="search music…"
          autoFocus={true}
          value={searchTerm}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </form>
    </div>
  );
}

export default MusicSearch;
