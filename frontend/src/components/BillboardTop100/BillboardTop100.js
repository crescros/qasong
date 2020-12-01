import React from "react";
import { getBillboardTop100 } from "../../functions";
import BillboardItem from "./BillboardTop100Item/BillboardTop100Item";
import { Grid, Typography } from "@material-ui/core";

import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function BillboardTop100() {
  const [billboard, setBillboard] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const dataLoaded = () => {
    setLoading(false);
  };

  function setSearchTerm(text) {
    const qasongSearchInput = document.querySelector("#qasongsearch");

    qasongSearchInput.value = text;
  }

  // load data from billboard api into state
  React.useEffect(() => {
    (async () => {
      const data = await getBillboardTop100();
      setBillboard(data);
    })();
  }, []);

  return (
    <>
      <Typography align="center" variant="h1" gutterBottom>
        Billboard Top 100
      </Typography>

      <Grid align="center" style={{ display: loading ? "block" : "none" }}>
        <LoadingAnimation size="240px" speed="5" />
      </Grid>

      <Grid container direction="column" spacing={1}>
        {billboard.data?.map((item) => {
          return (
            <Grid item key={item.rank} onLoad={dataLoaded}>
              <BillboardItem {...{ item, setSearchTerm }} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default BillboardTop100;
