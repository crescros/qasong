import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    boxShadow: `0 0 30px ${theme.palette.secondary.main}`,
    borderRadius: "50%",
    maxWidth: "100%",
    marginBottom: "35px",
  },
}));

function LoadingAnimation({ size = 32, speed = 2 }) {
  const classes = useStyles();

  return (
    <Box component="span" id="qasong-loading-animation">
      <img
        className={classes.img}
        style={{
          animation: `spin ${speed}s linear infinite`,
        }}
        src="./static/img/qasong-vinyl.jpg"
        width={`${size}px`}
      />
    </Box>
  );
}

export default LoadingAnimation;
