import React, { useState, useEffect } from "react";
import { Chip, Box } from "@material-ui/core";
import { getNodeEnvironment } from "../../../functions";

function EnvironmentBadges() {
  const [nodeEnvLabel, setNodeEnvLabel] = useState();

  useEffect(() => {
    handleLoadEnvironment();
  }, []);

  const handleLoadEnvironment = () => {
    getNodeEnvironment().then((response) => {
      if (response && response.data) {
        setNodeEnvLabel(response.data);
      }
    });
  };

  return (
    <>
      {
        // this is the express node env
        nodeEnvLabel && nodeEnvLabel !== "production" && (
          <Box display="inline" mr={1}>
            <Chip display="inline" mr={2} label={"API: " + nodeEnvLabel} />
          </Box>
        )
      }
      {
        // this is the express node env
        !nodeEnvLabel && (
          <Box display="inline" mr={1}>
            <Chip display="inline" mr={2} label={"⛔API: none⛔"} />
          </Box>
        )
      }
      {
        // this is the react node env
        process.env.NODE_ENV !== "production" && (
          <Box display="inline" mr={1}>
            <Chip
              display="inline"
              color="secondary"
              label={"REACT: " + process.env.NODE_ENV}
            />
          </Box>
        )
      }
    </>
  );
}

export default EnvironmentBadges;
