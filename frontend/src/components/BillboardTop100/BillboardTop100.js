import React from "react";
import { getBillboardTop100 } from "../../functions";

function BillboardTop100() {
  const [billboard, setBillboard] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const data = await getBillboardTop100();
      setBillboard(data);
    })();
  }, []);

  return <div>{JSON.stringify(billboard)}</div>;
}

export default BillboardTop100;
