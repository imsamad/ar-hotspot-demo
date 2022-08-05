import { Box, styled } from "@mui/material";

export const ModelContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  maxHeight: "600px",
  width: "100%",
  height: "100%",
  border: "0.2px solid #A8A8A8",
  borderRadius: "1rem",
  overflow: "hidden",
  position: "relative",
}));

export const ModelBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  top: 0,
  bottom: 0,
  left: 0,
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  transition: "all 0.5s ease-in-out 0.4s",
  border: "0px solid aqua",
  "> model-viewer ": {
    width: "100%",
    height: "100%",
    border: "0px solid red",
    outline: "none",
    flex: 1,
    /* padding: 1rem, */
    transition: "all 0.5s",
  },
  "&.active": {
    width: "65%",
  },
  [theme.breakpoints.down("md")]: {
    "&.active": {
      width: "100%",
    },
  },
}));

export const HotspotDrawerBox = styled(Box)(({ theme }) => ({
  width: "35%",
  transform: "translateX(100vw)",
  height: "100%",
  top: "0",
  bottom: "0",
  right: "0",
  borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
  borderRadius: "1.5rem",
  position: "absolute",
  background: "white",
  boxShadow: "-3px 0px 5px 0px #00000014",
  transition: "all 0.5s ease-in-out 0.4s",
  transformOrigin: "right center",

  // overflow: "hidden",
  "&.active": {
    transform: " translateX(0)",
  },
  [theme.breakpoints.down("md")]: {
    "&.active": {
      transform: " translateX(0)",
      width: "75%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&.active": {
      transform: " translateX(0)",
      width: "90%",
    },
  },

  zIndex: 15,
  // overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  ".title": { padding: "0.5rem" },
  ".content": {
    padding: "1rem",
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",

    // paddingBottom: "1rem",
  },
}));

export const ExitBtn = styled(Box)({
  zIndex: 25,
  position: "absolute",
  top: "50%",
  left: "-0px",
  transform: "translateY(-50%) translateX(-50%)",
  border: "0.02px solid #a8a8a8",
  borderRadius: "50%",
  backgroundColor: "#fff",
});
