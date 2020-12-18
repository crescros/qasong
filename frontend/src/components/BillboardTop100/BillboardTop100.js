import React from "react";
import { getBillboardTop100 } from "../../functions";
import BillboardItem from "./BillboardTop100Item/BillboardTop100Item";
import { Grid, Typography, Box } from "@material-ui/core";

import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function BillboardTop100({ handleSubmitVideoSearch }) {
  const [billboard, setBillboard] = React.useState([]);

  function setSearchTerm(text) {
    const qasongSearchInput = document.querySelector("#qasong-search");

    qasongSearchInput.value = text;
  }

  // load data from billboard api into state
  React.useEffect(() => {
    (async () => {
      const data = await getBillboardTop100();
      setBillboard(data);
    })();
  }, []);

  const currentDate = new Date(billboard.data?.week);

  const displayDate = currentDate.toLocaleDateString({
    year: "numeric",
    month: "long",
    day: "long",
    weekday: "long",
  });

  const remainingTime = new Date(billboard.data?.nextWeek.date) - currentDate;

  const remainingDays = Math.floor(remainingTime / (60 * 60 * 24 * 1000));

  return (
    <>
      <Typography align="center" variant="h1">
        Billboard Top 100
      </Typography>

      {billboard.data && (
        <>
          <Typography align="center" variant="h4">
            {displayDate}
          </Typography>
          <Typography color="textSecondary" align="center" gutterBottom>
            next update in {remainingDays} days
          </Typography>
          <Box m={4} />
        </>
      )}

      <Grid container direction="column" spacing={1} align="center ">
        {billboard.data ? (
          billboard.data.songs.map((item) => {
            return (
              <Grid item key={item.rank}>
                <BillboardItem {...{ item, setSearchTerm, handleSubmitVideoSearch }} />
              </Grid>
            );
          })
        ) : (
          <Box mt={4}>
            <LoadingAnimation size="240px" speed="5" />
          </Box>
        )}
      </Grid>
    </>
  );
}

export default BillboardTop100;
