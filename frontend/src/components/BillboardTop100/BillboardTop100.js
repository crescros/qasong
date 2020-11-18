import React from "react";
import { getBillboardTop100 } from "../../functions";
import BillboardItem from "./BillboardTop100Item/BillboardTop100Item"
import { Grid, Typography } from "@material-ui/core"

function BillboardTop100({setSearchTerm}) {
  const [billboard, setBillboard] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const data = await getBillboardTop100();
      setBillboard(data);
    })();
  }, []);

  return <>
    <Typography
      align="center"
      variant="h1"
      gutterBottom
    >
      Billboard Top 100
    </Typography>

    <Grid container direction="column" spacing={1}>
      {billboard.data?.map(item => {
        return <Grid item>
          <BillboardItem {...{ item, setSearchTerm }} />
        </Grid>
      })}
    </Grid>
  </>
}

export default BillboardTop100;
