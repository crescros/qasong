import React from "react";
import { Box } from "@material-ui/core";

function LoadingAnimation({ size = 32, speed = 2 }) {
  return (
    <Box component="span">
      <img
        style={{
          animation: `spin ${speed}s linear infinite`,
          boxShadow: "0 0 30px red",
          borderRadius: "50%",
          maxWidth: "100%",
        }}
        src="./img/qasong-vinyl.png"
        width={`${size}px`}
      />
    </Box>
  );
}

export default LoadingAnimation;
