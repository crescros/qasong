import React from "react";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <>
      <Typography align="center" variant="h1">
        404
      </Typography>
      <Typography align="center" variant="h2" color="textSecondary" gutterBottom>
        page not found
      </Typography>
      <Typography align="center" color="textSecondary">
        we didn&lsquo;t recognize &ldquo;{location.pathname}&rdquo; as a valid path
      </Typography>
    </>
  );
}

export default NotFound;
