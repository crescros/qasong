import React from "react";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import logo from './404.png';

function NotFound() {
  const location = useLocation();
  return (
    <>
<img src={logo} alt="404" />
    </>
  );
}

export default NotFound;
