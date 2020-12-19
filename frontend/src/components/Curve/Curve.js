import React from "react";

function Curve({ align = "left" }) {
  if (align === "right") {
    return (
      <img
        src=".\static\img\bottomCurve.svg"
        width="465px"
        style={{ position: "absolute", zIndex: -10, maxWidth: "100%", right: "0%" }}
      />
    );
  }

  return (
    <img
      src=".\static\img\topCurve.svg"
      width="465px"
      style={{ position: "absolute", zIndex: -10, maxWidth: "100%" }}
    />
  );
}

export default Curve;
