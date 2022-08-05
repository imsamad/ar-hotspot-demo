import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CheckWiidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <Typography
      variant="h4"
      color="success"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        padding: 1,
      }}
    >
      Width - {width}
    </Typography>
  );
};

export default CheckWiidth;
