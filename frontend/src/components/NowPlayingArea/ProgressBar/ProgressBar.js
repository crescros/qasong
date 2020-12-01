import React from "react";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";

function ProgressBar({ value }) {
  return (
    <Box px={3}>
      <Slider color="secondary" value={value} />
    </Box>
  );
}

export default ProgressBar;
